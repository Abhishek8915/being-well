// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";

// const PomodoroTimer = () => {
//   const navigate = useNavigate();

//   const [workTime, setWorkTime] = useState(25 * 60); // Default work time
//   const [breakTime, setBreakTime] = useState(5 * 60); // Default break time
//   const [timer, setTimer] = useState(workTime);
//   const [isActive, setIsActive] = useState(false);
//   const [isPaused, setIsPaused] = useState(true);
//   const [workDescription, setWorkDescription] = useState("");
//   const [musicUrl, setMusicUrl] = useState("");
//   const [audio, setAudio] = useState(null);
//   const [timerName, setTimerName] = useState("Pomodoro Timer");
//   const [coins, setCoins] = useState(0);

//   const [history, setHistory] = useState([]); // Pomodoro history
//   const [focusMode, setFocusMode] = useState(false); // Focus mode
//   const [darkMode, setDarkMode] = useState(false); // Dark mode toggle
//   const [showAnalytics, setShowAnalytics] = useState(false); // Show analytics
//   const [progress, setProgress] = useState(0); // Progress bar percentage

//   useEffect(() => {
//     if (audio) {
//       isActive && !isPaused ? audio.play() : audio.pause();
//     }
//   }, [audio, isActive, isPaused]);

//   const handleStartStop = () => {
//     setIsActive(!isActive);
//     setIsPaused(!isPaused);
//     if (!isActive && !isPaused && focusMode) {
//       document.body.style.backgroundColor = "#282c34"; // Dark mode
//     } else {
//       document.body.style.backgroundColor = ""; // Default background
//     }
//   };

//   const handleReset = () => {
//     setIsActive(false);
//     setIsPaused(true);
//     setTimer(workTime);
//     setTimerName("Pomodoro Timer");
//     if (audio) audio.pause();
//     setProgress(0);
//   };

//   const handleMusicUrlChange = (event) => setMusicUrl(event.target.value);

//   const handleStartMusic = () => {
//     const newAudio = new Audio(musicUrl);
//     setAudio(newAudio);
//     if (newAudio) newAudio.play();
//   };

//   const handleWorkDescriptionChange = (event) => setWorkDescription(event.target.value);

//   const handleProgress = useCallback(() => {
//     const date = new Date();
//     const progressData = {
//       description: workDescription,
//       date: date.toLocaleDateString(),
//       time: date.toLocaleTimeString(),
//       coins,
//     };
//     setHistory((prevHistory) => [...prevHistory, progressData]); // Add to history
//     navigate("/progress", { state: { progressData } });
//   }, [workDescription, coins, navigate]);

//   useEffect(() => {
//     if (isActive && !isPaused) {
//       const interval = setInterval(() => {
//         if (timer > 0) {
//           setTimer(timer - 1);
//           setProgress(((workTime - timer) / workTime) * 100); // Update progress bar
//         } else {
//           clearInterval(interval);
//           setIsActive(false);
//           setIsPaused(true);
//           setCoins(coins + 1);
//           handleProgress();
//         }
//       }, 1000);
//       return () => clearInterval(interval);
//     }
//   }, [isActive, isPaused, timer, coins, handleProgress]);

//   const handleBreakTimeChange = (event) => setBreakTime(event.target.value * 60);
//   const handleWorkTimeChange = (event) => setWorkTime(event.target.value * 60);

//   const minutes = Math.floor(timer / 60);
//   const seconds = timer % 60;

//   const toggleDarkMode = () => setDarkMode(!darkMode);

//   return (
//     <div className={`flex min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} justify-between`}>
//       {/* Left Section: Music & Report */}
//       <div className="w-full md:w-1/2 flex flex-col items-center justify-between p-6 border-r border-gray-300 space-y-6">
//         <h1 className="text-4xl font-semibold text-center">Pomodoro Timer</h1>

//         <div className="w-full max-w-md space-y-4">
//           <input
//             type="text"
//             placeholder="Enter Music URL"
//             value={musicUrl}
//             onChange={handleMusicUrlChange}
//             className="p-3 border border-gray-300 rounded-md w-full"
//           />
//           <button onClick={handleStartMusic} className="bg-blue-600 text-white px-6 py-3 rounded-md w-full shadow-md hover:bg-blue-700">
//             Play Music
//           </button>
//         </div>

