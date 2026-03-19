/*
  # 创建视频元数据表

  1. 新增表
    - `video_metadata`
      - `id` (uuid, primary key) - 主键ID
      - `storage_path` (text, unique) - 存储路径（对应Supabase Storage中的文件名）
      - `original_filename` (text) - 原始文件名
      - `file_size` (bigint) - 文件大小（字节）
      - `mime_type` (text) - MIME类型
      - `uploaded_at` (timestamptz) - 上传时间
      - `created_at` (timestamptz) - 记录创建时间

  2. 安全性
    - 启用RLS
    - 添加允许匿名用户读取和插入的策略（与现有存储桶策略保持一致）
*/

CREATE TABLE IF NOT EXISTS video_metadata (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path text UNIQUE NOT NULL,
  original_filename text NOT NULL,
  file_size bigint DEFAULT 0,
  mime_type text,
  uploaded_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE video_metadata ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous users to read video metadata"
  ON video_metadata
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous users to insert video metadata"
  ON video_metadata
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous users to delete video metadata"
  ON video_metadata
  FOR DELETE
  TO anon
  USING (true);