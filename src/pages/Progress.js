import React from 'react';
import { useLocation } from 'react-router-dom';

const Progress = () => {
  const location = useLocation();
  const progressData = location.state?.progressData;

  const storedHistory = JSON.parse(localStorage.getItem('progressHistory')) || [];

  // Adding the most recent progress if available
  if (progressData) {
    storedHistory.push(progressData);
    localStorage.setItem('progressHistory', JSON.stringify(storedHistory));
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black">
      <h1 className="text-4xl font-bold text-center">Progress History</h1>

      <div className="mt-8 p-4 w-full max-w-xl bg-white rounded shadow">
        <h2 className="text-2xl font-semibold">Most Recent Task</h2>
        {progressData ? (
          <div>
            <p><strong>Description:</strong> {progressData.description}</p>
            <p><strong>Date:</strong> {progressData.date}</p>
            <p><strong>Time:</strong> {progressData.time}</p>
            <p><strong>Coins Earned:</strong> {progressData.coins}</p>
          </div>
        ) : (
          <p>No progress recorded yet.</p>
        )}
      </div>

      <div className="mt-8 w-full max-w-xl bg-white rounded shadow p-4">
        <h2 className="text-2xl font-semibold">All Progress</h2>
        <ul>
          {storedHistory.map((entry, index) => (
            <li key={index} className="border-b py-2">
              <p><strong>Description:</strong> {entry.description}</p>
              <p><strong>Date:</strong> {entry.date}</p>
              <p><strong>Time:</strong> {entry.time}</p>
              <p><strong>Coins Earned:</strong> {entry.coins}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Progress;
