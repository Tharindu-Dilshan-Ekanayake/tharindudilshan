// components/HireMeForm.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const HireMeForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name_user: '',
    email: '',
    mobile: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/hiring/hiremepost', formData);
      alert('Message created successfully');
      onClose();
    } catch (error) {
      alert('Failed to create message');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur"
    >
      <div className="p-8 bg-white border-2 border-orange-500 rounded-lg">
        <h2 className="mb-4 text-2xl">Hire Me</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name_user"
              value={formData.name_user}
              onChange={handleChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mobile</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded"
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="p-2 mr-4 border border-gray-500 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-2 text-white bg-orange-500 rounded hover:bg-orange-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default HireMeForm;
