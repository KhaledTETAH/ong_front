import { useEffect, useRef, type RefObject } from 'react';

export function useAutoScroll<T extends HTMLElement>(deps: unknown[]): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, deps);

  return ref;
}