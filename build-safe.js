import { build } from 'vite';
import { copyFileSync, readdirSync, statSync, mkdirSync, existsSync, rmSync } from 'fs';
import { join, resolve } from 'path';

async function buildProject() {
  const publicDir = resolve(process.cwd(), 'public');
  const distDir = resolve(process.cwd(), 'dist');

  try {
    console.log('Building with Vite (publicDir disabled)...');

    if (existsSync(distDir)) {
      rmSync(distDir, { recursive: true, force: true });
    }

    await build({
      publicDir: false,
    });

    console.log('\nCopying public assets (skipping locked files)...');

    function copyRecursive(src, dest) {
      if (!existsSync(dest)) {
        mkdirSync(dest, { recursive: true });
      }

      const files = readdirSync(src);

      for (const file of files) {
        if (file.includes(' copy')) {
          console.log(`  ⊘ Skipping locked file: ${file}`);
          continue;
        }

        const srcPath = join(src, file);
        const destPath = join(dest, file);

        try {
          const stat = statSync(srcPath);

          if (stat.isDirectory()) {
            copyRecursive(srcPath, destPath);
          } else {
            copyFileSync(srcPath, destPath);
            console.log(`  ✓ Copied: ${file}`);
          }
        } catch (err) {
          if (err.code === 'EAGAIN' || err.message.includes('temporarily unavailable')) {
            console.warn(`  ⊘ Skipping locked file: ${file}`);
          } else {
            console.warn(`  ✗ Could not copy ${file}:`, err.message);
          }
        }
      }
    }

    copyRecursive(publicDir, distDir);

    console.log('\n✓ Build completed successfully!\n');
  } catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
  }
}

buildProject();