//         <button onClick={() => navigate("/progress")} className="bg-purple-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-purple-700 w-full">
//           View Report
//         </button>

//         <button onClick={toggleDarkMode} className="bg-yellow-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-yellow-700 w-full">
//           Toggle Dark Mode
//         </button>
//       </div>

//       {/* Right Section: Timer, Tasks & Analytics */}
//       <div className="w-full md:w-1/2 flex flex-col items-center justify-between p-6 space-y-6">
//         {/* Work Timer Input */}
//         <div className="flex flex-col items-center space-y-2 w-full">
//           <label htmlFor="workTime" className="text-lg font-semibold">Work Time (min):</label>
//           <input
//             type="number"
//             id="workTime"
//             value={workTime / 60}
//             onChange={handleWorkTimeChange}
//             className="p-3 border border-gray-300 rounded-md w-1/2"
//           />
//         </div>

//         {/* Break Timer Input */}
//         <div className="flex flex-col items-center space-y-2 w-full">
//           <label htmlFor="breakTime" className="text-lg font-semibold">Break Time (min):</label>
//           <input
//             type="number"
//             id="breakTime"
//             value={breakTime / 60}
//             onChange={handleBreakTimeChange}
//             className="p-3 border border-gray-300 rounded-md w-1/2"
//           />
//         </div>

//         {/* Timer Display */}
//         <div className="text-4xl font-semibold mt-6">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>

//         {/* Timer Controls */}
//         <div className="mt-6 flex space-x-4">
//           <button onClick={handleStartStop} className="bg-green-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-700">
//             {isActive ? "Pause" : "Start"}
//           </button>
//           <button onClick={handleReset} className="bg-red-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-700">
//             Reset
//           </button>
//         </div>

//         {/* Progress Bar */}
//         <div className="w-full mt-6 bg-gray-300 rounded-full h-2.5">
//           <div
//             className="bg-blue-600 h-2.5 rounded-full"
//             style={{ width: `${progress}%` }}
//           ></div>
//         </div>

//         {/* Focus Mode */}
//         <div className="mt-6">
//           <button
//             onClick={() => setFocusMode(!focusMode)}
//             className={`${
//               focusMode ? "bg-red-600" : "bg-yellow-600"
//             } text-white px-6 py-3 rounded-md shadow-md hover:bg-opacity-80`}
//           >
//             {focusMode ? "Exit Focus Mode" : "Start Focus Mode"}
//           </button>
//         </div>

//         {/* Show Analytics */}
//         <button
//           onClick={() => setShowAnalytics(!showAnalytics)}
//           className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-purple-700"
//         >
//           {showAnalytics ? "Hide Analytics" : "Show Analytics"}
//         </button>

//         {/* Analytics Section */}
//         {showAnalytics && (
//           <div className="mt-6 bg-gray-200 p-4 rounded-md shadow-md w-full">
//             <h2 className="text-xl font-semibold">Pomodoro Analytics</h2>
//             <ul>
//               {history.map((item, index) => (
//                 <li key={index} className="mt-2">
//                   {item.date} {item.time} - {item.description} (Coins Earned: {item.coins})
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PomodoroTimer;

