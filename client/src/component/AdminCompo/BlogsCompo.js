import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';

export default function BlogsCompo() {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    subject: '',
    description: '',
    link: '',
    images: [],
  });
  const [editingId, setEditingId] = useState(null);
  const [viewingBlog, setViewingBlog] = useState(null);

  const categories = ['Technology', 'Lifestyle', 'Travel', 'Food'];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/blog/getblogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to fetch blogs');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      if (editingId) {
        await axios.put(`/blog/updateblog/${editingId}`, formData);
        toast.success('Blog updated successfully');
      } else {
        await axios.post('/blog/create', formData);
        toast.success('Blog created successfully');
      }
      setFormData({ category: '', title: '', subject: '', description: '', link: '', images: [] });
      setEditingId(null);
      fetchBlogs();
    } catch (error) {
      console.error('Error with blog:', error);
      toast.error('Error processing blog');
    }
  };

  const handleEdit = (blog) => {
    setFormData(blog);
    setEditingId(blog._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/blog/deleteblog/${id}`);
      toast.success('Blog deleted successfully');
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog');
    }
  };

  const handleDescriptionChange = (content) => {
    setFormData((prevData) => ({
      ...prevData,
      description: content,
    }));
  };

  const handleView = (blog) => {
    setViewingBlog(blog);
  };

  const closeViewPopup = () => {
    setViewingBlog(null);
  };

  const modules = {
    toolbar: [
      [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const createMarkup = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  return (
    <div className="max-w-4xl p-6 mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h1 className="mb-6 text-3xl font-bold text-center text-blue-600">Blog Management</h1>
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
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <ReactQuill
            id="description"
            value={formData.description}
            onChange={handleDescriptionChange}
            modules={modules}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            style={{ height: '200px' }}
          />
        </div>
        <div className='pt-12'>
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
        <button 
          type="submit" 
          className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {editingId ? 'Update Blog' : 'Create Blog'}
        </button>
      </form>

      <h2 className="mb-4 text-2xl font-bold text-center text-blue-600">Existing Blogs</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {blogs.map((blog) => (
          <div key={blog._id} className="overflow-hidden bg-white rounded-lg shadow">
            {blog.images.length > 0 && (
              <img src={blog.images[0]} alt={blog.title} className="object-cover w-full h-48" />
            )}
            <div className="p-4">
              <h3 className="mb-2 text-xl font-semibold truncate">{blog.title}</h3>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => handleView(blog)}
                  className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  View
                </button>
                <button
                  onClick={() => handleEdit(blog)}
                  className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {viewingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 mx-4 bg-white rounded-lg shadow-xl max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 className="mb-4 text-2xl font-bold">{viewingBlog.title}</h2>
            <p className="mb-2 text-gray-600">{viewingBlog.subject}</p>
            <p className="mb-2 text-sm text-gray-500">Category: {viewingBlog.category}</p>
            <div className="flex flex-wrap mb-4">
              {viewingBlog.images.map((image, index) => (
                <img key={index} src={image} alt={`blog-${index}`} className="object-cover w-32 h-32 m-1 rounded" />
              ))}
            </div>
            <div className="mb-4 prose max-w-none" dangerouslySetInnerHTML={createMarkup(viewingBlog.description)} />
            <a href={viewingBlog.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Read more
            </a>
            <button
              onClick={closeViewPopup}
              className="block w-full px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
