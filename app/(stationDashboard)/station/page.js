"use client"
import React, { useState, useEffect } from 'react';
function station() {
 

  // Initialize userData state from session storage or default value
  const [userData, setUserData] = useState(() => {
    const savedUserData = sessionStorage.getItem('userData');
    return savedUserData ? JSON.parse(savedUserData) : { nopVendorId: null };
  });

  // Function to update nopVendorId and save to session storage
  const updateNopVendorId = () => {
    const newUserData = { ...userData, nopVendorId: 5 };
    setUserData(newUserData);
    sessionStorage.setItem('userData', JSON.stringify(newUserData));
  };

  useEffect(() => {
    const savedUserData = sessionStorage.getItem('userData');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
  }, []);

  return (
    <div>
      <h1>User Data</h1>
      <p>nopVendorId: {userData.nopVendorId}</p>
      <button onClick={updateNopVendorId}>Set nopVendorId to 5</button>
    </div>
  );
}


export default station