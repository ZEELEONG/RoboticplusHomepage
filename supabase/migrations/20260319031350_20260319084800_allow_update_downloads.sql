/*
  # Allow Update Downloads Bucket Files

  1. Security Changes
    - Allow anyone to update files in the downloads bucket (for upsert operations)
    - This enables replacing project-source.zip when running the package script
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage'
    AND tablename = 'objects'
    AND policyname = 'Anyone can update downloads'
  ) THEN
    CREATE POLICY "Anyone can update downloads"
      ON storage.objects
      FOR UPDATE
      TO public
      USING (bucket_id = 'downloads')
      WITH CHECK (bucket_id = 'downloads');
  END IF;
END $$;
