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
    <button onClick={handleLogout} className='w-full h-11 rounded-lg bg-orange-500 px-4 font-semibold text-white transition hover:bg-orange-600'> 
      Logout
    </button>
  );
};

export default Logout;
