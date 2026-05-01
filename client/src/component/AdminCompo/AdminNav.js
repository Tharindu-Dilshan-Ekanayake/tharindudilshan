import React, {  useState, useEffect } from 'react';
import { Link, useLocation,  } from 'react-router-dom';

import { MdDashboard } from 'react-icons/md';
import { IoPersonAddSharp } from 'react-icons/io5';




import { CiTextAlignJustify } from "react-icons/ci";
import { FaVideo } from "react-icons/fa6";
import { GiSkills } from "react-icons/gi";
import { FaNetworkWired } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import Logout from './Logout';

export default function AdminNav() {
    const [activeItem, setActiveItem] = useState(null);
    
    
    
    const location = useLocation();

    useEffect(() => {
        // Update active item based on current route
        switch (location.pathname) {
            case '/admindash':
                setActiveItem(1);
                break;
            case '/adminportfolio':
                setActiveItem(2);
                break;
            case '/adminvlog':
                setActiveItem(3);
                break;
           
            case '/adminblog':
                setActiveItem(4);
                break;
            case '/adminprojects':
                setActiveItem(5);
                break;
            case '/adminhire':
                setActiveItem(6);
                break;
            case '/adminskills':
                setActiveItem(7);
                break;
            default:
                setActiveItem(null);
        }
    }, [location.pathname]);

    
   
    return (
        <div className='h-screen bg-[#2B2B2B] lg:w-[320px] sm:w-fit md:w-72 w-fit'>
            <div className='pt-12'>
                <div className='flex items-center justify-center'>
                    
                </div>

                
            </div>

            <div className='justify-center'>
                <nav>
                    <ul className='text-left'>
                        <Link to='/admindash' >
                            <li>
                                <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 dark:hover:text-neutral-300 ${activeItem === 1 ? 'bg-[#BABABA] bg-opacity-20 text-white' : 'text-gray-100 hover:bg-gray-300 hover:text-white'}`}>
                                    <div className='mr-8'>
                                        <MdDashboard size={20} className="opacity-25 sm:w-6 sm:h-6 hover:text-white hover:opacity-70" />
                                    </div>
                                    <div>
                                        <label className='text-white opacity-25 hover:text-white hover:opacity-70' style={{ fontSize: '18px' }}>Dashboard</label>
                                    </div>
                                </div>
                            </li>
                        </Link>
                        
                        <Link to='/adminportfolio' className='no-underline'>
                            <li>
                                <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 ${activeItem === 2 ? 'bg-[#BABABA] bg-opacity-20 text-white' : 'text-gray-100 hover:bg-gray-300 hover:text-white'}`}>
                                    <div className='mr-8'><IoPersonAddSharp size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
                                    <div><label className='text-white opacity-25' style={{ fontSize: '18px' }}>Update Portfolio</label></div>
                                </div>
                            </li>
                        </Link>
                     
                        <Link to='/adminprojects' className='no-underline'>
                            <li>
                                <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 ${activeItem === 5 ? 'bg-[#BABABA] bg-opacity-20 text-white' : 'text-gray-100 hover:bg-gray-300 hover:text-white'}`}>
                                    <div className='mr-8'><FaNetworkWired size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
                                    <div><label className='text-white opacity-25' style={{ fontSize: '18px' }}>Projects Section</label></div>
                                </div>
                            </li>
                        </Link>
                        
                        <Link to='/adminvlog' className='no-underline'>
                            <li>
                                <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 ${activeItem === 3 ?'bg-[#BABABA] bg-opacity-20 text-white' : 'text-gray-100 hover:bg-gray-300 hover:text-white'}`}>
                                    <div className='mr-8'><FaVideo size={20} className="opacity-25 sm:w-6 sm:h-6 hover:text-white" /></div>
                                    <div><label className='text-white opacity-25 hover:text-white' style={{ fontSize: '18px' }}>Vlogs Section</label></div>
                                </div>
                            </li>
                        </Link>
                        <Link to='/adminblog' className='no-underline'>
                            <li>
                                <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 ${activeItem === 4 ? 'bg-[#BABABA] bg-opacity-20 text-white' : 'text-gray-100 hover:bg-gray-300 hover:text-white'}`}>
                                    <div className='mr-8'><CiTextAlignJustify size={20} className="opacity-25 sm:w-6 sm:h-6 hover:text-white" /></div>
                                    <div><label className='text-white opacity-25 hover:text-white' style={{ fontSize: '18px' }}>Blogs Section</label></div>
                                </div>
                            </li>
                        </Link>
                        <Link to='/adminskills' className='no-underline'>
                            <li>
                                <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 ${activeItem === 7 ? 'bg-[#BABABA] bg-opacity-20 text-white' : 'text-gray-100 hover:bg-gray-300 hover:text-white'}`}>
                                    <div className='mr-8'><GiSkills size={20} className="opacity-25 sm:w-6 sm:h-6 hover:text-white" /></div>
                                    <div><label className='text-white opacity-25 hover:text-white' style={{ fontSize: '18px' }}>Skills Section</label></div>
                                </div>
                            </li>
                        </Link>
                        <Link to='/adminhire' className='no-underline'>
                            <li>
                                <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 ${activeItem === 6 ? 'bg-[#BABABA] bg-opacity-20 text-white' : 'text-gray-100 hover:bg-gray-300 hover:text-white'}`}>
                                    <div className='mr-8'><FaMessage size={20} className="opacity-25 sm:w-6 sm:h-6 hover:text-white" /></div>
                                    <div><label className='text-white opacity-25 hover:text-white' style={{ fontSize: '18px' }}>Hire Messages</label></div>
                                </div>
                            </li>
                        </Link>
                    </ul>
                    <div className='flex items-center justify-center'>
                        <div className='pt-10 fix w-fit'>
                            
                                
                            
                            
                        </div>
                    </div>
                </nav>
            </div>
            <Logout/>
        </div>
    );
}
