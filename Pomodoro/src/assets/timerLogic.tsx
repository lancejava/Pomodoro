import React from 'react';

export interface TimerOptions {
  isRunning: boolean;
  timerRef: React.MutableRefObject<number | undefined>;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  workDuration: number;
  breakDuration: number;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}

export const toggleTimer = ({
  isRunning,
  timerRef,
  setTimeLeft,
  workDuration,
  breakDuration,
  setIsRunning,
}: TimerOptions) => {
  if (isRunning) {
    clearInterval(timerRef.current!);
    setIsRunning(false);
  } else {
    timerRef.current = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 0) {
          clearInterval(timerRef.current!);
          if (prevTimeLeft === workDuration) {
            chrome.notifications.create('', {
              type: 'basic',
              iconUrl: 'assets/clock.png',
              title: 'Pomodoro Timer',
              message: 'Work interval ended. Take a break!',
            });
            setTimeLeft(breakDuration);
          } else {
            chrome.notifications.create('', {
              type: 'basic',
              iconUrl: 'assets/clock.png',
              title: 'Pomodoro Timer',
              message: 'Break interval ended. Back to work!',
            });
            setTimeLeft(workDuration);
          }
          setIsRunning(false);
          return prevTimeLeft;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);
    setIsRunning(true);
  }
};

export const resetTimer = ({
  timerRef,
  setTimeLeft,
  workDuration,
  setIsRunning,
}: Omit<TimerOptions, 'isRunning' | 'breakDuration'>) => {
  clearInterval(timerRef.current!);
  setTimeLeft(workDuration);
  setIsRunning(false);
};

export default toggleTimer; // exporting just one of the functions for demonstration purposes
