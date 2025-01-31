import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import GratitudeJournal from "./pages/GratitudeJournal";
import PomodoroTimer from "./pages/PomodoroTimer";
import ReportView from "./pages/ReportView";
import Reading from "./pages/Reading";
import Meditation from "./pages/Meditation";
import ToDo from "./pages/ToDo";
import Community from "./pages/Community";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gratitude-journal" element={<GratitudeJournal />} />
        <Route path="/pomodoro-timer" element={<PomodoroTimer />} />
        <Route path="/progress" element={<ReportView />} />
        <Route path="/reading" element={<Reading />} />
        <Route path="/meditation" element={<Meditation />} />
        <Route path="/todo" element={<ToDo />} />
        <Route path="/community" element={<Community />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
