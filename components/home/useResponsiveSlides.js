'use client';

import { useEffect, useState } from 'react';

function getVisibleSlides(width, mobile, medium, large) {
  if (width >= 1024) {
    return large;
  }

  if (width >= 768) {
    return medium;
  }

  return mobile;
}

export default function useResponsiveSlides(mobile, medium, large) {
  const [visibleSlides, setVisibleSlides] = useState(mobile);

  useEffect(() => {
    const updateVisibleSlides = () => {
      setVisibleSlides(getVisibleSlides(window.innerWidth, mobile, medium, large));
    };

    updateVisibleSlides();
    window.addEventListener('resize', updateVisibleSlides);

    return () => window.removeEventListener('resize', updateVisibleSlides);
  }, [mobile, medium, large]);

  return visibleSlides;
}
