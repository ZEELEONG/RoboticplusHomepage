import { useState } from 'react';
import App from './App';
import VideoUpload from './components/VideoUpload';
import Download from './components/Download';
import FilesManager from './pages/FilesManager';

export default function AppRouter() {
  const [currentPage, setCurrentPage] = useState<'home' | 'upload' | 'download' | 'files'>(() => {
    if (window.location.pathname === '/upload') return 'upload';
    if (window.location.pathname === '/download') return 'download';
    if (window.location.pathname === '/files') return 'files';
    return 'home';
  });

  const navigate = (page: 'home' | 'upload' | 'download' | 'files') => {
    setCurrentPage(page);
    const path = page === 'home' ? '/' : `/${page}`;
    window.history.pushState(null, '', path);
  };

  window.addEventListener('popstate', () => {
    if (window.location.pathname === '/upload') {
      setCurrentPage('upload');
    } else if (window.location.pathname === '/download') {
      setCurrentPage('download');
    } else if (window.location.pathname === '/files') {
      setCurrentPage('files');
    } else {
      setCurrentPage('home');
    }
  });

  if (currentPage === 'upload') {
    return <VideoUpload />;
  }

  if (currentPage === 'download') {
    return <Download />;
  }

  if (currentPage === 'files') {
    return <FilesManager />;
  }

  return <App />;
}
