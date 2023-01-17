import React, { useState, useEffect } from 'react';
import axios from 'axios';
import withAuth from './withAuth';

function Profile({ user }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get('http://localhost:4001/api/v1/auth/user');
        setUserData(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

if (!userData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Welcome, {userData.username}</h1>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default withAuth(Profile);
