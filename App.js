import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Home from './Home';
import Homepage from './Homepage';
import PersonForm from './PersonForm';
import Person from './person';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="header">
          <h1 className="big-text">Gift Smart</h1>
        </div>

        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/" element={<Home />} />
          <Route path="/person-form" element={<PersonForm />} />
          <Route path="/person/:id" element={<Person />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
