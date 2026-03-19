/*
  # Allow Anonymous Upload to Downloads Bucket

  1. Security Changes
    - Allow anonymous users to upload to downloads bucket
    - Keep public read access
*/

-- Drop the existing authenticated-only upload policy
DROP POLICY IF EXISTS "Authenticated can upload downloads" ON storage.objects;

-- Allow anyone (including anonymous) to upload
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'storage' 
    AND tablename = 'objects' 
    AND policyname = 'Anyone can upload downloads'
  ) THEN
    CREATE POLICY "Anyone can upload downloads"
      ON storage.objects
      FOR INSERT
      TO public
      WITH CHECK (bucket_id = 'downloads');
  END IF;
END $$;
