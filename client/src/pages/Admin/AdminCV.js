import React from 'react';
import AdminLayout from '../../component/AdminCompo/AdminLayout';
import CVCompo from '../../component/AdminCompo/CVCompo';

export default function AdminCV() {
  return (
    <AdminLayout
      title="CV Manager"
      subtitle="Upload the latest CV to Cloudinary and keep the public download button current."
    >
      <CVCompo />
    </AdminLayout>
  );
}
