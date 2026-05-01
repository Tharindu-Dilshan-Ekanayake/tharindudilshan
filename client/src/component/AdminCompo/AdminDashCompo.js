import React from 'react'
import { Link } from 'react-router-dom'
import { FaFileAlt, FaNetworkWired } from 'react-icons/fa'
import { FaVideo } from 'react-icons/fa6'
import { CiTextAlignJustify } from 'react-icons/ci'

export default function AdminDashCompo() {
  const cards = [
    { title: 'Upload CV', text: 'Keep the public download button updated.', path: '/admincv', icon: FaFileAlt },
    { title: 'Projects', text: 'Manage project screenshots and details.', path: '/adminprojects', icon: FaNetworkWired },
    { title: 'Blogs', text: 'Publish articles with Cloudinary images.', path: '/adminblog', icon: CiTextAlignJustify },
    { title: 'Vlogs', text: 'Update vlog entries and cover media.', path: '/adminvlog', icon: FaVideo },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ title, text, path, icon: Icon }) => (
        <Link key={path} to={path} className="admin-card block p-5 text-left transition hover:-translate-y-1 hover:shadow-xl">
          <div className="admin-card-icon">
            <Icon />
          </div>
          <h2 className="mt-4 text-lg font-bold text-slate-900">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
        </Link>
      ))}
    </div>
  )
}
