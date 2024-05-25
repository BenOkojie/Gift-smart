import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(username, password)
      .then((userCredential) => {
        // Handle successful login
        console.log('Logged in successfully:', userCredential.user);
        navigate('/homepage'); // Redirect to the homepage after login
      })
      .catch((error) => {
        // Handle login errors
        console.error('Login error:', error.message);
      });
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form>
        <div className="input-field">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="input-field">
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="button" type="button" onClick={handleLogin}>Login</button>
      </form>
      <Link to="/"><button className="button">Back</button></Link>
    </div>
  );
}

export default LoginForm;
