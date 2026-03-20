import { useEffect, useState } from 'react';
import App from './App';
import VideoUpload from './components/VideoUpload';
import Download from './components/Download';
import FilesManager from './pages/FilesManager';

type RouterPage = 'cn' | 'en' | 'upload' | 'download' | 'files';

const getPageFromPath = (): RouterPage => {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  const pathname = window.location.pathname;
  const normalizedPath = basePath && pathname.startsWith(basePath)
    ? pathname.slice(basePath.length) || '/'
    : pathname;

  if (normalizedPath === '/upload') return 'upload';
  if (normalizedPath === '/download') return 'download';
  if (normalizedPath === '/files') return 'files';

  const params = new URLSearchParams(window.location.search);
  if (params.get('lang') === 'en') return 'en';

  return 'cn';
};

export default function AppRouter() {
  const [currentPage, setCurrentPage] = useState<RouterPage>(getPageFromPath);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath());
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  if (currentPage === 'upload') {
    return <VideoUpload />;
  }

  if (currentPage === 'download') {
    return <Download />;
  }

  if (currentPage === 'files') {
    return <FilesManager />;
  }

  return <App language={currentPage} />;
}
