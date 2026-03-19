import { Download as DownloadIcon, Package, Terminal, Info } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';

export default function Download() {
  const [showInstructions, setShowInstructions] = useState(false);

  const { data } = supabase.storage
    .from('downloads')
    .getPublicUrl('project-source.zip');

  const downloadUrl = data.publicUrl;

  const copyCommand = () => {
    navigator.clipboard.writeText('node create-download-package.js');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-[#f5af15] to-[#f5af15] rounded-full flex items-center justify-center mx-auto">
            <DownloadIcon className="w-10 h-10 text-white" />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">下载项目文件</h1>
            <p className="text-gray-400">下载完整的项目源代码</p>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 text-left">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-300">
                <p className="font-semibold mb-1">重要提示</p>
                <p className="text-blue-200/80">
                  当前下载的是最后一次打包的版本。如果你修改了代码，需要先重新打包才能下载到最新内容。
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <a
              href={downloadUrl}
              download="project-source.zip"
              className="w-full px-6 py-4 bg-gradient-to-r from-[#f5af15] to-[#f5af15] rounded-xl font-semibold flex items-center justify-center space-x-2 hover:scale-105 transition-transform duration-300 shadow-lg shadow-[#f5af15]/50"
            >
              <DownloadIcon className="w-5 h-5" />
              <span>下载 project-source.zip</span>
            </a>

            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full px-6 py-4 bg-slate-800 border border-slate-600 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-slate-700 transition-all duration-300"
            >
              <Package className="w-5 h-5" />
              <span>如何重新打包最新内容？</span>
            </button>
          </div>

          {showInstructions && (
            <div className="bg-slate-800 border border-slate-600 rounded-xl p-6 text-left space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Terminal className="w-5 h-5 text-[#f5af15]" />
                <span>重新打包步骤</span>
              </h3>

              <div className="space-y-3 text-sm text-gray-300">
                <div>
                  <p className="text-white font-medium mb-1">1. 在项目根目录运行以下命令：</p>
                  <div className="bg-slate-900 rounded-lg p-3 flex items-center justify-between">
                    <code className="text-[#f5af15] font-mono">node create-download-package.js</code>
                    <button
                      onClick={copyCommand}
                      className="text-xs px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
                    >
                      复制
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-white font-medium mb-1">2. 等待打包完成</p>
                  <p className="text-gray-400">脚本会自动：</p>
                  <ul className="list-disc list-inside text-gray-400 ml-2 space-y-1">
                    <li>收集所有项目文件</li>
                    <li>创建 zip 压缩包</li>
                    <li>上传到 Supabase 存储</li>
                  </ul>
                </div>

                <div>
                  <p className="text-white font-medium mb-1">3. 刷新页面并下载</p>
                  <p className="text-gray-400">打包成功后，刷新此页面即可下载最新版本</p>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                <p className="text-xs text-amber-300">
                  <strong>提示：</strong>这个操作需要在开发环境中执行，确保你有 Node.js 和项目依赖已安装。
                </p>
              </div>
            </div>
          )}

          <a
            href="/"
            className="block text-sm text-gray-400 hover:text-[#f5af15] transition-colors"
          >
            返回首页
          </a>
        </div>
      </div>
    </div>
  );
}
