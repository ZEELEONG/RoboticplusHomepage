import { createWriteStream, readdirSync, statSync, readFileSync } from 'fs';
import { readFile } from 'fs/promises';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envContent = await readFile(join(__dirname, '.env'), 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim();
  }
});

const supabase = createClient(
  env.VITE_SUPABASE_URL,
  env.VITE_SUPABASE_ANON_KEY
);

const projectRoot = __dirname;

const filesToInclude = [
  'src',
  'public',
  'supabase',
  '.env',
  '.gitignore',
  'build-safe.js',
  'eslint.config.js',
  'index.html',
  'package.json',
  'package-lock.json',
  'postcss.config.js',
  'tailwind.config.js',
  'tsconfig.app.json',
  'tsconfig.json',
  'tsconfig.node.json',
  'upload-zip.js',
  'vite.config.ts'
];

const excludePatterns = [
  'node_modules',
  'dist',
  '.git',
  '.bolt',
  '*.zip',
  'create-download-package.js',
  'hero imgae animated3'
];

function shouldExclude(path) {
  return excludePatterns.some(pattern => {
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace('*', '.*'));
      return regex.test(path);
    }
    return path.includes(pattern);
  });
}

async function createPackage() {
  console.log('Creating project source package...\n');

  const output = createWriteStream(join(projectRoot, 'public', 'project-source.zip'));
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', async () => {
    const totalSize = archive.pointer();
    console.log(`\n✓ Package created: ${totalSize} bytes`);
    console.log('\nUploading to Supabase Storage...');

    try {
      const fileBuffer = readFileSync(join(projectRoot, 'public', 'project-source.zip'));

      const { data, error } = await supabase.storage
        .from('downloads')
        .upload('project-source.zip', fileBuffer, {
          contentType: 'application/zip',
          upsert: true
        });

      if (error) {
        console.error('Upload error:', error);
        process.exit(1);
      }

      console.log('✓ Upload successful!', data);

      const { data: urlData } = supabase.storage
        .from('downloads')
        .getPublicUrl('project-source.zip');

      console.log('\n✓ Public URL:', urlData.publicUrl);
      console.log('\n✓ All done!');
    } catch (err) {
      console.error('Error:', err);
      process.exit(1);
    }
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
      console.warn('Warning:', err);
    } else {
      throw err;
    }
  });

  archive.pipe(output);

  function addToArchive(itemPath, archivePath) {
    const fullPath = join(projectRoot, itemPath);

    if (shouldExclude(itemPath)) {
      return;
    }

    try {
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        console.log(`📁 Adding directory: ${itemPath}/`);
        const items = readdirSync(fullPath);
        for (const item of items) {
          addToArchive(join(itemPath, item), join(archivePath, item));
        }
      } else {
        console.log(`📄 Adding file: ${itemPath}`);
        archive.file(fullPath, { name: archivePath });
      }
    } catch (err) {
      console.warn(`⊘ Skipping: ${itemPath} (${err.message})`);
    }
  }

  for (const item of filesToInclude) {
    addToArchive(item, item);
  }

  await archive.finalize();
}

createPackage();
