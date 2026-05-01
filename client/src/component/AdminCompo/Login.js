import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import BGG from '../../images/BGGICON.jpg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast.promise(
      axios.post('/login', {
        admin_email: email,
        password: password
      }, {
        withCredentials: true
      }),
      {
        loading: 'Logging in...',
        success: (response) => {
          setIsLoading(false);
          navigate('/admindash');
          return 'Login successful!';
        },
        error: (error) => {
          setIsLoading(false);
          console.error('Login error:', error);
          return error.response?.data?.error || 'An error occurred during login';
        }
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-center bg-cover" style={{ backgroundImage: `url(${BGG})` }}>
      <div className="w-full max-w-md overflow-hidden bg-white bg-opacity-75 rounded-lg shadow-xl">
        <div className="px-6 py-8">
          <h2 className="mb-8 text-2xl font-bold text-center text-gray-800">Wellcome</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <Link to="/" className="text-sm text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}