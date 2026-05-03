import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BG from '../images/BG.jpg';
import BGMobile from '../images/ss.jpg'; // Add the new mobile background image
import { FaLinkedin, FaGithubSquare, FaInstagramSquare, FaFacebookSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import NavBar from './NavBar';
import { motion, useAnimationControls } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import DP from '../images/ME.png';

const TypewriterText = ({ text, delay = 0 }) => {
  const controls = useAnimationControls();

  React.useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      transition: { delay: i * 0.1 + delay },
    }));
  }, [controls, delay]);

  return (
    <span style={{ display: 'inline-block' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          custom={i}
          animate={controls}
          initial={{ opacity: 0 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

const HireMeForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name_user: '',
    email: '',
    mobile: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/hiring/hiremepost', formData);
      if (response.status === 201) {
        onClose();
      }
      toast.success('Sent Message Successfully');
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black/70">
      <div className="relative w-full max-w-md rounded-2xl border border-orange-500/40 bg-[#19191A]/90 p-6 shadow-2xl">
           <div className="mb-4 flex items-center justify-between">
             <h2 className="text-2xl font-semibold text-orange-500">Hire Me</h2>
           </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 ">
            <label className="block mb-2 text-white">Name</label>
            <input type="text" name="name_user" value={formData.name_user} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-white">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-white">Mobile</label>
            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-white">Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} className="w-full p-2 border rounded" rows="4" required></textarea>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button type="button" className="px-4 text-white rounded-lg h-11 bg-white/10 hover:bg-white/20" onClick={onClose}>
              Close
            </button>
            <button type="submit" className="px-5 font-semibold text-white bg-orange-500 rounded-lg h-11 hover:bg-orange-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Home() {
  const [showHireMeForm, setShowHireMeForm] = useState(false);

  const handleHireMeClick = () => {
    setShowHireMeForm(true);
  };

  const handleCloseForm = () => {
    setShowHireMeForm(false);
  };

  return (
    <div className="min-h-screen bg-right bg-cover no-repeat lg-h-screen sm:bg-gray-200 sm:pt-1" style={{ backgroundImage: `url(${BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
       <style jsx>{`
    @media (max-width: 768px) {
      .bg-mobile {
        background-image: url(${BGMobile});
        background-size: cover;
        background-position: center;
        height: 100vh;
        
      }
    }
  `}</style>
      <div className='flex flex-col items-center justify-center h-full px-4 bg-mobile sm:px-6'>
        <motion.div 
          className='absolute left-0 right-0 top-0 flex justify-center lg:justify-start lg:mt-12 lg:ml-[105px]'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <NavBar />
        </motion.div>
        <div className='flex flex-col items-center w-full text-center lg:flex-row lg:items-start'>
          <div className='pt-[96px] sm:pt-[120px] lg:pt-[200px] mr-0 lg:mr-[120px] text-center lg:ml-[150px]'>
            <div className='text-center pl-0 sm:pl-2 lg:pl-[20px]'>
              <motion.div 
                className='flex justify-center text-center lg:justify-start lg:text-left'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className='text-[56px] sm:text-[72px] md:text-[150px] leading-tight'>
                  <TypewriterText text="Hello..!" />
                </h1>
              </motion.div>
              <motion.div 
                className='text-center lg:text-left my-[-20px] sm:my-[-30px] lg:my-[-50px]'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <h1 className='text-[28px] sm:text-[34px] lg:text-[70px] lg:pt-3 pt-6 leading-tight'>
                  <TypewriterText text="I am Tharindu" delay={1.5} />
                </h1>
              </motion.div>
             
              <motion.div 
                className='mt-8 sm:mt-10 pb-10 text-center w-full sm:w-[480px]'
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 3 }}
              > 
              <div className="relative block sm:hidden mx-auto w-[170px]">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-full h-full border-orange-500 rounded-full spt-12 border-3"
                    style={{ 
                      clipPath: "polygon(0 0, 100% 0, 100% 100%, 75% 100%, 75% 25%, 0 25%)"
                    }}
                  />
                  <div className="relative flex justify-center">
                    <img src={DP} alt='hi' className="relative w-[160px]" />
                  </div>
                </div>
                <motion.p
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mb-6 text-[13px] sm:text-[13px] lg:text-xl text-gray-70 pt-8 px-4 sm:px-0 "
                >
                  Full-Stack Developer | UI/UX Designer | Mobile & Desktop App Developer | Graphic Designer & Video Editor | Youtuber
                </motion.p>
                
                <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
                  <Link
                    to="/projects"
                    className='inline-flex h-12 w-[200px] items-center justify-center rounded-lg border-2 border-orange-500 text-[18px] font-semibold text-orange-500 transition hover:bg-orange-500 hover:text-white'
                  >
                    View Projects
                  </Link>
                  <motion.button 
                    className='h-12 w-[200px] rounded-lg bg-orange-500 text-[18px] font-semibold text-white shadow-lg transition hover:bg-gray-700'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleHireMeClick}
                  >
                    Hire Me
                  </motion.button>
                </div>
              </motion.div>
            </div>
            <motion.div 
  className='w-full sm:w-[500px]  md:pl-9 sm:pl-12 hidden sm:block'
  initial={{ opacity: 0, scaleX: 0 }}
  animate={{ opacity: 1, scaleX: 1 }}
  transition={{ duration: 0.5, delay: 3.2 }}
>
  <hr className='h-[1px] bg-black border-0 bg-opacity-20 pl-12 md:shadow-sm'></hr>
</motion.div>

            <motion.div 
              className='flex w-full max-w-[280px] sm:max-w-[500px] justify-center sm:justify-between gap-4 sm:gap-0 px-4 sm:px-[120px] pt-6 sm:pt-12 mx-auto'
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 3.4 }}
            >
              {[
                { Icon: FaLinkedin, url: 'https://www.linkedin.com/in/tharindu-dilshan-ekanayake-462919195' },
                { Icon: FaGithubSquare, url: 'https://github.com/Tharindu-Dilshan-Ekanayake' },
                { Icon: FaYoutube, url: 'https://www.youtube.com/channel/UCZxX8vsED7Rv9SGbdv34RzA' },
                { Icon: FaInstagramSquare, url: 'https://www.instagram.com/tharindu_dilshan_ekanayake_/' },
                { Icon: FaFacebookSquare, url: 'https://web.facebook.com/tharindu.dilshan.3154' }
              ].map(({ Icon, url }, index) => (
                <motion.div key={index} whileHover={{ scale: 1.2 }}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <Icon className='size-[40px] opacity-55' />
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      {showHireMeForm && <HireMeForm onClose={handleCloseForm} />}
    </div>
  );
}
