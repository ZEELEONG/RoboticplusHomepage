/*
  # Create project-files storage bucket

  1. New Storage Bucket
    - `project-files` - Public bucket for managing project files
    - No file size limit
    - Accepts all file types
  
  2. Security
    - Enable public access for listing and reading
    - Allow anonymous uploads and deletes through Edge Function
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('project-files', 'project-files', true, NULL, NULL)
ON CONFLICT (id) DO NOTHING;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Allow public read access'
  ) THEN
    CREATE POLICY "Allow public read access"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'project-files');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Allow public insert access'
  ) THEN
    CREATE POLICY "Allow public insert access"
    ON storage.objects FOR INSERT
    TO public
    WITH CHECK (bucket_id = 'project-files');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Allow public delete access'
  ) THEN
    CREATE POLICY "Allow public delete access"
    ON storage.objects FOR DELETE
    TO public
    USING (bucket_id = 'project-files');
  END IF;
END $$;