import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';

const emptyForm = {
  category: '',
  title: '',
  subject: '',
  description: '',
  links: [],
  images: [],
  start_date: '',
  ongoing: false,
  end_date: '',
};

const categories = ['Web Development', 'Mobile App', 'Desktop App', 'UI/UX Design', 'Graphic Design', '3D animation'];

export default function ProjectCompo() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/projects/projects');
      setProjects(response.data);
    } catch (error) {
      toast.error('Failed to fetch projects');
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

  const handleEdit = (project) => {
    setFormData({
      ...project,
      images: (project.images || []).map(src => ({ src })),
      start_date: project.start_date ? project.start_date.slice(0, 10) : '',
      end_date: project.end_date ? project.end_date.slice(0, 10) : '',
      ongoing: project.end_date === null || project.ongoing,
    });
    setEditingId(project._id);
    setIsFormOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      end_date: name === 'ongoing' && checked ? '' : prev.end_date,
    }));
  };

  const handleLinkChange = (index, field, value) => {
    const nextLinks = [...formData.links];
    nextLinks[index] = { ...nextLinks[index], [field]: value };
    setFormData({ ...formData, links: nextLinks });
  };

  const addLink = () => setFormData({ ...formData, links: [...formData.links, { name: '', url: '' }] });
  const removeLink = (index) => setFormData({ ...formData, links: formData.links.filter((_, i) => i !== index) });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files.map(file => ({ file, src: URL.createObjectURL(file) }))],
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = new FormData();
      dataToSubmit.append('category', formData.category);
      dataToSubmit.append('title', formData.title);
      dataToSubmit.append('subject', formData.subject);
      dataToSubmit.append('description', formData.description);
      dataToSubmit.append('links', JSON.stringify(formData.links));
      dataToSubmit.append('start_date', formData.start_date || '');
      dataToSubmit.append('ongoing', formData.ongoing);
      dataToSubmit.append('end_date', formData.ongoing ? '' : formData.end_date || '');
      dataToSubmit.append('existingImages', JSON.stringify(formData.images.filter(image => !image.file).map(image => image.src)));
      formData.images.forEach(image => {
        if (image.file) dataToSubmit.append('images', image.file);
      });

      if (editingId) {
        await axios.put(`/projects/projects/${editingId}`, dataToSubmit);
        toast.success('Project updated successfully');
      } else {
        await axios.post('/projects/projects', dataToSubmit);
        toast.success('Project created successfully');
      }
      closeForm();
      fetchProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error processing project');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/projects/projects/${id}`);
      toast.success('Project deleted successfully');
      fetchProjects();
    } catch (error) {
      toast.error('Failed to delete project');
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-left">
          <h2 className="text-xl font-bold text-slate-900">Projects</h2>
          <p className="text-sm text-slate-500">Create and maintain portfolio projects.</p>
        </div>
        <button onClick={openCreate} className="admin-primary-button sm:w-auto">Create New Project</button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Start</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project._id}>
                <td>
                  {project.images?.[0] ? <img src={project.images[0]} alt={project.title} className="h-14 w-20 rounded-lg object-cover" /> : <div className="h-14 w-20 rounded-lg bg-slate-100" />}
                </td>
                <td>
                  <p className="font-semibold text-slate-900">{project.title}</p>
                  <p className="text-sm text-slate-500">{project.subject}</p>
                </td>
                <td>{project.category}</td>
                <td>{project.ongoing || !project.end_date ? 'Ongoing' : 'Completed'}</td>
                <td>{project.start_date ? new Date(project.start_date).toLocaleDateString() : '-'}</td>
                <td>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => handleEdit(project)} className="admin-action-button admin-action-edit">Edit</button>
                    <button onClick={() => handleDelete(project._id)} className="admin-action-button admin-action-delete">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && <tr><td colSpan="6" className="text-center text-slate-500">No projects found.</td></tr>}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <h3 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Project' : 'Create Project'}</h3>
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
                <textarea name="description" value={formData.description} onChange={handleInputChange} required className="admin-input min-h-[130px]" />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="admin-label mb-0">Links</label>
                  <button type="button" onClick={addLink} className="admin-action-button admin-action-view">Add Link</button>
                </div>
                <div className="space-y-2">
                  {formData.links.map((link, index) => (
                    <div key={index} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                      <input placeholder="Name" value={link.name} onChange={(e) => handleLinkChange(index, 'name', e.target.value)} className="admin-input" />
                      <input placeholder="URL" value={link.url} onChange={(e) => handleLinkChange(index, 'url', e.target.value)} className="admin-input" />
                      <button type="button" onClick={() => removeLink(index)} className="admin-action-button admin-action-delete">Remove</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="admin-label">Start Date</label>
                  <input type="date" name="start_date" value={formData.start_date} onChange={handleInputChange} className="admin-input" />
                </div>
                <div className="flex items-center gap-2 pt-7">
                  <input type="checkbox" name="ongoing" checked={formData.ongoing} onChange={handleInputChange} />
                  <label className="font-semibold text-slate-700">Ongoing</label>
                </div>
                {!formData.ongoing && (
                  <div>
                    <label className="admin-label">End Date</label>
                    <input type="date" name="end_date" value={formData.end_date || ''} onChange={handleInputChange} className="admin-input" />
                  </div>
                )}
              </div>
              <div>
                <label className="admin-label">Images</label>
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="admin-input" />
              </div>
              <div className="flex flex-wrap gap-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={image.src} alt={`preview-${index}`} className="h-20 w-20 rounded-lg object-cover" />
                    <button type="button" onClick={() => handleRemoveImage(index)} className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-red-500 text-xs text-white">X</button>
                  </div>
                ))}
              </div>
              <button type="submit" className="admin-primary-button">{editingId ? 'Update Project' : 'Create Project'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
