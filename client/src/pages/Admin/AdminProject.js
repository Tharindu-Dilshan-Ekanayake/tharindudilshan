import React from 'react';
import AdminLayout from '../../component/AdminCompo/AdminLayout';
import ProjectCompo from '../../component/AdminCompo/ProjectCompo';

export default function AdminProject() {
  return (
    <AdminLayout title="Projects" subtitle="Publish projects with Cloudinary-hosted screenshots and media.">
      <ProjectCompo />
    </AdminLayout>
  );
}
