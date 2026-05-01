import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Vlogscompo() {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    subject: '',
    description: '',
    link: '',
    cover_image: ''
  });
  const [vlogs, setVlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const categories = ['Technology', 'Lifestyle', 'Travel', 'Food'];

  useEffect(() => {
    fetchVlogs();
  }, []);

  const fetchVlogs = async () => {
    try {
      const response = await axios.get('/vlog/vlogs');
      setVlogs(response.data);
    } catch (error) {
      console.error('Error fetching vlogs:', error);
      toast.error('Failed to fetch vlogs');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, cover_image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/vlog/vlogs/${editingId}`, formData);
        toast.success("Vlog updated successfully");
        setEditingId(null);
      } else {
        await axios.post('/vlog/postvlog', formData);
        toast.success("Vlog created successfully");
      }
      setFormData({
        category: '',
        title: '',
        subject: '',
        description: '',
        link: '',
        cover_image: ''
      });
      fetchVlogs();
    } catch (error) {
      console.error('Error with vlog:', error);
      toast.error('Error processing vlog');
    }
  };

  const handleEdit = (vlog) => {
    setFormData(vlog);
    setEditingId(vlog._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/vlog/vlogs/${id}`);
      toast.success("Vlog deleted successfully");
      fetchVlogs();
    } catch (error) {
      console.error('Error deleting vlog:', error);
      toast.error('Failed to delete vlog');
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h1 className="mb-6 text-3xl font-bold text-center text-blue-600">Vlog Management</h1>
      <form onSubmit={handleSubmit} className="p-6 mb-8 space-y-4 bg-white rounded-lg shadow-md">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="block w-full h-32 mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link:</label>
          <input
            type="text"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            required
            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label htmlFor="cover_image" className="block text-sm font-medium text-gray-700">Cover Image:</label>
          <input
            type="file"
            id="cover_image"
            name="cover_image"
            onChange={handleImageUpload}
            accept="image/*"
            className="block w-full mt-1 text-sm text-gray-500 border file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-blue-700 hover:file:bg-gray-100"
          />
        </div>
        {formData.cover_image && (
          <img src={formData.cover_image} alt="Cover" className="max-w-xs mt-4 rounded shadow-md" />
        )}
        <button 
          type="submit" 
          className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {editingId ? 'Update Vlog' : 'Post Vlog'}
        </button>
      </form>

      <h2 className="mb-4 text-2xl font-bold text-center text-blue-600">Existing Vlogs</h2>
      <div className="space-y-4">
        {vlogs.map((vlog) => (
          <div key={vlog._id} className="p-4 bg-white rounded-lg shadow">
            <h3 className="mb-2 text-xl font-semibold">{vlog.title}</h3>
            <p className="mb-2 text-gray-600">{vlog.description}</p>
            <p className="mb-2 text-sm text-gray-500">Category: {vlog.category}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(vlog)}
                className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(vlog._id)}
                className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
