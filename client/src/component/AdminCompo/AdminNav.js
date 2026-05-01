import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdDashboard } from 'react-icons/md';
import { IoPersonAddSharp, IoMenu, IoClose } from 'react-icons/io5';
import { CiTextAlignJustify } from 'react-icons/ci';
import { FaFileAlt, FaNetworkWired } from 'react-icons/fa';
import { FaMessage, FaVideo } from 'react-icons/fa6';
import { GiSkills } from 'react-icons/gi';
import Logout from './Logout';

const navItems = [
  { path: '/admindash', label: 'Dashboard', icon: MdDashboard },
  { path: '/adminportfolio', label: 'Portfolio', icon: IoPersonAddSharp },
  { path: '/admincv', label: 'CV Upload', icon: FaFileAlt },
  { path: '/adminprojects', label: 'Projects', icon: FaNetworkWired },
  { path: '/adminvlog', label: 'Vlogs', icon: FaVideo },
  { path: '/adminblog', label: 'Blogs', icon: CiTextAlignJustify },
  { path: '/adminskills', label: 'Skills', icon: GiSkills },
  { path: '/adminhire', label: 'Hire Messages', icon: FaMessage },
];

export default function AdminNav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const renderLink = ({ path, label, icon: Icon }) => {
    const active = location.pathname === path;

    return (
      <Link
        key={path}
        to={path}
        onClick={() => setIsOpen(false)}
        className={`admin-nav-link ${active ? 'admin-nav-link-active' : ''}`}
      >
        <Icon className="text-lg shrink-0" />
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <>
      <header className="admin-mobile-bar">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Admin</p>
          <h1 className="text-lg font-bold text-white">Portfolio Console</h1>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="admin-icon-button"
          aria-label="Toggle admin navigation"
        >
          {isOpen ? <IoClose /> : <IoMenu />}
        </button>
      </header>

      <aside className={`admin-sidebar ${isOpen ? 'admin-sidebar-open' : ''}`}>
        <div className="p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Admin</p>
          <h2 className="mt-1 text-xl font-bold text-white">Portfolio Console</h2>
        </div>
        <nav className="flex flex-col gap-1 px-3">
          {navItems.map(renderLink)}
        </nav>
        <div className="p-4 mt-auto">
          <Logout />
        </div>
      </aside>
    </>
  );
}
