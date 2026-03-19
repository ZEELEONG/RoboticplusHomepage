import { useState } from 'react';
import { Upload, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import VideoList from './VideoList';

export default function VideoUpload() {
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadedUrl, setUploadedUrl] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!supabase) {
      setUploadStatus('error');
      setErrorMessage('未配置 Supabase：请先设置 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY');
      return;
    }
    const file = event.target.files?.[0];
    if (!file) return;

    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      setUploadStatus('error');
      setErrorMessage('文件大小超过100MB限制');
      return;
    }

    setUploading(true);
    setUploadStatus('idle');
    setErrorMessage('');

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = fileName;

      const { data, error } = await supabase.storage
        .from('videos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // 保存视频元数据到数据库
      const { error: metadataError } = await supabase
        .from('video_metadata')
        .insert({
          storage_path: data.path,
          original_filename: file.name,
          file_size: file.size,
          mime_type: file.type,
          uploaded_at: new Date().toISOString()
        });

      if (metadataError) {
        console.error('保存元数据失败:', metadataError);
      }

      const { data: publicUrlData } = supabase.storage
        .from('videos')
        .getPublicUrl(data.path);

      setUploadedUrl(publicUrlData.publicUrl);
      setUploadStatus('success');
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      console.error('上传错误:', error);
      setUploadStatus('error');
      setErrorMessage(error instanceof Error ? error.message : '上传失败');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        {!supabase && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-sm text-amber-200">
            <p className="font-medium mb-1">当前页面未连接 Supabase</p>
            <p className="text-amber-200/80">
              请在 GitHub 仓库 Secrets 中设置 <code>VITE_SUPABASE_URL</code> 和{' '}
              <code>VITE_SUPABASE_ANON_KEY</code>，再重新部署。
            </p>
          </div>
        )}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">视频上传</h1>
            <p className="text-slate-300">支持MP4、MOV、AVI、WebM格式，最大100MB</p>
          </div>

          <div className="space-y-6">
            <label
              htmlFor="video-upload"
              className={`
                relative flex flex-col items-center justify-center w-full h-64
                border-2 border-dashed rounded-xl cursor-pointer
                transition-all duration-300
                ${uploading ? 'border-blue-400 bg-blue-500/10' : 'border-slate-400 hover:border-blue-400 bg-slate-800/50 hover:bg-slate-700/50'}
                ${uploadStatus === 'success' ? 'border-green-400 bg-green-500/10' : ''}
                ${uploadStatus === 'error' ? 'border-red-400 bg-red-500/10' : ''}
              `}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {uploading && (
                  <Loader2 className="w-16 h-16 mb-4 text-blue-400 animate-spin" />
                )}
                {!uploading && uploadStatus === 'idle' && (
                  <Upload className="w-16 h-16 mb-4 text-slate-400" />
                )}
                {!uploading && uploadStatus === 'success' && (
                  <CheckCircle className="w-16 h-16 mb-4 text-green-400" />
                )}
                {!uploading && uploadStatus === 'error' && (
                  <XCircle className="w-16 h-16 mb-4 text-red-400" />
                )}

                <p className="mb-2 text-lg font-semibold text-white">
                  {uploading && '正在上传...'}
                  {!uploading && uploadStatus === 'idle' && '点击或拖拽视频文件到此处'}
                  {!uploading && uploadStatus === 'success' && '上传成功！'}
                  {!uploading && uploadStatus === 'error' && '上传失败'}
                </p>
                <p className="text-sm text-slate-400">
                  {uploading && '请稍候，不要关闭页面'}
                  {!uploading && uploadStatus === 'idle' && '支持MP4, MOV, AVI, WebM'}
                  {!uploading && uploadStatus === 'success' && '您可以继续上传更多视频'}
                  {!uploading && uploadStatus === 'error' && errorMessage}
                </p>
              </div>
              <input
                id="video-upload"
                type="file"
                className="hidden"
                accept="video/mp4,video/quicktime,video/x-msvideo,video/webm"
                onChange={handleFileUpload}
                disabled={uploading}
              />
            </label>

            {uploadedUrl && (
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-white font-semibold mb-3">视频URL:</h3>
                <div className="bg-slate-900 rounded-lg p-4 mb-4">
                  <code className="text-sm text-green-400 break-all">{uploadedUrl}</code>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(uploadedUrl);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  复制链接
                </button>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-700">
            <p className="text-center text-slate-400 text-sm">
              上传后，视频将存储在Supabase Storage中，您可以在项目中使用生成的URL
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <VideoList key={refreshKey} />
        </div>
      </div>
    </div>
  );
}
