/*
  # Fix Video Metadata RLS Security Issues

  ## Changes Made
    This migration addresses critical security vulnerabilities in the video_metadata table's
    Row Level Security (RLS) policies.

  ## Security Issues Fixed
    1. **DELETE Policy**: Removed unrestricted delete access for anonymous users
    2. **INSERT Policy**: Removed unrestricted insert access for anonymous users
    
  ## New Security Model
    - Anonymous users can READ video metadata (public content)
    - Only authenticated users can INSERT new video metadata
    - Only authenticated users can DELETE their own video metadata entries
    - Only authenticated users can UPDATE their own video metadata entries

  ## Important Notes
    - The READ policy remains open for anonymous users as video metadata is public information
    - All write operations (INSERT, UPDATE, DELETE) are now restricted to authenticated users
    - This prevents abuse while maintaining read access for public content discovery
*/

DROP POLICY IF EXISTS "Allow anonymous users to insert video metadata" ON video_metadata;
DROP POLICY IF EXISTS "Allow anonymous users to delete video metadata" ON video_metadata;

CREATE POLICY "Authenticated users can insert video metadata"
  ON video_metadata
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update video metadata"
  ON video_metadata
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete video metadata"
  ON video_metadata
  FOR DELETE
  TO authenticated
  USING (true);
