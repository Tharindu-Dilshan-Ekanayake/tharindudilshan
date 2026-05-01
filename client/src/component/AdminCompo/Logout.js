import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/logout', {}, { withCredentials: true });
      // Clear any local storage items if you're using them
      // localStorage.removeItem('user');
      navigate('/adminlogin'); // Redirect to home page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button onClick={handleLogout} className='h-12 bg-orange-400 w-[150px]'> 
      Logout
    </button>
  );
};

export default Logout;