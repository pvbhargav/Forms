// src/components/Home.js
import React, { useEffect, useState } from 'react';

function Home() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    // fetch('/api/home') // This will be proxied to http://localhost:5000/api/home
    //   .then((response) => {
    //     return response.json(); // Parse the JSON from the backend response
    //   })
    //   .then((data) => setMessage(data.message))
    //   .catch((error) => {
    //     console.error('Error fetching data:', error);
    //     setMessage('Error fetching data from backend');
    //   });
    const fetchData=async()=>{
      try{
        const response=await fetch('/api/home');
        const data=await response.json();
        setMessage(data.message);
      }
      catch(err){
        console.log('Error fetching data:', err);
        setMessage('Error fetching data from backend');
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Home Page</h2>
      <p>{message}</p>
    </div>
  );
}

export default Home;
