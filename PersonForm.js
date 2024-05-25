// In PersonForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

function PersonForm() {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [interests, setInterests] = useState(['']);
  const navigate = useNavigate();

  const handleAddInterest = () => {
    setInterests([...interests, '']); // Add new interest input
  };

  const handleInterestChange = (index, value) => {
    const updatedInterests = interests.map((interest, i) => {
      if (i === index) {
        return value;
      }
      return interest;
    });
    setInterests(updatedInterests);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = firebase.auth().currentUser;

    if (user) {
      const db = firebase.firestore();
      db.collection('users').doc(user.uid).collection('people').add({
        name,
        dateOfBirth,
        interests: interests.filter(interest => interest.trim() !== '') // Filter out empty interests
      })
      .then(() => {
        navigate('/homepage'); // Navigate back to the homepage
      })
      .catch(error => {
        console.error('Error adding person:', error);
      });
    }
  };

  return (
    <div className="form-container">
      <h2>Add Person</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="input-field">
          <input type="date" placeholder="Date of Birth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
        </div>
        {interests.map((interest, index) => (
          <div className="input-field" key={index}>
            <input type="text" placeholder="Interest" value={interest} onChange={(e) => handleInterestChange(index, e.target.value)} />
          </div>
        ))}
        <button type="button" onClick={handleAddInterest}>Add Interest</button>
        <button type="submit" className="button">Submit</button>
      </form>
    </div>
  );
}

export default PersonForm;
