// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// const useProgress = () => {
//   const [progress, setProgress] = useState(() => JSON.parse(localStorage.getItem("progress")) || 0);
//   const [streak, setStreak] = useState(() => JSON.parse(localStorage.getItem("streak")) || 0);
//   const [xp, setXp] = useState(() => JSON.parse(localStorage.getItem("xp")) || 0);
//   const [showReminder, setShowReminder] = useState(false);

//   useEffect(() => {
//     localStorage.setItem("progress", JSON.stringify(progress));
//     localStorage.setItem("streak", JSON.stringify(streak));
//     localStorage.setItem("xp", JSON.stringify(xp));
//   }, [progress, streak, xp]);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (progress < 100) {
//         setShowReminder(true);
//       }
//     }, 5000); // Show reminder after 5 seconds of inactivity
//     return () => clearTimeout(timer);
//   }, [progress]);

//   const completeDay = () => {
//     setProgress((prev) => Math.min(prev + 14.3, 100)); // 7-day challenge: ~14.3% per day
//     setStreak((prev) => prev + 1);
//     setXp((prev) => prev + 50);
//     setShowReminder(false);
//   };

//   return { progress, streak, xp, showReminder, completeDay };
// };

// const ProgressBar = ({ progress }) => (
//   <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
//     <motion.div 
//       className="bg-[#2563eb] h-4 rounded-full" 
//       style={{ width: `${progress}%` }} 
//       animate={{ width: `${progress}%` }}
//     />
//   </div>
// );

// const Reminder = ({ showReminder }) => {
//   return (
//     showReminder && (
//       <motion.div 
//         initial={{ opacity: 0, y: -10 }} 
//         animate={{ opacity: 1, y: 0 }} 
//         exit={{ opacity: 0, y: -10 }}
//         className="fixed top-4 right-4 bg-[#ff9800] text-white px-4 py-2 rounded-lg shadow-lg text-sm"
//       >
//         🔥 Don’t lose your streak! Complete your task for today.
//       </motion.div>
//     )
//   );
// };

// export { useProgress, ProgressBar, Reminder };
