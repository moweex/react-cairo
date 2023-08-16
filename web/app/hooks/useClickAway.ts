'use client';

import { useEffect } from 'react';

export function useClickAway(
  ref: React.MutableRefObject<any>,
  onClickAway: (event: MouseEvent | TouchEvent) => void,
  disabled?: boolean,
) {
  useEffect(() => {
    if (disabled) return;

    const handleClickAway = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickAway(event);
      }
    };

    document.addEventListener('mousedown', handleClickAway);
    document.addEventListener('touchstart', handleClickAway);

    return () => {
      document.removeEventListener('mousedown', handleClickAway);
      document.removeEventListener('touchstart', handleClickAway);
    };
  }, [ref, onClickAway, disabled]);
}
