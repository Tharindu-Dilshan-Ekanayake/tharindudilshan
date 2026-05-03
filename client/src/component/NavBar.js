import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getLinkClasses = (path) => {
    return location.pathname === path 
      ? "text-orange-500 border-b-[2px] border-orange-500" 
      : "text-black/70 hover:text-black";
  };

  const handleMenuClick = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='relative'>
      <nav className="flex items-center justify-start w-full p-4">
        <div className="block lg:hidden">
          <button 
            onClick={toggleMenu} 
            className="fixed left-4 top-4 z-50 rounded-full bg-white/90 p-2 text-gray-700 shadow-lg hover:text-gray-900 focus:outline-none"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          {isMenuOpen && (
            <div className="fixed inset-0 z-40 bg-white text-black">
              <div className="flex items-center justify-between border-b border-black/10 px-6 py-4">
                <span className="text-lg font-semibold">Menu</span>
                <button
                  onClick={toggleMenu}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-black"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-col gap-1 px-6 py-6 text-base">
                <button onClick={() => handleMenuClick('/')} className={getLinkClasses('/') + " w-full py-2 text-left"}>
                  Home
                </button>
                <button onClick={() => handleMenuClick('/portfolio')} className={getLinkClasses('/portfolio') + " w-full py-2 text-left"}>
                  Portfolio
                </button>
                <button onClick={() => handleMenuClick('/projects')} className={getLinkClasses('/projects') + " w-full py-2 text-left"}>
                  Projects
                </button>
                <button onClick={() => handleMenuClick('/vlogs')} className={getLinkClasses('/vlogs') + " w-full py-2 text-left"}>
                  Vlogs
                </button>
                <button onClick={() => handleMenuClick('/blogs')} className={getLinkClasses('/blogs') + " w-full py-2 text-left"}>
                  Blogs
                </button>
                <button onClick={() => handleMenuClick('/skills')} className={getLinkClasses('/skills') + " w-full py-2 text-left"}>
                  Skills
                </button>
              </div>
            </div>
          )}
        </div>
        <ul className="hidden lg:flex space-x-14">
          <li>
            <Link to="/" className={getLinkClasses('/')}>Home</Link>
          </li>
          <li>
            <Link to="/portfolio" className={getLinkClasses('/portfolio')}>Portfolio</Link>
          </li>
          <li>
            <Link to="/projects" className={getLinkClasses('/projects')}>Projects</Link>
          </li>
          <li>
            <Link to="/vlogs" className={getLinkClasses('/vlogs')}>Vlogs</Link>
          </li>
          <li>
            <Link to="/blogs" className={getLinkClasses('/blogs')}>Blogs</Link>
          </li>
          <li>
            <Link to="/skills" className={getLinkClasses('/skills')}>Skills</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
