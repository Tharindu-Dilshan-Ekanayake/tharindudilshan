import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DOMPurify from 'dompurify';
import { motion, AnimatePresence } from 'framer-motion';
import 'tailwindcss/tailwind.css';
import { IoClose } from "react-icons/io5";
import { GoNorthStar } from "react-icons/go";
import BGBLOG from '../images/BGBLOG.jpg';

export default function BlogCompo() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getBlogs = async () => {
    try {
      const response = await axios.get('/blog/getblogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      toast.error('Failed to fetch blogs');
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const createMarkup = (content) => {
    const sanitizedContent = DOMPurify.sanitize(content);
    return { __html: sanitizedContent };
  };

  const handleViewBlog = (blog) => {
    setSelectedBlog(blog);
  };

  const handleClosePopup = () => {
    setSelectedBlog(null);
  };

  const handleEnlargeImage = (image) => {
    setEnlargedImage(image);
  };

  const handleCloseEnlargedImage = () => {
    setEnlargedImage(null);
  };

  const filteredBlogs = blogs.filter((blog) => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatLink = (link) => {
    const formattedLink = link.replace(/^https?:\/\/localhost:\d+\//, '');
    
    if (!formattedLink.startsWith('http://') && !formattedLink.startsWith('https://')) {
      return `https://${formattedLink}`;
    }
    return formattedLink;
  };

  return (
    <div className="container px-4 py-6 mx-auto">
      <div>
        <h1 className="mb-1 text-4xl font-extrabold text-center">Blogs</h1>
      </div>
      <div className="flex justify-center pt-1 pb-10">
        <input
          className="text-[#2b2b2b] border-[#2b2b2b] h-[40px] w-[800px] rounded-3xl pl-3 border-[2px]"
          type="text"
          placeholder="Search by title, category, or subject"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      
      <div className=''>
      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">Loading....</p>
      ) : filteredBlogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.reverse().map((blog) => (
            <motion.article
              key={blog._id}
              className="overflow-hidden border-orange-500 rounded-lg shadow-md bg-[#19191a31] border-[1.5px] transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              {blog.images && blog.images.length > 0 && (
                <img
                  src={blog.images[0]}
                  alt={blog.title}
                  className="object-cover w-full h-48 cursor-pointer"
                  onClick={() => handleEnlargeImage(blog.images[0])}
                />
              )}
              <div className="p-4">
                <h2 className="mb-1 text-xl font-bold text-orange-900">{blog.title}</h2>
                <p className="mb-2 text-sm text-gray-600"> {blog.category}</p>
                <p className="mb-2 text-[#19191A] border-b border-orange-400"><strong>{blog.subject}</strong> </p>
                <p className="mb-3 text-orange-800"> {new Date(blog.createdAt).toLocaleString()}</p>
                <motion.button
                  onClick={() => handleViewBlog(blog)}
                  className="px-4 py-2 text-white bg-orange-500 rounded hover:bg-orange-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Details
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>
      )}
      </div>
      

      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={handleClosePopup} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative p-6 mx-4 overflow-y-auto bg-white rounded-lg shadow-xl w-[1300px] max-h-[90vh] bg-cover bg-center"
              style={{ backgroundImage: `url(${BGBLOG})`, opacity:12 }}
            >
              <div className='flex justify-center'>
                <div className='flex px-12 mx-12 '>
                  <h2 className="mb-4 text-3xl font-bold text-[#19191A]"><strong>{selectedBlog.title}</strong></h2>
                </div>
              </div>
              
              <p className="flex mt-4 mb-4 text-xl text-orange-500"><GoNorthStar /> {selectedBlog.subject}</p>
              <div
                className="mb-4 prose text-justify text-[#19191a] lg:prose-xl max-w-none blog-content"
                dangerouslySetInnerHTML={createMarkup(selectedBlog.description)}
              />
              <div>
                <h3 className="text-lg font-bold"> Link</h3>
                <a 
                  href={formatLink(selectedBlog.link)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-orange-500 hover:underline"
                >
                  Read me
                </a>
              </div>
              <div className='flex items-center justify-center '>
                {selectedBlog.images && selectedBlog.images.length > 0 && (
                <div className="flex mb-4 space-x-2 overflow-y-auto">
                  {selectedBlog.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${selectedBlog.title} - ${index + 1}`}
                      className="object-cover w-32 h-32 cursor-pointer"
                      onClick={() => handleEnlargeImage(image)}
                    />
                  ))}
                </div>
                )}
              </div>
              
              <motion.button
                onClick={handleClosePopup}
                className="fixed z-50 p-2 text-white bg-red-500 rounded-full top-4 right-4 hover:bg-red-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoClose />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {enlargedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative"
            >
              <img
                src={enlargedImage}
                alt="Enlarged view"
                className="max-w-full max-h-[90vh] object-contain"
              />
              <div >
                <motion.button
                onClick={handleCloseEnlargedImage}
                className="fixed z-50 p-2 text-white bg-red-500 rounded-full top-4 right-4 hover:bg-red-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IoClose />
              </motion.button>
              </div>
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}