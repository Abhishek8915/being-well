// import React, { useState, useEffect, useRef } from "react";
// // Tailwind CSS custom styles for larger elements
// const largeElementStyles = {
//   container: "max-w-7xl mx-auto px-8 py-12", // Increased padding
//   heading: "text-5xl md:text-6xl font-bold", // Larger text
//   subheading: "text-2xl md:text-3xl",
//   button: "text-xl px-8 py-4 rounded-xl", // Larger padding and text
//   input: "text-xl p-4 rounded-lg", // Larger input fields
//   card: "p-8 rounded-2xl", // More padding in cards
//   icon: "text-3xl", // Larger icons
//   text: "text-lg" // Larger regular text
// };

// const MeditationGuide = () => {
//   // State for background music
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef(null);

//   // State for mantra chanting
//   const [mantra, setMantra] = useState("Om...");

//   // State for meditation streak
//   const [streak, setStreak] = useState(
//     parseInt(localStorage.getItem("meditationStreak")) || 0
//   );

//   // State for mood
//   const [mood, setMood] = useState("Relaxing");

//   // Color scheme for each mood
//   const moodBackground = {
//     Relaxing: "bg-gradient-to-r from-[#2563eb] to-[#a7c7e7]", // Blue to soft pastel blue
//     Energizing: "bg-gradient-to-r from-[#2563eb] to-[#ff9f00]", // Blue to orange for energy
//     Healing: "bg-gradient-to-r from-[#2563eb] to-[#d4a5fd]", // Blue to soft lavender for healing
//     DeepFocus: "bg-gradient-to-r from-[#2563eb] to-[#0d1b2a]", // Blue to deep navy for focus
//   };

//   const moodButtonStyle = {
//     Relaxing: "bg-blue-600 hover:bg-blue-700",
//     Energizing: "bg-yellow-500 hover:bg-yellow-600",
//     Healing: "bg-purple-500 hover:bg-purple-600",
//     DeepFocus: "bg-gray-700 hover:bg-gray-800",
//   };

//   // Initialize audio on first render
//   useEffect(() => {
//     audioRef.current = new Audio("/sounds/meditation-music.mp3");
//   }, []);

//   // Function to start/stop meditation music
//   const toggleMusic = () => {
//     if (!audioRef.current) return;

//     if (isPlaying) {
//       audioRef.current.pause();
//       audioRef.current.currentTime = 0; // Reset audio when stopped
//     } else {
//       audioRef.current.play();
//       audioRef.current.loop = true;
//     }
//     setIsPlaying(!isPlaying);
//   };

//   // Function to handle meditation streak
//   const startMeditation = () => {
//     alert("Meditation started. Relax and focus.");
//     const newStreak = streak + 1;
//     setStreak(newStreak);
//     localStorage.setItem("meditationStreak", newStreak);
//   };

//   return (
//     <div
//       className={`h-screen flex flex-col items-center justify-center text-white p-6 ${moodBackground[mood]}`}
//     >
//       {/* Mood-Based Meditation Themes */}
//       <div className="mt-4">
//         <h3 className="text-lg font-semibold">Choose Mood:</h3>
//         <select
//           className="text-black p-2 rounded"
//           value={mood}
//           onChange={(e) => setMood(e.target.value)}
//         >
//           <option>Relaxing</option>
//           <option>Energizing</option>
//           <option>Healing</option>
//           <option>DeepFocus</option>
//         </select>
//       </div>

//       {/* Mantra Chanting */}
//       <p className="mt-6 text-2xl italic">"{mantra}"</p>

//       {/* Background Music Control */}
//       <button
//         className={`mt-6 px-6 py-3 rounded-full text-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:opacity-80 ${moodButtonStyle[mood]}`}
//         onClick={toggleMusic}
//       >
//         {isPlaying ? "Stop Music 🎵" : "Play Music 🎶"}
//       </button>

//       {/* Meditation Streak */}
//       <p className="mt-4 text-lg">🔥 Streak: {streak} Days</p>

//       {/* Start Meditation Button */}
//       <button
//         className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-lg"
//         onClick={startMeditation}
//       >
//         Start Meditation
//       </button>
//     </div>
//   );
// };

// export default MeditationGuide;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";


// const Meditation = () => {
//   // State to manage checkboxes
//   const [steps, setSteps] = useState({
//     step1: false,
//     step2: false,
//     step3: false,
//     step4: false,
//     step5: false,
//     step6: false,
//     step7: false,
//   });

//   const navigate = useNavigate(); // Hook to navigate to a new route

//   const handleStepChange = (step) => {
//     setSteps({
//       ...steps,
//       [step]: !steps[step],
//     });
//   };

//   const handleStartMeditation = () => {
//     // Navigate to the meditation guide page
//     navigate("/meditation-guide");
//   };

//   return (
//     <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-md mx-auto mt-8">
//       <h2 className="text-2xl font-semibold text-center mb-4">Meditation Steps</h2>

//       <div className="space-y-4">
//         {/* Step 1 */}
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             id="step1"
//             checked={steps.step1}
//             onChange={() => handleStepChange("step1")}
//             className="w-6 h-6 text-indigo-600"
//           />
//           <label htmlFor="step1" className="ml-2 text-lg">
//             Find a Quiet and Comfortable Space
//           </label>
//         </div>

//         {/* Step 2 */}
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             id="step2"
//             checked={steps.step2}
//             onChange={() => handleStepChange("step2")}
//             className="w-6 h-6 text-indigo-600"
//           />
//           <label htmlFor="step2" className="ml-2 text-lg">
//             Set Your Intention
//           </label>
//         </div>

//         {/* Step 3 */}
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             id="step3"
//             checked={steps.step3}
//             onChange={() => handleStepChange("step3")}
//             className="w-6 h-6 text-indigo-600"
//           />
//           <label htmlFor="step3" className="ml-2 text-lg">
//             Adopt a Comfortable Posture
//           </label>
//         </div>

//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             id="step4"
//             checked={steps.step4}
//             onChange={() => handleStepChange("step4")}
//             className="w-6 h-6 text-indigo-600"
//           />
//           <label htmlFor="step4" className="ml-2 text-lg">
//             Scan Your Body for Tension
//           </label>
//         </div>


//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             id="step5"
//             checked={steps.step5}
//             onChange={() => handleStepChange("step5")}
//             className="w-6 h-6 text-indigo-600"
//           />
//           <label htmlFor="step5" className="ml-2 text-lg">
//             Focus on Your Natural Breath
//           </label>
//         </div>

        
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             id="step6"
//             checked={steps.step6}
//             onChange={() => handleStepChange("step6")}
//             className="w-6 h-6 text-indigo-600"
//           />
//           <label htmlFor="step6" className="ml-2 text-lg">
//             Let Go of Expectations
//           </label>
//         </div>

//         {/* Step 4 */}
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             id="step7"
//             checked={steps.step7}
//             onChange={() => handleStepChange("step7")}
//             className="w-6 h-6 text-indigo-600"
//           />
//           <label htmlFor="step7" className="ml-2 text-lg">
//             Start your meditation session
//           </label>
//         </div>

//         {/* Start Meditation Button */}
//         <button
//           onClick={handleStartMeditation}
//           className="w-full bg-indigo-600 text-white py-2 rounded-md mt-6"
//         >
//           Start Meditation
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Meditation;

