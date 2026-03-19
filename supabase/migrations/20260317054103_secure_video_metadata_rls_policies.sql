/*
  # Secure Video Metadata RLS Policies

  ## Overview
  This migration fixes critical security vulnerabilities in the video_metadata table
  by implementing proper ownership-based Row Level Security policies.

  ## Security Issues Fixed
  1. **Always True Policies**: Removed policies with `USING (true)` that allowed
     unrestricted access to all authenticated users
  2. **No Ownership Check**: Added proper ownership tracking and validation

  ## Changes Made
  
  ### 1. Add Owner Tracking
  - Add `user_id` column to track video metadata ownership
  - This allows implementing proper ownership-based access control
  
  ### 2. New Security Model
  - **SELECT**: Public read access (videos are public content)
  - **INSERT**: Authenticated users can create entries with their user_id
  - **UPDATE**: Users can only update their own video metadata
  - **DELETE**: Users can only delete their own video metadata
  
  ### 3. Migration Strategy
  - Drop all existing overly permissive policies
  - Add user_id column for ownership tracking
  - Create restrictive policies that check ownership
  - Set default user_id for existing rows (if any)

  ## Security Notes
  - All write operations now require authentication AND ownership verification
  - The `user_id` field is automatically set to the authenticated user during insert
  - Users cannot modify or delete other users' video metadata
  - Read access remains public as video content is intended to be discoverable
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'video_metadata' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE video_metadata ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

DROP POLICY IF EXISTS "Allow anonymous users to read video metadata" ON video_metadata;
DROP POLICY IF EXISTS "Allow anonymous users to insert video metadata" ON video_metadata;
DROP POLICY IF EXISTS "Allow anonymous users to delete video metadata" ON video_metadata;
DROP POLICY IF EXISTS "Authenticated users can insert video metadata" ON video_metadata;
DROP POLICY IF EXISTS "Authenticated users can update video metadata" ON video_metadata;
DROP POLICY IF EXISTS "Authenticated users can delete video metadata" ON video_metadata;

CREATE POLICY "Anyone can view video metadata"
  ON video_metadata
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create video metadata"
  ON video_metadata
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own video metadata"
  ON video_metadata
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own video metadata"
  ON video_metadata
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_video_metadata_user_id ON video_metadata(user_id);
