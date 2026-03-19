import { useEffect, useState } from 'react';
import { Cpu } from 'lucide-react';
import TestTemplate from './pages/TestTemplate';
import RoboticPlusHomepageCn from './pages/RoboticPlusHomepageCn';
import RoboticPlusHomepageEn from './pages/RoboticPlusHomepageEn';

type Page = 'test-template' | 'roboticplus-homepage-cn' | 'roboticplus-homepage-en';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('roboticplus-homepage-cn');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-slate-950/95 backdrop-blur-md shadow-lg' : 'bg-slate-950/80 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/180930_大界logo-04.png" alt="RoboticPlus.AI" className="w-10 h-10" />
            <div>
              <h1 className="text-xl font-bold">RoboticPlus.AI</h1>
              <p className="text-xs text-gray-400">大界</p>
            </div>
          </div>
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => setCurrentPage('roboticplus-homepage-cn')}
              className={`transition-colors ${currentPage === 'roboticplus-homepage-cn' ? '[color:#f5af15]' : 'hover:[color:#f5af15]'}`}
            >
              大界官网草稿
            </button>
            <button
              onClick={() => setCurrentPage('roboticplus-homepage-en')}
              className={`transition-colors ${currentPage === 'roboticplus-homepage-en' ? '[color:#f5af15]' : 'hover:[color:#f5af15]'}`}
            >
              英文版
            </button>
            <button
              onClick={() => setCurrentPage('test-template')}
              className={`transition-colors ${currentPage === 'test-template' ? '[color:#f5af15]' : 'hover:[color:#f5af15]'}`}
            >
              测试模板
            </button>
          </div>
        </div>
      </nav>

      {currentPage === 'roboticplus-homepage-cn' && <RoboticPlusHomepageCn />}
      {currentPage === 'roboticplus-homepage-en' && <RoboticPlusHomepageEn />}
      {currentPage === 'test-template' && <TestTemplate />}
    </div>
  );
}

export default App;