import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const PomodoroTimer = () => {
  const navigate = useNavigate();

  // State hooks for timer and settings
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
  const [history, setHistory] = useState([]);
  const [focusMode, setFocusMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [progress, setProgress] = useState(0);

  // Effect hook for audio control
  useEffect(() => {
    if (audio) {
      isActive && !isPaused ? audio.play() : audio.pause();
    }
  }, [audio, isActive, isPaused]);

  // Function to handle start and stop of the timer
  const handleStartStop = () => {
    setIsActive(!isActive);
    setIsPaused(!isPaused);
  };

  // Function to reset the timer
  const handleReset = () => {
    setIsActive(false);
    setIsPaused(true);
    setTimer(workTime);
    setProgress(0);
    if (audio) audio.pause();
  };

  // Function to handle music URL change
  const handleMusicUrlChange = (event) => setMusicUrl(event.target.value);

  // Function to play music
  const handleStartMusic = () => {
    const newAudio = new Audio(musicUrl);
    setAudio(newAudio);
    if (newAudio) newAudio.play();
  };

  // Function to handle work description input
  const handleWorkDescriptionChange = (event) => setWorkDescription(event.target.value);

  // Function to log progress
  const handleProgress = useCallback(() => {
    const date = new Date();
    const progressData = {
      description: workDescription,
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      coins,
    };
    setHistory((prevHistory) => [...prevHistory, progressData]);
    navigate("/progress", { state: { progressData } });
  }, [workDescription, coins, navigate]);

  // Timer countdown effect
  useEffect(() => {
    if (isActive && !isPaused) {
      const interval = setInterval(() => {
        if (timer > 0) {
          setTimer(timer - 1);
          setProgress(((workTime - timer) / workTime) * 100);
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

  // Handlers for work and break time changes
  const handleBreakTimeChange = (event) => {
    const newBreakTime = event.target.value * 60;
    setBreakTime(newBreakTime);
    if (!isActive && !isPaused) setTimer(newBreakTime); // Update timer if running
  };

  const handleWorkTimeChange = (event) => {
    const newWorkTime = event.target.value * 60;
    setWorkTime(newWorkTime);
    setTimer(newWorkTime); // Update timer immediately when work time changes
  };

  // Function to toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Format time in MM:SS format
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className={`flex min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} justify-between`}>
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-between p-6 border-r border-gray-300 space-y-4">
        <h1 className="text-4xl font-extrabold text-center font-[Roboto] text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
          Pomodoro Timer
        </h1>

        <div className="w-full max-w-md space-y-4">
          <input
            type="text"
            placeholder="Enter Music URL"
            value={musicUrl}
            onChange={handleMusicUrlChange}
            className={`p-3 border border-gray-300 rounded-md w-full ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
          />
          <button onClick={handleStartMusic} className="bg-blue-600 text-white px-6 py-2 rounded-md w-full shadow-md hover:bg-blue-700">
            Play Music
          </button>
        </div>

        <div className="flex space-x-4 w-full">
          <button onClick={() => navigate("/progress")} className="bg-purple-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-purple-700 w-full">
            View Report
          </button>
          <button onClick={toggleDarkMode} className="bg-yellow-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-yellow-700 w-full">
            Toggle Dark Mode
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-between p-6 space-y-6">
        {/* Work Time and Break Time Inputs */}
        <div className="flex space-x-6 w-full justify-center">
          <div className="flex flex-col items-center space-y-2">
            <label htmlFor="workTime" className="text-lg font-semibold">Work Time (min):</label>
            <input
              type="number"
              id="workTime"
              value={workTime / 60}
              onChange={handleWorkTimeChange}
              className={`p-3 border border-gray-300 rounded-md w-20 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
            />
          </div>

          <div className="flex flex-col items-center space-y-2">
            <label htmlFor="breakTime" className="text-lg font-semibold">Break Time (min):</label>
            <input
              type="number"
              id="breakTime"
              value={breakTime / 60}
              onChange={handleBreakTimeChange}
              className={`p-3 border border-gray-300 rounded-md w-20 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
            />
          </div>
        </div>

        {/* Timer Display */}
        <div className="text-4xl font-semibold mt-6">{minutes}:{seconds < 10 ? `0${seconds}` : seconds}</div>

        {/* Timer Controls */}
        <div className="mt-6 flex space-x-4">
          <button onClick={handleStartStop} className="bg-green-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-700">
            {isActive ? "Pause" : "Start"}
          </button>
          <button onClick={handleReset} className="bg-red-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-red-700">
            Reset
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full mt-6 bg-gray-300 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Focus Mode */}
        <div className="mt-6">
          <button
            onClick={() => setFocusMode(!focusMode)}
            className={`${
              focusMode ? "bg-red-600" : "bg-yellow-600"
            } text-white px-6 py-3 rounded-md shadow-md hover:bg-opacity-80`}
          >
            {focusMode ? "Exit Focus Mode" : "Start Focus Mode"}
          </button>
        </div>

        {/* Show Analytics */}
        <button
          onClick={() => setShowAnalytics(!showAnalytics)}
          className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-purple-700"
        >
          {showAnalytics ? "Hide Analytics" : "Show Analytics"}
        </button>

        {/* Analytics Section */}
        {showAnalytics && (
          <div className="mt-6 bg-gray-200 p-4 rounded-md shadow-md w-full">
            <h2 className="text-xl font-semibold">Pomodoro Analytics</h2>
            <ul>
              {history.map((item, index) => (
                <li key={index} className="text-sm">
                  {item.date} - {item.time} - {item.description} - Coins: {item.coins}
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
