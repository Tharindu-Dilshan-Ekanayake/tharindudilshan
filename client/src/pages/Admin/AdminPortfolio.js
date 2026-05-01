import React from 'react';
import AdminLayout from '../../component/AdminCompo/AdminLayout';

export default function AdminPortfolio() {
  return (
    <AdminLayout title="Portfolio" subtitle="Portfolio editing tools can live here.">
      <div className="admin-card p-6">
        <p className="text-slate-500">Portfolio settings section is ready for your next update.</p>
      </div>
    </AdminLayout>
  );
}
