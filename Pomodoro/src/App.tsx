// PomodoroTimer.tsx
import React, { useState, useRef } from 'react';
import SettingsPage from './assets/SettingsPage';
import { toggleTimer, resetTimer } from './assets/timerLogic'; // Importing the timer logic

const PomodoroTimer: React.FC = () => {
  const [workDuration, setWorkDuration] = useState(25 * 60); // 25 minutes converted to seconds
  const [breakDuration, setBreakDuration] = useState(5 * 60); // 5 minutes converted to seconds
  const [timeLeft, setTimeLeft] = useState(workDuration); // Time left in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false); // State for settings visibility
  const timerRef = useRef<number | undefined>();

  // Toggle timer function using imported logic
  const handleToggleTimer = () =>
    toggleTimer({
      isRunning,
      timerRef,
      setTimeLeft,
      workDuration,
      breakDuration,
      setIsRunning,
    });

  // Reset timer function using imported logic
  const handleResetTimer = () =>
    resetTimer({
      timerRef,
      setTimeLeft,
      workDuration,
      setIsRunning,
    });

  // Toggle settings function
  const toggleSettings = () => {
    setSettingsVisible(!settingsVisible);
    handleResetTimer(); // Reset timer when settings are toggled
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h1>Pomodoro Timer</h1>
      <p>Time Left: {formatTime(timeLeft)}</p>
      {!settingsVisible && ( // Render button only if settings are not visible
        <button onClick={handleToggleTimer}>{isRunning ? 'Pause' : 'Start'}</button>
      )}
      {!settingsVisible && ( // Render button only if settings are not visible
        <button onClick={handleToggleTimer}>Reset</button>
      )}
      <p></p>
      {settingsVisible ? (
        <SettingsPage
          workDuration={workDuration}
          setWorkDuration={setWorkDuration}
          breakDuration={breakDuration}
          setBreakDuration={setBreakDuration}
          toggleSettings={toggleSettings}
        />
      ) : (
        <button onClick={toggleSettings}>Settings</button>
      )}
    </div>
  );
};

export default PomodoroTimer;
