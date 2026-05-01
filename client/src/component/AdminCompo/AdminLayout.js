import React from 'react';
import AdminNav from './AdminNav';

export default function AdminLayout({ title, subtitle, children }) {
  return (
    <div className="admin-shell">
      <AdminNav />
      <main className="admin-main">
        {(title || subtitle) && (
          <div className="mb-6">
            {title && <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h1>}
            {subtitle && <p className="mt-2 text-sm text-slate-500 sm:text-base">{subtitle}</p>}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
