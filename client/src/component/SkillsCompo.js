import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DP from '../images/ME.png';

const skillCategories = [
  {
    title: "Software Development",
    skills: ["C", "Java", "Python", "JavaScript", "MERN Stack", "Electron.js"]
  },
  {
    title: "Web & Mobile Development",
    skills: ["React.js", "HTML", "CSS", "Node.js", "Express.js", "React Native"]
  },
  {
    title: "Database Management",
    skills: ["MongoDB", "MySQL"]
  },
  {
    title: "Desktop Development",
    skills: ["Electron.js"]
  },
  {
    title: "Creative & Design",
    skills: ["Adobe Photoshop", "Adobe Illustrator", "Blender"]
  },
  {
    title: "Video Production",
    skills: ["Adobe After Effects", "Adobe Premiere Pro", "DaVinci Resolve"]
  },
  {
    title: "Audio Production",
    skills: ["FL Studio", "Cubase"]
  },
  {
    title: "UI/UX Design",
    skills: ["Figma", "Adobe XD"]
  },
  {
    title: "Soft Skills",
    skills: ["Self-studying", "Work management", "Teamwork"]
  },
  {
    title: "Languages",
    skills: ["Sinhala","Hindi", "English", "French"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const SkillCard = ({ category }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={itemVariants}
    >
      <div className="p-4 transition-all duration-300 bg-white rounded-lg shadow-md hover:shadow-lg border-[#19191A] border-[1.5px] hover:bg-[#19191A] group">
        <h3 className="text-lg font-medium leading-6 text-[#19191a] group-hover:text-white transition-colors duration-300">
          {category.title}
        </h3>
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-10 p-4 mt-2 bg-[#19191A] rounded-lg shadow-lg"
            style={{ width: '200px' }}
          >
            <ul className="space-y-2">
              {category.skills.map((skill, skillIndex) => (
                <li key={skillIndex} className="text-sm text-gray-300">
                  • {skill}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function SkillsCompo() {
  return (
    <div className="px-4 py-12 sm:pt-[100px] md:pt-[200px] bg-transparent sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl">
        <div className="pt-24 pb-12 px-8 border-[#19191A] rounded-lg backdrop-blur-sm bg-white/30">
          <div className="absolute top-0 mt-4 transform -translate-x-1/2 -translate-y-1/2 left-1/2">
            <div className="relative inline-block">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-orange-500 rounded-full "
                style={{ 
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 75% 100%, 75% 25%, 0 25%)"
                }}
              />
              <img
                src={DP}
                alt="Profile"
                className="object-cover w-24 h-24 rounded-full shadow-lg sm:w-32 sm:h-32 md:w-48 md:h-48"
              />
            </div>
          </div>

          <div className="mb-12 text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-[#19191A]">My Skills</h2>
            <div>
              <p><span className="italic text-orange-500">"The more you learn, the more you realize how much you don't know"</span> — Albert Einstein</p>
            </div>
          </div>
          
          <motion.div
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {skillCategories.map((category, index) => (
              <SkillCard key={index} category={category} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
