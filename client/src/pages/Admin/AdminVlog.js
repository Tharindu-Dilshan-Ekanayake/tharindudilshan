import React from 'react';
import AdminLayout from '../../component/AdminCompo/AdminLayout';
import Vlogscompo from '../../component/AdminCompo/Vlogscompo';

export default function AdminVlog() {
  return (
    <AdminLayout title="Vlogs" subtitle="Manage vlog entries and cover images.">
      <Vlogscompo />
    </AdminLayout>
  );
}
