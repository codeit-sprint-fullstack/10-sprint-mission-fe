import { useEffect, useState } from 'react';

const useViewport = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mqDesktop = window.matchMedia('(min-width: 1024px)');
    const mqTablet = window.matchMedia('(min-width: 768px) and (max-width: 1023px)');
    const update = () => {
      setIsDesktop(mqDesktop.matches);
      setIsTablet(mqTablet.matches);
      setIsMobile(!mqDesktop.matches && !mqTablet.matches);
    };
    update();
    mqDesktop.addEventListener('change', update);
    mqTablet.addEventListener('change', update);
    return () => {
      mqDesktop.removeEventListener('change', update);
      mqTablet.removeEventListener('change', update);
    };
  }, []);

  return { isDesktop, isTablet, isMobile };
};

export default useViewport;


