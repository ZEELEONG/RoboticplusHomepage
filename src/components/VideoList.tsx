import { useEffect, useState, useRef } from 'react';
import { Copy, Download, Trash2, Loader2, CheckCircle, Play, X, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface VideoFile {
  name: string;
  id: string;
  created_at: string;
  size: number;
  url: string;
  originalFilename?: string;
}

export default function VideoList() {
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [previewVideo, setPreviewVideo] = useState<VideoFile | null>(null);
  const [reuploadingId, setReuploadingId] = useState<string | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from('videos')
        .list('', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (error) throw error;

      // 获取所有视频的元数据
      const { data: metadataList } = await supabase
        .from('video_metadata')
        .select('*');

      // 创建元数据映射表
      const metadataMap = new Map(
        (metadataList || []).map(m => [m.storage_path, m])
      );

      const videoList: VideoFile[] = (data || []).map((file: any) => {
        const { data: publicUrlData } = supabase.storage
          .from('videos')
          .getPublicUrl(file.name);

        const metadata = metadataMap.get(file.name);

        return {
          name: file.name,
          id: file.id,
          created_at: file.created_at,
          size: file.metadata?.size || 0,
          url: publicUrlData.publicUrl,
          originalFilename: metadata?.original_filename,
        };
      });

      setVideos(videoList);
    } catch (error) {
      console.error('获取视频列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleCopy = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('复制失败:', error);
    }
  };

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async (name: string, id: string) => {
    if (!confirm('确定要删除这个视频吗？此操作不可撤销。')) {
      return;
    }

    setDeletingId(id);
    try {
      // 删除存储中的文件
      const { error } = await supabase.storage
        .from('videos')
        .remove([name]);

      if (error) throw error;

      // 删除数据库中的元数据
      await supabase
        .from('video_metadata')
        .delete()
        .eq('storage_path', name);

      setVideos(videos.filter(v => v.id !== id));
    } catch (error) {
      console.error('删除失败:', error);
      alert('删除失败，请重试');
    } finally {
      setDeletingId(null);
    }
  };

  const handleReupload = async (video: VideoFile, file: File) => {
    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('文件大小超过100MB限制');
      return;
    }

    setReuploadingId(video.id);
    try {
      // 使用相同的文件名上传，upsert: true 会覆盖原文件
      const { error: uploadError } = await supabase.storage
        .from('videos')
        .upload(video.name, file, {
          cacheControl: '3600',
          upsert: true // 关键：覆盖现有文件
        });

      if (uploadError) throw uploadError;

      // 更新数据库中的元数据
      const { error: metadataError } = await supabase
        .from('video_metadata')
        .update({
          original_filename: file.name,
          file_size: file.size,
          mime_type: file.type,
          uploaded_at: new Date().toISOString()
        })
        .eq('storage_path', video.name);

      if (metadataError) {
        console.error('更新元数据失败:', metadataError);
      }

      // 刷新视频列表
      await fetchVideos();
      alert('重新上传成功！文件已更新，URL保持不变。');
    } catch (error) {
      console.error('重新上传失败:', error);
      alert('重新上传失败，请重试');
    } finally {
      setReuploadingId(null);
    }
  };

  const triggerFileInput = (videoId: string) => {
    fileInputRefs.current[videoId]?.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">暂无上传的视频</p>
      </div>
    );
  }

  return (
    <>
      {previewVideo && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewVideo(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewVideo(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                {previewVideo.originalFilename || previewVideo.name}
              </h3>
              <div className="flex gap-3 text-sm text-slate-400 mb-4">
                <span>{formatSize(previewVideo.size)}</span>
                <span>•</span>
                <span>{formatDate(previewVideo.created_at)}</span>
              </div>

              <video
                src={previewVideo.url}
                controls
                autoPlay
                className="w-full rounded-lg"
                style={{ maxHeight: '70vh' }}
              >
                您的浏览器不支持视频播放
              </video>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-4">已上传的视频 ({videos.length})</h2>

        <div className="space-y-3">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 hover:border-slate-600 transition-colors"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium truncate mb-1">{video.name}</h3>
                {video.originalFilename && (
                  <div className="text-sm text-blue-400 mb-1">
                    原始文件名: {video.originalFilename}
                  </div>
                )}
                <div className="flex flex-wrap gap-3 text-sm text-slate-400">
                  <span>{formatSize(video.size)}</span>
                  <span>•</span>
                  <span>{formatDate(video.created_at)}</span>
                </div>
                <div className="mt-2 bg-slate-900 rounded px-3 py-2">
                  <code className="text-xs text-green-400 break-all">{video.url}</code>
                </div>
              </div>

              <div className="flex gap-2 flex-shrink-0 flex-wrap">
                <button
                  onClick={() => setPreviewVideo(video)}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={deletingId === video.id || reuploadingId === video.id}
                >
                  <Play className="w-4 h-4" />
                  <span className="hidden sm:inline">播放</span>
                </button>

                <button
                  onClick={() => handleCopy(video.url, video.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={deletingId === video.id || reuploadingId === video.id}
                >
                  {copiedId === video.id ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span className="hidden sm:inline">已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="hidden sm:inline">复制</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDownload(video.url, video.name)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={deletingId === video.id || reuploadingId === video.id}
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">下载</span>
                </button>

                <button
                  onClick={() => triggerFileInput(video.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={deletingId === video.id || reuploadingId === video.id}
                >
                  {reuploadingId === video.id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="hidden sm:inline">上传中</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" />
                      <span className="hidden sm:inline">重新上传</span>
                    </>
                  )}
                </button>

                <input
                  ref={(el) => (fileInputRefs.current[video.id] = el)}
                  type="file"
                  className="hidden"
                  accept="video/mp4,video/quicktime,video/x-msvideo,video/webm"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleReupload(video, file);
                    }
                    e.target.value = '';
                  }}
                />

                <button
                  onClick={() => handleDelete(video.name, video.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={deletingId === video.id || reuploadingId === video.id}
                >
                  {deletingId === video.id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="hidden sm:inline">删除中</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">删除</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </>
  );
}
