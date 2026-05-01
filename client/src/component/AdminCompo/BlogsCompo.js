import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DOMPurify from 'dompurify';
import { IoClose } from 'react-icons/io5';

const emptyForm = {
  category: '',
  title: '',
  subject: '',
  description: '',
  link: '',
  images: [],
};

const categories = ['Technology', 'Lifestyle', 'Travel', 'Food'];

export default function BlogsCompo() {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [viewingBlog, setViewingBlog] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/blog/getblogs');
      setBlogs(response.data);
    } catch (error) {
      toast.error('Failed to fetch blogs');
    }
  };

  const openCreate = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setIsFormOpen(true);
  };

  const handleEdit = (blog) => {
    setFormData({
      ...blog,
      images: (blog.images || []).map(src => ({ src })),
    });
    setEditingId(blog._id);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prevState => ({
      ...prevState,
      images: [
        ...prevState.images,
        ...files.map(file => ({ file, src: URL.createObjectURL(file) })),
      ],
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData(prevState => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = new FormData();
      dataToSubmit.append('category', formData.category);
      dataToSubmit.append('title', formData.title);
      dataToSubmit.append('subject', formData.subject);
      dataToSubmit.append('description', formData.description);
      dataToSubmit.append('link', formData.link);
      dataToSubmit.append('existingImages', JSON.stringify(formData.images.filter(image => !image.file).map(image => image.src)));
      formData.images.forEach(image => {
        if (image.file) dataToSubmit.append('images', image.file);
      });

      if (editingId) {
        await axios.put(`/blog/updateblog/${editingId}`, dataToSubmit);
        toast.success('Blog updated successfully');
      } else {
        await axios.post('/blog/create', dataToSubmit);
        toast.success('Blog created successfully');
      }
      closeForm();
      fetchBlogs();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Error processing blog');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/blog/deleteblog/${id}`);
      toast.success('Blog deleted successfully');
      fetchBlogs();
    } catch (error) {
      toast.error('Failed to delete blog');
    }
  };

  const createMarkup = (html) => ({ __html: DOMPurify.sanitize(html) });

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-left">
          <h2 className="text-xl font-bold text-slate-900">Blog Posts</h2>
          <p className="text-sm text-slate-500">Manage blog records from a table view.</p>
        </div>
        <button onClick={openCreate} className="admin-primary-button sm:w-auto">Create New Blog</button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Category</th>
              <th>Subject</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td>
                  {blog.images?.[0] ? (
                    <img src={blog.images[0]} alt={blog.title} className="h-14 w-20 rounded-lg object-cover" />
                  ) : (
                    <div className="h-14 w-20 rounded-lg bg-slate-100" />
                  )}
                </td>
                <td className="font-semibold text-slate-900">{blog.title}</td>
                <td>{blog.category}</td>
                <td>{blog.subject}</td>
                <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => setViewingBlog(blog)} className="admin-action-button admin-action-view">View</button>
                    <button onClick={() => handleEdit(blog)} className="admin-action-button admin-action-edit">Edit</button>
                    <button onClick={() => handleDelete(blog._id)} className="admin-action-button admin-action-delete">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr><td colSpan="6" className="text-center text-slate-500">No blogs found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <h3 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Blog' : 'Create Blog'}</h3>
              <button onClick={closeForm} className="admin-icon-button bg-slate-100 text-slate-700"><IoClose /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 p-5 text-left">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="admin-label" htmlFor="category">Category</label>
                  <select id="category" name="category" value={formData.category} onChange={handleInputChange} required className="admin-input">
                    <option value="">Select a category</option>
                    {categories.map(category => <option key={category} value={category}>{category}</option>)}
                  </select>
                </div>
                <div>
                  <label className="admin-label" htmlFor="title">Title</label>
                  <input id="title" name="title" value={formData.title} onChange={handleInputChange} required className="admin-input" />
                </div>
              </div>
              <div>
                <label className="admin-label" htmlFor="subject">Subject</label>
                <input id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required className="admin-input" />
              </div>
              <div>
                <label className="admin-label">Description</label>
                <ReactQuill value={formData.description} onChange={(content) => setFormData(prev => ({ ...prev, description: content }))} modules={modules} />
              </div>
              <div>
                <label className="admin-label" htmlFor="link">Link</label>
                <input id="link" name="link" value={formData.link} onChange={handleInputChange} required className="admin-input" />
              </div>
              <div>
                <label className="admin-label" htmlFor="images">Images</label>
                <input id="images" type="file" accept="image/*" multiple onChange={handleImageUpload} className="admin-input" />
              </div>
              <div className="flex flex-wrap gap-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={image.src} alt={`preview-${index}`} className="h-20 w-20 rounded-lg object-cover" />
                    <button type="button" onClick={() => handleRemoveImage(index)} className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-red-500 text-xs text-white">X</button>
                  </div>
                ))}
              </div>
              <button type="submit" className="admin-primary-button">{editingId ? 'Update Blog' : 'Create Blog'}</button>
            </form>
          </div>
        </div>
      )}

      {viewingBlog && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal max-w-3xl p-5 text-left">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">{viewingBlog.title}</h3>
              <button onClick={() => setViewingBlog(null)} className="admin-icon-button bg-slate-100 text-slate-700"><IoClose /></button>
            </div>
            <p className="mt-2 text-slate-500">{viewingBlog.subject}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {viewingBlog.images?.map((image, index) => (
                <img key={index} src={image} alt={`blog-${index}`} className="h-24 w-24 rounded-lg object-cover" />
              ))}
            </div>
            <div className="prose mt-4 max-w-none" dangerouslySetInnerHTML={createMarkup(viewingBlog.description)} />
          </div>
        </div>
      )}
    </div>
  );
}
