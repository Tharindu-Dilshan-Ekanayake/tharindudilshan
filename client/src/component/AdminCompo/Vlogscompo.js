import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';

const emptyForm = {
  category: '',
  title: '',
  subject: '',
  description: '',
  link: '',
  cover_image: '',
  coverFile: null,
};

const categories = ['Technology', 'Lifestyle', 'Travel', 'Food'];

export default function Vlogscompo() {
  const [vlogs, setVlogs] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchVlogs();
  }, []);

  const fetchVlogs = async () => {
    try {
      const response = await axios.get('/vlog/vlogs');
      setVlogs(response.data);
    } catch (error) {
      toast.error('Failed to fetch vlogs');
    }
  };

  const openCreate = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleEdit = (vlog) => {
    setFormData({ ...vlog, coverFile: null });
    setEditingId(vlog._id);
    setIsFormOpen(true);
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData({ ...formData, cover_image: URL.createObjectURL(file), coverFile: file });
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
      dataToSubmit.append('existingCoverImage', formData.coverFile ? '' : formData.cover_image);
      if (formData.coverFile) dataToSubmit.append('cover_image', formData.coverFile);

      if (editingId) {
        await axios.put(`/vlog/vlogs/${editingId}`, dataToSubmit);
        toast.success('Vlog updated successfully');
      } else {
        await axios.post('/vlog/postvlog', dataToSubmit);
        toast.success('Vlog created successfully');
      }
      closeForm();
      fetchVlogs();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error processing vlog');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/vlog/vlogs/${id}`);
      toast.success('Vlog deleted successfully');
      fetchVlogs();
    } catch (error) {
      toast.error('Failed to delete vlog');
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-left">
          <h2 className="text-xl font-bold text-slate-900">Vlogs</h2>
          <p className="text-sm text-slate-500">Manage video posts and cover images.</p>
        </div>
        <button onClick={openCreate} className="admin-primary-button sm:w-auto">Create New Vlog</button>
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
            {vlogs.map(vlog => (
              <tr key={vlog._id}>
                <td>{vlog.cover_image ? <img src={vlog.cover_image} alt={vlog.title} className="h-14 w-20 rounded-lg object-cover" /> : <div className="h-14 w-20 rounded-lg bg-slate-100" />}</td>
                <td className="font-semibold text-slate-900">{vlog.title}</td>
                <td>{vlog.category}</td>
                <td>{vlog.subject}</td>
                <td>{new Date(vlog.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => handleEdit(vlog)} className="admin-action-button admin-action-edit">Edit</button>
                    <button onClick={() => handleDelete(vlog._id)} className="admin-action-button admin-action-delete">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {vlogs.length === 0 && <tr><td colSpan="6" className="text-center text-slate-500">No vlogs found.</td></tr>}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <h3 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Vlog' : 'Create Vlog'}</h3>
              <button onClick={closeForm} className="admin-icon-button bg-slate-100 text-slate-700"><IoClose /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 p-5 text-left">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="admin-label">Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} required className="admin-input">
                    <option value="">Select a category</option>
                    {categories.map(category => <option key={category} value={category}>{category}</option>)}
                  </select>
                </div>
                <div>
                  <label className="admin-label">Title</label>
                  <input name="title" value={formData.title} onChange={handleInputChange} required className="admin-input" />
                </div>
              </div>
              <div>
                <label className="admin-label">Subject</label>
                <input name="subject" value={formData.subject} onChange={handleInputChange} required className="admin-input" />
              </div>
              <div>
                <label className="admin-label">Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} className="admin-input min-h-[130px]" />
              </div>
              <div>
                <label className="admin-label">Vlog Link</label>
                <input name="link" value={formData.link} onChange={handleInputChange} required className="admin-input" />
              </div>
              <div>
                <label className="admin-label">Cover Image</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="admin-input" />
              </div>
              {formData.cover_image && <img src={formData.cover_image} alt="Cover preview" className="h-32 w-52 rounded-lg object-cover" />}
              <button type="submit" className="admin-primary-button">{editingId ? 'Update Vlog' : 'Create Vlog'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
