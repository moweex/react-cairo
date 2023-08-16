import { useEffect, useRef, useState } from 'react';

const TIMER = 60;
export const useRetry = () => {
  const penalty = useRef(1);
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    if (timer > 0) {
      const timeout = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [timer]);

  const retry = () => {
    setTimer(penalty.current * TIMER);
    penalty.current += 1;
  };
  const disabled = timer > 0;

  return { disabled, timer, retry };
};
