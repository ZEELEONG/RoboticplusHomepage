/*
  # 添加存储桶访问策略

  1. 策略
    - 允许所有人上传视频到videos存储桶
    - 允许所有人读取videos存储桶中的文件
  
  2. 说明
    - 上传策略：任何人都可以上传文件（适合演示和测试）
    - 读取策略：任何人都可以查看文件（因为桶是公开的）
*/

-- 允许所有人上传到videos存储桶
CREATE POLICY "Anyone can upload videos"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'videos');

-- 允许所有人读取videos存储桶
CREATE POLICY "Anyone can view videos"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'videos');

-- 允许所有人更新videos存储桶中的文件
CREATE POLICY "Anyone can update videos"
  ON storage.objects
  FOR UPDATE
  TO public
  USING (bucket_id = 'videos')
  WITH CHECK (bucket_id = 'videos');

-- 允许所有人删除videos存储桶中的文件
CREATE POLICY "Anyone can delete videos"
  ON storage.objects
  FOR DELETE
  TO public
  USING (bucket_id = 'videos');
