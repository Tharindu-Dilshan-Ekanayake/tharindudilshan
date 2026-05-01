import React from 'react';
import AdminLayout from '../../component/AdminCompo/AdminLayout';
import BlogsCompo from '../../component/AdminCompo/BlogsCompo';

export default function AdminBlog() {
  return (
    <AdminLayout title="Blogs" subtitle="Create, edit, and manage blog posts with Cloudinary image uploads.">
      <BlogsCompo />
    </AdminLayout>
  );
}
