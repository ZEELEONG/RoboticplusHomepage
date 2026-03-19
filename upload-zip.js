import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read .env file manually
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

async function uploadZip() {
  try {
    const fileBuffer = readFileSync('./public/project-source.zip');

    console.log('File size:', fileBuffer.length, 'bytes');

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

    console.log('Upload successful!', data);

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('downloads')
      .getPublicUrl('project-source.zip');

    console.log('Public URL:', urlData.publicUrl);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

uploadZip();
