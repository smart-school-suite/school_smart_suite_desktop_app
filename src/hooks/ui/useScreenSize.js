import { useState, useEffect } from 'react';
const SCREEN = {
  MIN: 1024,     // Smallest laptop we support
  MD: 1280,      // Standard laptop
  LG: 1440,      // Large laptop
  XL: 1680,      // Wide / ultrawide
  MAX: 1920,     // Max we care about (optional cap)
};

function useScreenSize() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const is = {
    sm: width >= SCREEN.MIN && width < SCREEN.MD,
    md: width >= SCREEN.MD && width < SCREEN.LG,
    lg: width >= SCREEN.LG && width < SCREEN.XL,
    xl: width >= SCREEN.XL,
    wide: width >= SCREEN.XL,
    ultrawide: width >= 1920,
  };

  return {
    width,
    SCREEN, 
    is, 
    breakpoint: is.xl ? 'xl' : is.lg ? 'lg' : is.md ? 'md' : is.sm ? 'sm' : 'unknown',
  };
}

export default useScreenSize;