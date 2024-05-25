import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page">
      <h2>Welcome to Gift Smart!</h2>
      <div className="buttons">
        <Link to="/login"><button className="button">Log In</button></Link>
        <Link to="/signup"><button className="button">Sign Up</button></Link>
      </div>
    </div>
  );
}

export default Home;
