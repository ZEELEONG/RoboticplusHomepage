import { useState, useEffect } from 'react';
import { Trash2, File, Image, FolderOpen, CheckSquare, Square, Search, Upload, Download } from 'lucide-react';

interface FileItem {
  name: string;
  path: string;
  isDirectory: boolean;
  size: number;
  modified: string;
}

export default function FilesManager() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPath, setCurrentPath] = useState('/');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    loadFiles(currentPath);
  }, [currentPath]);

  const loadFiles = async (path: string) => {
    if (!isSupabaseConfigured) return;
    setIsLoading(true);
    try {
      const apiUrl = `${supabaseUrl}/functions/v1/file-manager?path=${encodeURIComponent(path)}`;
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
        }
      });
      if (!response.ok) throw new Error('Failed to load files');
      const data = await response.json();
      setFiles(data.files || []);
    } catch (error) {
      console.error('Error loading files:', error);
      setFiles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSelectedFiles = async () => {
    if (selectedFiles.size === 0) return;
    if (!isSupabaseConfigured) return;

    if (!confirm(`确定要删除 ${selectedFiles.size} 个文件吗？此操作不可恢复！`)) return;

    try {
      const filesToDelete = Array.from(selectedFiles);
      const apiUrl = `${supabaseUrl}/functions/v1/file-manager/delete`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ files: filesToDelete })
      });

      if (!response.ok) throw new Error('Failed to delete files');

      setSelectedFiles(new Set());
      await loadFiles(currentPath);
    } catch (error) {
      console.error('Error deleting files:', error);
      alert('删除文件时出错');
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    if (!isSupabaseConfigured) {
      alert('未配置 Supabase：请先设置 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY');
      return;
    }

    const formData = new FormData();
    formData.append('path', currentPath);

    for (let i = 0; i < fileList.length; i++) {
      formData.append('files', fileList[i]);
    }

    try {
      const apiUrl = `${supabaseUrl}/functions/v1/file-manager/upload`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: formData
      });

      if (!response.ok) throw new Error('Failed to upload files');

      await loadFiles(currentPath);
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('上传文件时出错');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length === 0) return;
    if (!isSupabaseConfigured) {
      alert('未配置 Supabase：请先设置 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY');
      return;
    }

    const formData = new FormData();
    formData.append('path', currentPath);

    droppedFiles.forEach(file => {
      formData.append('files', file);
    });

    try {
      const apiUrl = `${supabaseUrl}/functions/v1/file-manager/upload`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: formData
      });

      if (!response.ok) throw new Error('Failed to upload files');

      await loadFiles(currentPath);
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('上传文件时出错');
    }
  };

  const downloadFile = async (filePath: string, fileName: string) => {
    if (!isSupabaseConfigured) {
      alert('未配置 Supabase：请先设置 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY');
      return;
    }
    try {
      const apiUrl = `${supabaseUrl}/functions/v1/file-manager/download?path=${encodeURIComponent(filePath)}`;
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
        }
      });
      if (!response.ok) throw new Error('Failed to download file');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('下载文件时出错');
    }
  };

  const toggleFileSelection = (filePath: string) => {
    const newSelection = new Set(selectedFiles);
    if (newSelection.has(filePath)) {
      newSelection.delete(filePath);
    } else {
      newSelection.add(filePath);
    }
    setSelectedFiles(newSelection);
  };

  const toggleSelectAll = () => {
    if (selectedFiles.size === filteredFiles.length) {
      setSelectedFiles(new Set());
    } else {
      setSelectedFiles(new Set(filteredFiles.map(f => f.path)));
    }
  };

  const navigateToDirectory = (path: string) => {
    setCurrentPath(path);
    setSelectedFiles(new Set());
  };

  const goToParentDirectory = () => {
    if (currentPath === '/') return;
    const parentPath = currentPath.split('/').slice(0, -1).join('/') || '/';
    navigateToDirectory(parentPath);
  };

  const getFileIcon = (file: FileItem) => {
    if (file.isDirectory) return <FolderOpen className="w-5 h-5 text-blue-400" />;
    if (file.name.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) return <Image className="w-5 h-5 text-green-400" />;
    return <File className="w-5 h-5 text-slate-400" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '-';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN');
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {!isSupabaseConfigured && (
          <div className="mb-6 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-sm text-amber-200">
            <p className="font-medium mb-1">未配置 Supabase</p>
            <p className="text-amber-200/80">
              请在 GitHub 仓库 Secrets 中设置 <code>VITE_SUPABASE_URL</code> 和{' '}
              <code>VITE_SUPABASE_ANON_KEY</code>，再重新部署。
            </p>
          </div>
        )}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">文件管理器</h1>
          <p className="text-slate-400">管理项目文件 (Supabase Storage)</p>
        </div>

        <div
          className="bg-slate-800/50 rounded-xl p-6 backdrop-blur-sm mb-6"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-400">当前路径:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => navigateToDirectory('/')}
                  className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
                >
                  根目录
                </button>
                {currentPath !== '/' && (
                  <>
                    <span className="text-slate-500">/</span>
                    <span className="px-3 py-1 bg-blue-600 rounded">{currentPath.split('/').filter(Boolean).join(' / ')}</span>
                  </>
                )}
              </div>
            </div>

            {currentPath !== '/' && (
              <button
                onClick={goToParentDirectory}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors text-sm"
              >
                返回上级
              </button>
            )}

            <div className="ml-auto">
              <input
                type="file"
                multiple
                onChange={handleUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                上传文件
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="搜索文件..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
              />
            </div>
          </div>

          {selectedFiles.size > 0 && (
            <div className="mb-4 flex items-center gap-4 p-4 bg-blue-600/20 border border-blue-500/50 rounded-lg">
              <span className="text-sm">已选择 {selectedFiles.size} 个文件</span>
              <button
                onClick={deleteSelectedFiles}
                className="ml-auto flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                删除选中
              </button>
            </div>
          )}

          <div className="mb-4 flex items-center gap-2 pb-4 border-b border-slate-700">
            <button
              onClick={toggleSelectAll}
              className="flex items-center gap-2 text-sm hover:text-blue-400 transition-colors"
            >
              {selectedFiles.size === filteredFiles.length && filteredFiles.length > 0 ? (
                <CheckSquare className="w-5 h-5" />
              ) : (
                <Square className="w-5 h-5" />
              )}
              全选
            </button>
            <span className="text-slate-400 text-sm ml-auto">
              共 {filteredFiles.length} 个项目
            </span>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
              <p className="text-slate-400">加载中...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {filteredFiles.map((file) => (
                <div
                  key={file.path}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all cursor-pointer ${
                    selectedFiles.has(file.path)
                      ? 'bg-blue-600/20 border border-blue-500/50'
                      : 'bg-slate-700/30 hover:bg-slate-700/50 border border-transparent'
                  }`}
                  onClick={() => {
                    if (file.isDirectory) {
                      navigateToDirectory(file.path);
                    } else {
                      toggleFileSelection(file.path);
                    }
                  }}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {!file.isDirectory && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFileSelection(file.path);
                        }}
                        className="flex-shrink-0"
                      >
                        {selectedFiles.has(file.path) ? (
                          <CheckSquare className="w-5 h-5 text-blue-400" />
                        ) : (
                          <Square className="w-5 h-5 text-slate-400" />
                        )}
                      </button>
                    )}

                    <div className="flex-shrink-0">
                      {getFileIcon(file)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-sm text-slate-400">
                        {file.isDirectory ? '文件夹' : formatFileSize(file.size)} • {formatDate(file.modified)}
                      </p>
                    </div>
                  </div>

                  {!file.isDirectory && (
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadFile(file.path, file.name);
                        }}
                        className="p-2 hover:bg-slate-600 rounded-lg transition-colors"
                        title="下载"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`确定要删除 ${file.name} 吗？`)) {
                            setSelectedFiles(new Set([file.path]));
                            deleteSelectedFiles();
                          }
                        }}
                        className="p-2 hover:bg-red-600 rounded-lg transition-colors"
                        title="删除"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {filteredFiles.length === 0 && !isLoading && (
                <div className="text-center py-12 text-slate-400">
                  <File className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>此目录为空</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-blue-600/10 border border-blue-500/30 rounded-lg p-4 text-sm text-slate-300">
          <p className="font-medium mb-2">提示：</p>
          <ul className="list-disc list-inside space-y-1 text-slate-400">
            <li>点击文件夹可进入该目录</li>
            <li>拖拽文件到页面可直接上传</li>
            <li>选中文件后可批量删除</li>
            <li>注意：删除操作不可恢复，请谨慎操作</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
