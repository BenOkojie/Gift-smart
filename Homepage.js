import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import { useNavigate,Link } from 'react-router-dom';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

function Homepage() {
  const [username, setUsername] = useState('');
  const [people, setPeople] = useState([]);
  const navigate = useNavigate();

  const calculateDaysUntilBirthday = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

    if (today > nextBirthday) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
    return Math.round((nextBirthday - today) / oneDay);
  };

  useEffect(() => {
    const fetchUserDataAndPeople = () => {
      const user = firebase.auth().currentUser;
      if (user) {
        const db = firebase.firestore();

        // Fetch user data
        db.collection('users').doc(user.uid).get().then((doc) => {
          if (doc.exists) {
            setUsername(doc.data().username);
          } else {
            console.log("No user data found!");
          }
        }).catch((error) => {
          console.error("Error fetching user data:", error);
        });

        // Fetch people data
        db.collection('users').doc(user.uid).collection('people').get().then((querySnapshot) => {
          const peopleData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            daysUntilBirthday: calculateDaysUntilBirthday(doc.data().dateOfBirth)
          })).sort((a, b) => a.daysUntilBirthday - b.daysUntilBirthday);

          setPeople(peopleData);
        }).catch(error => {
          console.error('Error fetching people:', error);
        });
      }
    };

    fetchUserDataAndPeople();
  }, []);

  const handleAddPerson = () => {
    navigate('/person-form'); // Navigate to the PersonForm component
  };

  return (
    <div style={{ textAlign: 'left' }}>
      {username && <h1>Welcome, {username}!</h1>}
      <button onClick={handleAddPerson}>Add Person</button>
      <ul>
        {people.map(person => (
          <li key={person.id}>
          <Link to={`/person/${person.id}`}>
            {person.name} - {person.dateOfBirth} - {person.daysUntilBirthday} days until next birthday
          </Link>
        </li>
        ))}
      </ul>
    </div>
  );
}

export default Homepage;
