import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaCloudUploadAlt, FaDownload, FaFileAlt } from 'react-icons/fa';

const formatBytes = (bytes = 0) => {
  if (!bytes) return '0 KB';
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, index)).toFixed(index === 0 ? 0 : 1)} ${sizes[index]}`;
};

const downloadCVToDevice = async (fileName = 'cv.pdf') => {
  const response = await axios.get('/cv/download', { responseType: 'blob' });
  const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(blobUrl);
};

export default function CVCompo() {
  const [cv, setCv] = useState(null);
  const [title, setTitle] = useState('Tharindu Dilshan CV');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCV = async () => {
    try {
      const response = await axios.get('/cv/latest');
      setCv(response.data);
      setTitle(response.data.title || 'Tharindu Dilshan CV');
    } catch (error) {
      if (error.response?.status !== 404) {
        toast.error('Failed to fetch current CV');
      }
    }
  };

  useEffect(() => {
    fetchCV();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please choose a CV file');
      return;
    }

    const payload = new FormData();
    payload.append('title', title);
    payload.append('cv', file);

    setIsLoading(true);
    try {
      const response = await axios.patch('/cv', payload);
      setCv(response.data.cv);
      setFile(null);
      toast.success('CV uploaded successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload CV');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <form onSubmit={handleSubmit} className="admin-card p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="admin-card-icon">
            <FaCloudUploadAlt />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Upload New CV</h2>
            <p className="text-sm text-slate-500">Only one PDF CV is kept active in Cloudinary.</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="cv-title" className="admin-label">CV title</label>
            <input
              id="cv-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="admin-input"
              required
            />
          </div>

          <div>
            <label htmlFor="cv-file" className="admin-label">CV file</label>
            <label className="flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-orange-400 hover:bg-orange-50">
              <FaFileAlt className="mb-3 text-4xl text-orange-500" />
              <span className="font-semibold text-slate-800">
                {file ? file.name : 'Choose CV file'}
              </span>
              <span className="mt-1 text-sm text-slate-500">PDF only, up to 5MB</span>
              <input
                id="cv-file"
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="sr-only"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="admin-primary-button"
          >
            {isLoading ? 'Uploading...' : 'Upload CV'}
          </button>
        </div>
      </form>

      <section className="admin-card p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="admin-card-icon">
            <FaDownload />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Current CV</h2>
            <p className="text-sm text-slate-500">This is what visitors download from your portfolio.</p>
          </div>
        </div>

        {cv ? (
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">Active file</p>
            <h3 className="mt-2 text-lg font-bold text-slate-900">{cv.title}</h3>
            <p className="mt-1 break-all text-sm text-slate-500">{cv.original_name}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-white p-3">
                <p className="text-slate-400">Size</p>
                <p className="font-semibold text-slate-800">{formatBytes(cv.file_size)}</p>
              </div>
              <div className="rounded-lg bg-white p-3">
                <p className="text-slate-400">Type</p>
                <p className="font-semibold text-slate-800">{cv.file_type}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => downloadCVToDevice(cv.original_name)}
              className="admin-secondary-button mt-5"
            >
              Test Download
            </button>
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
            <FaFileAlt className="mx-auto mb-3 text-4xl text-slate-300" />
            <p className="font-semibold text-slate-800">No CV uploaded yet</p>
            <p className="mt-1 text-sm text-slate-500">Upload one to enable the public download button.</p>
          </div>
        )}
      </section>
    </div>
  );
}
