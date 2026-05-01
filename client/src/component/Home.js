import React, { useState } from 'react';
import BG from '../images/BG.jpg';
import BGMobile from '../images/BGGICON.jpg'; // Add the new mobile background image
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#19191A] p-8 rounded-lg shadow-lg w-[400px] border-orange-500 border-[1.5px] bg-opacity-75">
        <h2 className="mb-4 text-2xl text-orange-500">Hire Me</h2>
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
          <div className="flex justify-end">
            <button type="button" className="px-4 py-2 mr-4 bg-gray-300 rounded hover:bg-gray-600" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-white bg-orange-500 rounded hover:bg-gray-600">
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
      <div className='items-center h-screen bg-mobile sm:pt-2'>
        <motion.div 
          className='absolute flex md:mt-12 md:ml-[105px]'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <NavBar />
        </motion.div>
        <div className='flex text-center md:flex md:flex-row md:items-start'>
          <div className='md:ml-[150px] md:pt-[200px] mr-[120px] sm:ml-[1px] pt-[100px] text-center md:flex-row md:items-start'>
            <div className='md:pl-[20px] text-center pl-[65px]'>
              <motion.div 
                className='flex text-left '
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className='md:text-[150px] sm:text-[80px] text-[80px]'>
                  <TypewriterText text="Hello..!" />
                </h1>
              </motion.div>
              <motion.div 
                className='text-left my-[-50px]'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <h1 className='md:text-[70px] sm:text-[40px] text-[35px] md:pt-3 pt-8'>
                  <TypewriterText text="I am Tharindu" delay={1.5} />
                </h1>
              </motion.div>
             
              <motion.div 
                className='sm:pt-12 pb-12 mt-12 text-center w-full sm:w-[480px] pt-1'
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 3 }}
              > 
              <div className="relative block sm:hidden">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 w-full h-full border-orange-500 rounded-full spt-12 border-3"
                    style={{ 
                      clipPath: "polygon(0 0, 100% 0, 100% 100%, 75% 100%, 75% 25%, 0 25%)"
                    }}
                  />
                  <div className="relative flex justify-center ">
                    <img src={DP} alt='hi' className="relative w-[150px]" />
                  </div>
                </div>
                <motion.p
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mb-6 md:text-xl text-gray-70 sm:text-[10px] "
                >
                  Full-Stack Developer | UI/UX Designer | Mobile & Desktop App Developer | Graphic Designer & Video Editor | Youtuber
                </motion.p>
                
                <motion.button 
                  className='h-12 text-2xl bg-[#f78c0f] w-[200px] rounded-lg text-white hover:bg-gray-700'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleHireMeClick}
                >
                  Hire Me
                </motion.button>
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
              className='flex w-full sm:w-[500px] justify-between sm:px-[120px]  pt-12 pl-[60px] '
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
