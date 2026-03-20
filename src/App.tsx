import { useEffect, useMemo, useRef } from 'react';
import RoboticPlusHomepageCn from './pages/RoboticPlusHomepageCn';
import RoboticPlusHomepageEn from './pages/RoboticPlusHomepageEn';

type AppLanguage = 'cn' | 'en';

const DESKTOP_BREAKPOINT = 1024;
const SCROLL_LOCK_MS = 850;
const DATA_SNAP_THRESHOLD = 0.98;
const SECTION_IDS = ['home', 'data', 'engine', 'solution', 'humanoid', 'advantages', 'about', 'cooperation'] as const;

function App({ language }: { language: AppLanguage }) {
  const scrollLockRef = useRef(false);
  const sectionIds = useMemo(() => [...SECTION_IDS], []);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (window.innerWidth < DESKTOP_BREAKPOINT || scrollLockRef.current) {
        return;
      }

      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => section !== null);

      if (sections.length === 0) {
        return;
      }

      const currentSectionIndex = sections.reduce((closestIndex, section, index) => {
        const rect = section.getBoundingClientRect();
        const closestSectionRect = sections[closestIndex].getBoundingClientRect();

        if (Math.abs(rect.top) < Math.abs(closestSectionRect.top)) {
          return index;
        }

        return closestIndex;
      }, 0);

      const direction = event.deltaY > 0 ? 1 : -1;
      if (direction === 0) {
        return;
      }

      const nextSection = sections[currentSectionIndex + direction];
      if (!nextSection) {
        return;
      }

      const currentSectionId = sectionIds[currentSectionIndex];
      const nextSectionId = sectionIds[currentSectionIndex + direction];

      if (currentSectionId === 'home' || nextSectionId === 'data') {
        return;
      }

      if (currentSectionId === 'data' && direction > 0) {
        const currentSection = sections[currentSectionIndex];
        const sectionHeight = currentSection.offsetHeight;

        if (sectionHeight > 0) {
          const visibleProgress = Math.min(
            Math.max(window.scrollY - currentSection.offsetTop + window.innerHeight, 0) /
              sectionHeight,
            1,
          );

          if (visibleProgress < DATA_SNAP_THRESHOLD) {
            return;
          }
        }
      }

      event.preventDefault();
      scrollLockRef.current = true;
      nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

      window.setTimeout(() => {
        scrollLockRef.current = false;
      }, SCROLL_LOCK_MS);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      scrollLockRef.current = false;
    };
  }, [sectionIds]);

  if (language === 'en') {
    return <RoboticPlusHomepageEn />;
  }

  return <RoboticPlusHomepageCn />;
}

export default App;
