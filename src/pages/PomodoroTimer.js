import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const PomodoroTimer = () => {
  const navigate = useNavigate();

  const [workTime, setWorkTime] = useState(25 * 60); // Default work time
  const [breakTime, setBreakTime] = useState(5 * 60); // Default break time
  const [timer, setTimer] = useState(workTime);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [workDescription, setWorkDescription] = useState("");
  const [musicUrl, setMusicUrl] = useState("");
  const [audio, setAudio] = useState(null);
  const [timerName, setTimerName] = useState("Pomodoro Timer");
  const [coins, setCoins] = useState(0);

  const [history, setHistory] = useState([]); // Pomodoro history
  const [focusMode, setFocusMode] = useState(false); // Focus mode
  const [darkMode, setDarkMode] = useState(false); // Dark mode toggle
  const [showAnalytics, setShowAnalytics] = useState(false); // Show analytics
  const [progress, setProgress] = useState(0); // Progress bar percentage

  useEffect(() => {
    if (audio) {
      isActive && !isPaused ? audio.play() : audio.pause();
    }
  }, [audio, isActive, isPaused]);

  const handleStartStop = () => {
    setIsActive(!isActive);
    setIsPaused(!isPaused);
    if (!isActive && !isPaused && focusMode) {
      document.body.style.backgroundColor = "#282c34"; // Dark mode
    } else {
      document.body.style.backgroundColor = ""; // Default background
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setIsPaused(true);
    setTimer(workTime);
    setTimerName("Pomodoro Timer");
    if (audio) audio.pause();
    setProgress(0);
  };

  const handleMusicUrlChange = (event) => setMusicUrl(event.target.value);

  const handleStartMusic = () => {
    const newAudio = new Audio(musicUrl);
    setAudio(newAudio);
    if (newAudio) newAudio.play();
  };

  const handleWorkDescriptionChange = (event) => setWorkDescription(event.target.value);

  const handleProgress = useCallback(() => {
    const date = new Date();
    const progressData = {
      description: workDescription,
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      coins,
    };
    setHistory((prevHistory) => [...prevHistory, progressData]); // Add to history
    navigate("/progress", { state: { progressData } });
  }, [workDescription, coins, navigate]);

  useEffect(() => {
    if (isActive && !isPaused) {
      const interval = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
          setProgress(((workTime - timer) / workTime) * 100); // Update progress bar
        } else {
          clearInterval(interval);
          setIsActive(false);
          setIsPaused(true);
          setCoins(coins + 1);
          handleProgress();
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isActive, isPaused, timer, coins, handleProgress]);

  const handleBreakTimeChange = (event) => setBreakTime(event.target.value * 60);
  const handleWorkTimeChange = (event) => setWorkTime(event.target.value * 60);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`flex min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      {/* Left Section: Music & Report */}
      <div className="w-1/2 flex flex-col items-center justify-center p-6 border-r border-gray-300">
        <h1 className="text-4xl font-bold">Pomodoro Timer</h1>

        <div className="mt-6">
          <input
            type="text"
            placeholder="Enter Music URL"
            value={musicUrl}
            onChange={handleMusicUrlChange}
            className="p-3 border border-gray-300 rounded-md w-80" // Increased width and padding
          />
          <button onClick={handleStartMusic} className="bg-blue-600 text-white px-6 py-3 rounded-md ml-2 shadow-md">
            Play Music
          </button>
        </div>

        {/* Report Button */}
        <button onClick={() => navigate("/progress")} className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-md shadow-md">
          View Report
        </button>

        {/* Dark Mode Toggle */}
        <button onClick={toggleDarkMode} className="mt-6 bg-yellow-600 text-white px-6 py-3 rounded-md shadow-md">
          Toggle Dark Mode
        </button>
      </div>

      {/* Right Section: Timer, Tasks & Analytics */}
      <div className="w-1/2 flex flex-col items-center justify-center p-6">
        {/* Work Timer Input */}
        <div className="flex flex-col items-center">
          <label htmlFor="workTime" className="mb-2">Work Time (min):</label>
          <input
            type="number"
            id="workTime"
            value={workTime / 60}
            onChange={handleWorkTimeChange}
            className="p-3 border border-gray-300 rounded-md w-1/3" // Increased width and padding
          />
        </div>

        {/* Break Timer Input */}
        <div className="flex flex-col items-center mt-4">
          <label htmlFor="breakTime" className="mb-2">Break Time (min):</label>
          <input
            type="number"
            id="breakTime"
            value={breakTime / 60}
            onChange={handleBreakTimeChange}
            className="p-3 border border-gray-300 rounded-md w-1/3" // Increased width and padding
          />
        </div>

        {/* Timer Display */}
        <div className="text-3xl font-semibold mt-4">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>

        {/* Timer Controls */}
        <div className="mt-4 flex space-x-4">
          <button onClick={handleStartStop} className="bg-green-600 text-white px-6 py-3 rounded-md shadow-md">
            {isActive ? "Pause" : "Start"}
          </button>
          <button onClick={handleReset} className="bg-red-600 text-white px-6 py-3 rounded-md shadow-md">
            Reset
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full mt-6 bg-gray-300 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Focus Mode */}
        <div className="mt-6">
          <button
            onClick={() => setFocusMode(!focusMode)}
            className={`${
              focusMode ? "bg-red-600" : "bg-yellow-600"
            } text-white px-6 py-3 rounded-md shadow-md`}
          >
            {focusMode ? "Exit Focus Mode" : "Start Focus Mode"}
          </button>
        </div>

        {/* Show Analytics */}
        <button
          onClick={() => setShowAnalytics(!showAnalytics)}
          className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-md shadow-md"
        >
          {showAnalytics ? "Hide Analytics" : "Show Analytics"}
        </button>

        {/* Analytics Section */}
        {showAnalytics && (
          <div className="mt-6 bg-gray-200 p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold">Pomodoro Analytics</h2>
            <ul>
              {history.map((item, index) => (
                <li key={index} className="mt-2">
                  {item.date} {item.time} - {item.description} (Coins Earned: {item.coins})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PomodoroTimer;
