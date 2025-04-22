import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skills = {
  Frontend: ["React", "HTML", "CSS", "Tailwind", "AngularJS"],
  Backend: ["Spring Boot", "Node.js", "REST API", "Java"],
  Design: ["Figma", "Adobe XD", "UI/UX"],
  Database: ["MySQL", "MongoDB", "PostgreSQL"],
  DevOps: ["Git", "Docker", "Jenkins"],
  Other: ["Machine Learning", "AppleScript"],
  Trading: ["Technical Analysis", "Algorithmic Trading", "Market Psychology", "Candlestick Patterns", "Backtesting"],
  BookWriting: ["Writing", "Creative Writing", "Research", "Self-Help", "Motivation"],
};

const itemVariants = {
  hidden: (initialPosition: any) => ({
    opacity: 0,
    y: initialPosition.y,
    x: initialPosition.x,
    scale: 0.95,
  }),
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 50, // Reduced stiffness for a smoother, slower spring
      damping: 30,   // Increased damping to prevent excessive bouncing
      duration: 2.2,  // Increased duration for a slower animation
    },
  },
};

const skillListVariants = {
  hidden: {
    opacity: 0,
    height: 0,
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.5, // Slightly increased duration for list reveal
    },
  },
};

const skillItemVariants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3, // Slightly increased duration for item reveal
      delay: 0.2,    // Slightly increased delay for staggered effect
    },
  },
};

const getRandomStartPosition = (index: any): any => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const edge = Math.floor(Math.random() * 8); // 0-7 for 8 entry points
  const offset = 150; // Increased offset for more prominent entry

  switch (edge) {
    case 0: // Top
      return { x: (screenWidth / 3) * (index % 3) - screenWidth / 6, y: -offset };
    case 1: // Bottom
      return { x: (screenWidth / 3) * (index % 3) - screenWidth / 6, y: screenHeight + offset };
    case 2: // Left
      return { x: -offset, y: (screenHeight / 3) * (index % 3) - screenHeight / 6 };
    case 3: // Right
      return { x: screenWidth + offset, y: (screenHeight / 3) * (index % 3) - screenHeight / 6 };
    case 4: // Top Middle
      return { x: (screenWidth / 2) + (Math.random() > 0.5 ? 75 : -75), y: -offset };
    case 5: // Bottom Middle
      return { x: (screenWidth / 2) + (Math.random() > 0.5 ? 75 : -75), y: screenHeight + offset };
    case 6: // Left Middle
      return { x: -offset, y: (screenHeight / 2) + (Math.random() > 0.5 ? 75 : -75) };
    case 7: // Right Middle
      return { x: screenWidth + offset, y: (screenHeight / 2) + (Math.random() > 0.5 ? 75 : -75) };
    default:
      return { x: 0, y: 75 }; // Default fallback
  }
};

export default function SkillsSection() {
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleToggle = (category: string) => {
    setOpen((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  return (
    // <section className="max-w-6xl mx-auto px-6 py-16" ref={containerRef}>
    //   <h2 className="fixed top-16 left-1/2 transform -translate-x-1/3 z-50 bg-opacity-50 backdrop-blur-md top-0 z-10 text-center text-4xl md:-4xl font-extrabold mb-14 py-6">
    //     <span className="mr-2">🧠</span>
    //     <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-teal-800 to-gray-400">
    //       Skills & Expertise
    //     </span>
    //   </h2>
    <section className="max-w-6xl mx-auto px-6 py-16" ref={containerRef}>
      <h2 className="sticky bg-opacity-50 backdrop-blur-md top-0 z-10 text-center text-4xl md:-4xl font-extrabold mb-14 py-6">
      <span className="mr-2">🧠</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-teal-800 to-gray-400">
          Skills & Expertise
        </span>
      </h2>
      <div style={{ maxHeight: "calc(100vh - 150px)" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {Object.entries(skills).map(([category, skillList], index) => (
            <motion.div
              key={category}
              variants={itemVariants}
              initial={inView ? "show" : "hidden"}
              animate={inView ? "show" : "hidden"}
              custom={inView ? { x: 0, y: 0 } : getRandomStartPosition(index)}
              className="bg-gradient-to-br from-gray-800 to-zinc-700 rounded-2xl shadow-md transition-shadow duration-300 w-[110%] max-w-[500px] mx-auto"
            >
              <motion.button
                onClick={() => handleToggle(category)}
                className="w-full flex justify-between items-center py-4 px-5 text-left text-gray-300 font-semibold bg-gradient-to-r from-blue-700 to-indigo-800 rounded-t-2xl cursor-pointer focus:outline-none"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-xl md:text-2xl font-semibold tracking-wide">{category}</span>
                <motion.span
                  animate={{ rotate: open[category] ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl"
                >
                  {open[category] ? "▲" : "▼"}
                </motion.span>
              </motion.button>
              <AnimatePresence>
                {open[category] && (
                  <motion.ul
                    variants={skillListVariants}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="bg-zinc-800 rounded-b-2xl py-3 px-5"
                  >
                    {skillList.map((skill) => (
                      <motion.li
                        key={skill}
                        variants={skillItemVariants}
                        className="text-gray-400 py-1.5 text-lg transition-colors duration-200 hover:text-cyan-400"
                      >
                        <span className="mr-2 text-cyan-500">•</span> {skill}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}