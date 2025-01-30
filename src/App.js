import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Features from './components/Features'; // Cards Section
import Signup from './pages/Signup';
import Login from './pages/Login';
import GratitudeJournal from './pages/GratitudeJournal';
import PomodoroTimer from './pages/PomodoroTimer';
import ToDo from './pages/ToDo';
import Meditation from './pages/Meditation';
import Reading from './pages/Reading';

function App() {
  return (
    <Router>
      <Navbar />
      <HeroSection />
      <Switch>
        <Route path="/" exact>
          <Features /> {/* Cards Section after Hero */}
        </Route>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/gratitude-journal" component={GratitudeJournal} />
        <Route path="/pomodoro-timer" component={PomodoroTimer} />
        <Route path="/to-do" component={ToDo} />
        <Route path="/meditation" component={Meditation} />
        <Route path="/reading" component={Reading} />
        <Route path="*">
          <h1 className="text-center mt-10">404 - Page Not Found</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
