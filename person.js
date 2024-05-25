import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate,Link } from 'react-router-dom';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import axios from 'axios';

function Person() {
  const { id } = useParams(); // Get the person ID from URL
  const [person, setPerson] = useState(null);
  const [newInterest, setNewInterest] = useState('');
  const [giftIdeas, setGiftIdeas] = useState({});
  const navigate = useNavigate(); 

  useEffect(() => {
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;

    if (user) {
      db.collection('users').doc(user.uid).collection('people').doc(id).get().then(doc => {
        if (doc.exists) {
          const personData = { id: doc.id, ...doc.data() };
          setPerson(personData);
          fetchGiftIdeasForInterests(personData.interests);
        } else {
          console.log('No such person!');
        }
      }).catch(error => {
        console.error('Error fetching person:', error);
      });
    }
  }, [id]);

  const fetchGiftIdeasForInterests = async (interests) => {
    const allGiftIdeas = {};
    for (const interest of interests) {
      const query = `birthday gifts for people with ${interest}`;
      try {
        const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
          params: {
            key: 'AIzaSyBEiT358ShKIc5FVTTjUZx4oJCNPP2Fnl4',
            cx: '37649113acbc6424d',
            q: query,
            searchType: 'image'
          }
        });
        allGiftIdeas[interest] = response.data.items.map(item => ({
          title: item.title,
          imageLink: item.link,
          webpage: item.image.contextLink
        }));
      } catch (error) {
        console.error('Failed to fetch gift ideas for', interest, error);
        allGiftIdeas[interest] = [{ title: 'Error fetching data', imageLink: '', webpage: '#' }];
      }
    }
    setGiftIdeas(allGiftIdeas);
  };

  const handleAddInterest = () => {
    if (newInterest.trim() === '') return;

    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    const updatedInterests = [...(person.interests || []), newInterest];

    if (user) {
      db.collection('users').doc(user.uid).collection('people').doc(id).update({
        interests: updatedInterests
      }).then(() => {
        setPerson({ ...person, interests: updatedInterests });
        setNewInterest('');
        fetchGiftIdeasForInterests(updatedInterests);
      }).catch(error => {
        console.error('Error adding interest:', error);
      });
    }
  };

  return (
    <div>
       <button onClick={() => navigate('/homepage')} style={{ margin: '10px' }}>Back to Gift Smart</button>
      {person && (
        <>
          <h2>{person.name}</h2>
          <p>Birthday: {person.dateOfBirth}</p>
          <p>Interests:</p>
          {person.interests && person.interests.map((interest, index) => (
            <div key={index}>
              <strong>{interest}</strong>
              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' , justifyContent: 'center', gap: '20px' }}>
                {giftIdeas[interest] && giftIdeas[interest].map((idea, idx) => (
                  <a key={idx} href={idea.webpage} target="_blank" rel="noopener noreferrer" style={{ margin: '10px', textAlign: 'center' }}>
                    <img src={idea.imageLink} alt={idea.title} style={{ width: '100px', height: '100px' }} />
                    <p>{idea.title}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
          <input
            type="text"
            placeholder="Add new interest"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
          />
          <button onClick={handleAddInterest}>Add Interest</button>
        </>
      )}
    </div>
  );
}

export default Person;
