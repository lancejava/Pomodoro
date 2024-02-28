// SettingsPage.tsx
import React from 'react';

interface SettingsPageProps {
  workDuration: number;
  setWorkDuration: React.Dispatch<React.SetStateAction<number>>;
  breakDuration: number;
  setBreakDuration: React.Dispatch<React.SetStateAction<number>>;
  toggleSettings: () => void; // Function to toggle SettingsPage visibility
}

const SettingsPage: React.FC<SettingsPageProps> = ({ workDuration, setWorkDuration, breakDuration, setBreakDuration, toggleSettings }) => {
  const handleWorkDurationChange = (amount: number) => {
    setWorkDuration((prevDuration) => Math.max(prevDuration + amount * 60, 60)); // Increment by 1 minute (60 seconds)
  };

  const handleBreakDurationChange = (amount: number) => {
    setBreakDuration((prevDuration) => Math.max(prevDuration + amount * 60, 60)); // Increment by 1 minute (60 seconds)
  };

  return (
    <div>
      <div>
        <p>Work Duration: {workDuration / 60} minutes</p>
        <button onClick={() => handleWorkDurationChange(-1)}>-</button>
        <button onClick={() => handleWorkDurationChange(1)}>+</button>
      </div>
      <div>
        <p>Break Duration: {breakDuration / 60} minutes</p>
        <button onClick={() => handleBreakDurationChange(-1)}>-</button>
        <button onClick={() => handleBreakDurationChange(1)}>+</button>
      </div>
      <p></p>
      <button onClick={toggleSettings}>Close Settings</button>
    </div>
  );
};

export default SettingsPage;
