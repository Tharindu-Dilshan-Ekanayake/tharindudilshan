import React from 'react';
import AdminLayout from '../../component/AdminCompo/AdminLayout';
import AdminHirecompo from '../../component/AdminCompo/AdminHirecompo';

export default function AdminHireMessages() {
  return (
    <AdminLayout title="Hire Messages" subtitle="Review incoming contact messages.">
      <AdminHirecompo />
    </AdminLayout>
  );
}
