import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PomodoroTimer = () => {
  const navigate = useNavigate();

  const [workTime, setWorkTime] = useState(25 * 60); // Default to 25 minutes for work
  const [breakTime, setBreakTime] = useState(5 * 60); // Default to 5 minutes for break
  const [timer, setTimer] = useState(workTime); // Timer starts with work time
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [workDescription, setWorkDescription] = useState('');
  const [musicUrl, setMusicUrl] = useState('');
  const [audio, setAudio] = useState(null);
  const [timerName, setTimerName] = useState('Pomodoro Timer');
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    if (audio) {
      isActive && !isPaused ? audio.play() : audio.pause();
    }
  }, [audio, isActive, isPaused]);

  const handleStartStop = () => {
    if (isActive) {
      setIsActive(false);
      setIsPaused(true);
    } else {
      setIsActive(true);
      setIsPaused(false);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(true);
    setTimer(workTime); // Reset timer to work time
    setTimerName('Pomodoro Timer');
    if (audio) {
      audio.pause();
    }
  };

  const handleMusicUrlChange = (event) => {
    setMusicUrl(event.target.value);
  };

  const handleStartMusic = () => {
    const newAudio = new Audio(musicUrl);
    setAudio(newAudio);
    if (newAudio) {
      newAudio.play();
    }
  };

  const handleWorkDescriptionChange = (event) => {
    setWorkDescription(event.target.value);
  };

  // Progress function to save data
  const handleProgress = () => {
    const date = new Date();
    const progressData = {
      description: workDescription,
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      coins,
    };
    // Save progress in history
    navigate('/progress', { state: { progressData } });
  };

  const handleCustomWorkTimeChange = (event) => {
    setWorkTime(Number(event.target.value) * 60); // Convert to seconds
    setTimer(Number(event.target.value) * 60);
  };

  const handleCustomBreakTimeChange = (event) => {
    setBreakTime(Number(event.target.value) * 60); // Convert to seconds
  };

  useEffect(() => {
    if (isActive && !isPaused) {
      const interval = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
        } else {
          clearInterval(interval);
          setIsActive(false);
          setIsPaused(true);
          setCoins(coins + 1); // Give coin for completing the task
          handleProgress(); // Call progress when timer finishes
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isActive, isPaused, timer, coins, handleProgress]);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <h1 className="text-4xl font-bold text-center">{timerName}</h1>

      <div className="mt-8">
        <input
          type="text"
          placeholder="Enter work description"
          value={workDescription}
          onChange={handleWorkDescriptionChange}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="text-3xl font-semibold mt-4">
        {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>

      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={handleStartStop}
          className="bg-green-500 text-white px-6 py-2 rounded"
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 text-white px-6 py-2 rounded"
        >
          Reset
        </button>
      </div>

      <div className="mt-4 flex justify-center space-x-4">
        <input
          type="text"
          placeholder="Enter Music URL"
          value={musicUrl}
          onChange={handleMusicUrlChange}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleStartMusic}
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          Play Music
        </button>
      </div>

      {/* Customizable Timer Settings */}
      <div className="mt-8">
        <div>
          <label className="mr-4 text-lg">Work Time (minutes):</label>
          <input
            type="number"
            min="1"
            value={workTime / 60}
            onChange={handleCustomWorkTimeChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mt-4">
          <label className="mr-4 text-lg">Break Time (minutes):</label>
          <input
            type="number"
            min="1"
            value={breakTime / 60}
            onChange={handleCustomBreakTimeChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleProgress}
          className="bg-yellow-500 text-white px-6 py-2 rounded"
        >
          Complete Task (Earn Coin)
        </button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
