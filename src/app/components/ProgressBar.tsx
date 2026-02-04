import React from 'react';

interface ProgressBarProps {
  progress: number; // A number between 0 and 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
      <div
        className="bg-blue-600 h-4 rounded-full text-xs flex items-center justify-center text-white"
        style={{ width: `${progress}%` }}
      >
        {progress.toFixed(0)}%
      </div>
    </div>
  );
};

export default ProgressBar;
