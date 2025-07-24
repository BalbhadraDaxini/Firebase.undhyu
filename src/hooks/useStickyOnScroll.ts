
"use client";

import { useState, useEffect, RefObject } from 'react';

export default function useStickyOnScroll(ref: RefObject<HTMLElement>) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-20px 0px 0px 0px" } 
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isSticky;
}
