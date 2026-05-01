import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getLinkClasses = (path) => {
    return location.pathname === path 
      ? "hover:text-gray-400 border-b-[2px] border-orange-400 text-black" 
      : "hover:text-gray-400 text-gray-500";
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
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          {isMenuOpen && (
            <div className="absolute left-0 z-20 w-48 py-2 mt-2 ml-2 bg-white rounded-lg shadow-xl">
              <button onClick={() => handleMenuClick('/')} className={getLinkClasses('/') + " block w-full text-left px-4 py-2 hover:bg-gray-100"}>
                Home
              </button>
              <button onClick={() => handleMenuClick('/portfolio')} className={getLinkClasses('/portfolio') + " block w-full text-left px-4 py-2 hover:bg-gray-100"}>
                Portfolio
              </button>
              <button onClick={() => handleMenuClick('/projects')} className={getLinkClasses('/projects') + " block w-full text-left px-4 py-2 hover:bg-gray-100"}>
                Projects
              </button>
              <button onClick={() => handleMenuClick('/vlogs')} className={getLinkClasses('/vlogs') + " block w-full text-left px-4 py-2 hover:bg-gray-100"}>
                Vlogs
              </button>
              <button onClick={() => handleMenuClick('/blogs')} className={getLinkClasses('/blogs') + " block w-full text-left px-4 py-2 hover:bg-gray-100"}>
                Blogs
              </button>
              <button onClick={() => handleMenuClick('/skills')} className={getLinkClasses('/skills') + " block w-full text-left px-4 py-2 hover:bg-gray-100"}>
                Skills
              </button>
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
