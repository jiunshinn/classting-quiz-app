import {useEffect} from 'react';

const useTimer = (
  setTimer: React.Dispatch<React.SetStateAction<number>>,
): void => {
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [setTimer]);
};

export default useTimer;
