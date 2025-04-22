import React, { useState } from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "API Development and Integration",
    desc: "Crafting seamless digital connections, I specialize in API development and integration, ensuring robust communication between systems for a cohesive and efficient user experience.",
  },
  {
    title: "Java Software Development",
    desc: "Expert Java Developer skilled in Spring Boot, Hibernate, JSP, Microservices, and database management. Proven track record in creating robust, efficient Java applications for seamless business solutions.",
  },
  {
    title: "Cloud Infrastructure & DevOps",
    desc: "I architect and manage cloud-native solutions with AWS, focusing on scalability, security, and automation. From CI/CD pipelines to container orchestration and cost optimization, I ensure your infrastructure is always production-ready.",
  },
  {
    title: "Strategic Trading Solutions",
    desc: "Advanced Trading Expertise: 4+ years in Stock, Future & Option, Crypto, and Forex trading. Offering tailored strategies and insights for optimized trading experiences and financial growth.",
  },
  {
    title: "AI/ML Implementation",
    desc: "Designing and deploying intelligent systems with real-world machine learning models. From predictive analytics to natural language processing, I integrate AI/ML solutions tailored for maximum impact.",
  },
  {
    title: "Web Application Development",
    desc: "I build scalable, high-performance web applications using modern frameworks and best practices. From architecture to deployment, every layer is optimized for responsiveness and efficiency.",
  },
  {
    title: "UI/UX Design",
    desc: "Crafting user-centric interfaces that are not only visually stunning but also intuitive and accessible. I focus on design systems, seamless navigation, and responsive layouts to enhance user engagement.",
  },
  {
    title: "System Architecture & Automation",
    desc: "Specialized in designing end-to-end system architectures and automating complex workflows. Whether it’s building custom servers, compilers, or AI pipelines — I bring innovative engineering to streamline operations and boost efficiency.",
  }
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: i % 2 === 0 ? -100 : 100,
    rotate: i % 2 === 0 ? -15 : 15,
    scale: 0.6,
  }),
  show: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6,
    },
  },
};

export default function ServicesSection() {
  // const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    // pt-36 use karke "My Cutting-Edge Services" or cards k bich ka gap maintain kar sakte hai
    <section className="max-w-6xl mx-auto px-6 pt-32 py-16">
      <h2 className="fixed top-16 left-1/2 transform -translate-x-1/3 z-50 bg-opacity-60 backdrop-blur-md text-center text-4xl md:text-4xl font-extrabold mb-14 mt-100 py-6">
        <span className="mr-2">🚀</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-teal-800 to-white">
          My Cutting-Edge Services
        </span>
      </h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-20"
      >
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            custom={i}
            variants={cardVariants}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            whileHover={{
              scale: 1.12,
              rotate: -5,
              transition: {
                type: "spring",
                stiffness: 180,
                damping: 44,
                duration: 0,
                ease: "easeInOut"
              }
            }}
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
            className={`
              bg-[#232325]/80 border border-gray-700 backdrop-blur-md rounded-3xl p-6
              shadow-[0_10px_40px_rgba(0,0,0,0.3)] relative overflow-hidden group cursor-pointer
              duration-500 ease-in-out 
              ${
                hoveredIndex !== null && hoveredIndex !== i ? "" : "" // Removed the blur-sm and scale-95 classes
              }
             h-[280px] w-[350px] 
            `}
          >
            <motion.div
              className="absolute inset-0 z-0 rounded-3xl bg-gradient-to-br from-[#ffffff0d] via-[#ffffff0a] to-[#ffffff0d] "
              animate={{ opacity: hoveredIndex === i ? 1 : 0.1, scale: hoveredIndex === i ? 1.05 : 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-cyan-300">
                {s.title}
              </h3>
              <p className="text-gray-300 group-hover:text-gray-100 transition-colors duration-300 overflow-y-auto max-h-[120px] pr-1">
                {s.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}