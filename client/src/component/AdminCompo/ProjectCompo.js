import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ProjectCompo() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    subject: '',
    description: '',
    links: [],
    images: [],
    start_date: '',
    ongoing: false,
    end_date: ''
  });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prevState => ({
        ...prevState,
        [name]: checked,
        end_date: checked ? null : prevState.end_date
      }));
    } else {
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const categories = ['Web Development', 'Mobile App','Desktop App', 'UI/UX Design', 'Graphic Design', '3D animation'];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/projects/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to fetch projects');
    }
  };

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...formData.links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFormData({ ...formData, links: newLinks });
  };

  const addLink = () => {
    setFormData({ ...formData, links: [...formData.links, { name: '', url: '' }] });
  };

  const removeLink = (index) => {
    const newLinks = formData.links.filter((_, i) => i !== index);
    setFormData({ ...formData, links: newLinks });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }))
    .then(results => {
      setFormData(prevState => ({
        ...prevState,
        images: [...prevState.images, ...results]
      }));
    })
    .catch(error => toast.error('Failed to process images'));
  };

  const handleRemoveImage = (index) => {
    setFormData(prevState => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        end_date: formData.ongoing ? null : formData.end_date
      };
      if (editingId) {
        await axios.put(`/projects/projects/${editingId}`, dataToSubmit);
        toast.success('Project updated successfully');
      } else {
        await axios.post('/projects/projects', dataToSubmit);
        toast.success('Project created successfully');
      }
      setFormData({
        category: '',
        title: '',
        subject: '',
        description: '',
        links: [],
        images: [],
        start_date: '',
        ongoing: false,
        end_date: ''
      });
      setEditingId(null);
      fetchProjects();
    } catch (error) {
      console.error('Error with project:', error);
      toast.error('Error processing project');
    }
  };

  const handleEdit = (project) => {
    setFormData({
      ...project,
      ongoing: project.end_date === null
    });
    setEditingId(project._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/projects/projects/${id}`);
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h1 className="mb-6 text-3xl font-bold text-center text-blue-600">Project Management</h1>
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
          <label className="block text-sm font-medium text-gray-700">Links:</label>
          {formData.links.map((link, index) => (
            <div key={index} className="flex mt-2 space-x-2">
              <input
                type="text"
                placeholder="Link Name"
                value={link.name}
                onChange={(e) => handleLinkChange(index, 'name', e.target.value)}
                className="flex-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <input
                type="text"
                placeholder="URL"
                value={link.url}
                onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                className="flex-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <button type="button" onClick={() => removeLink(index)} className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600">Remove</button>
            </div>
          ))}
          <button type="button" onClick={addLink} className="px-3 py-1 mt-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600">Add Link</button>
        </div>
        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images:</label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageUpload}
            accept="image/*"
            multiple
            className="block w-full mt-1 text-sm text-gray-500 border file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-blue-700 hover:file:bg-gray-100"
          />
        </div>
        <div className="flex flex-wrap mt-2">
          {formData.images.map((image, index) => (
            <div key={index} className="relative m-2">
              <img src={image} alt={`uploaded-${index}`} className="object-cover w-24 h-24 rounded" />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full hover:bg-red-600"
              >
                X
              </button>
            </div>
          ))}
        </div>
        <div>
          <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date:</label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            value={formData.start_date}
            onChange={handleInputChange}
            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="ongoing"
            name="ongoing"
            checked={formData.ongoing}
            onChange={handleInputChange}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label htmlFor="ongoing" className="ml-2 text-sm font-medium text-gray-700">Ongoing</label>
        </div>
        {!formData.ongoing && (
          <div>
            <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date:</label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={formData.end_date || ''}
              onChange={handleInputChange}
              className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        )}
        <button 
          type="submit" 
          className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {editingId ? 'Update Project' : 'Create Project'}
        </button>
      </form>

      <h2 className="mb-4 text-2xl font-bold text-center text-blue-600">Existing Projects</h2>
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project._id} className="p-4 bg-white rounded-lg shadow">
            <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
            <p className="mb-2 text-gray-600">{project.subject}</p>
            <p className="mb-2 text-sm text-gray-500">Category: {project.category}</p>
            <div className="mb-2">
              <p className="font-semibold">Links:</p>
              {project.links.map((link, index) => (
                <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="block text-blue-500 hover:underline">{link.name}</a>
              ))}
            </div>
            <div className="flex flex-wrap mb-2">
              {project.images.map((image, index) => (
                <img key={index} src={image} alt={`project-${index}`} className="object-cover w-20 h-20 m-1 rounded" />
              ))}
            </div>
            <p className="mb-1 text-sm text-gray-500">Start Date: {new Date(project.start_date).toLocaleDateString()}</p>
            <p className="mb-2 text-sm text-gray-500">
              {project.end_date 
                ? `End Date: ${new Date(project.end_date).toLocaleDateString()}`
                : 'Ongoing'}
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(project)}
                className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project._id)}
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