import React from 'react';
import AdminLayout from '../../component/AdminCompo/AdminLayout';
import AdminDashCompo from '../../component/AdminCompo/AdminDashCompo';

export default function AdminDash() {
  return (
    <AdminLayout title="Dashboard" subtitle="Manage your portfolio content from one responsive console.">
      <AdminDashCompo />
    </AdminLayout>
  );
}
