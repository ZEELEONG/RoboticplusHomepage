/*
  # Create Downloads Storage Bucket

  1. New Storage Bucket
    - `downloads` - Public bucket for downloadable files
  
  2. Security
    - Enable public access for downloads
    - Allow anyone to read files
    - Restrict uploads to authenticated users only
*/

-- Create downloads bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('downloads', 'downloads', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public to read files
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Public can read downloads'
  ) THEN
    CREATE POLICY "Public can read downloads"
      ON storage.objects
      FOR SELECT
      TO public
      USING (bucket_id = 'downloads');
  END IF;
END $$;

-- Allow authenticated users to upload
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Authenticated can upload downloads'
  ) THEN
    CREATE POLICY "Authenticated can upload downloads"
      ON storage.objects
      FOR INSERT
      TO authenticated
      WITH CHECK (bucket_id = 'downloads');
  END IF;
END $$;
