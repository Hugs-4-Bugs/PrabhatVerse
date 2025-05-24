import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      duration: 1,
    },
  },
};

const containerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function AboutSection() {
  return (
    <motion.section
      variants={containerVariant}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="relative z-10 w-full max-w-screen-lg mx-auto mt-20 px-6 py-10 bg-gradient-to-br from-[#1a1a1a] to-[#1e293b] rounded-2xl shadow-2xl border border-neutral-800/50 backdrop-blur-xl"
    >
      <motion.h2
        variants={fadeInUp}
        className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6"
      >
        About Me
      </motion.h2>

      <motion.p
        variants={fadeInUp}
        className="text-lg leading-8 text-neutral-200"
      >
        Hi! I'm Prabhat Kumar, a passionate <b>Java Software Developer</b> driven by a vision to merge intelligence with innovation. I dive deep into AI, web technologies, and system design - crafting software that solves real-world problems. With love for Java, Spring Boot, React, and Machine Learning, I thrive on crafting scalable, high-performance apps.
        <br /><br />
        I'm the founder of <a href="https://quantumfusion-solutions.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-pink-400 font-semibold">QuantumFusion Solutions</a>, a company committed to cutting-edge solutions in AI, automation, and cloud computing. I'm also the author of <strong className="text-purple-400">The Inner Battle</strong> — a book about conquering self-doubt and unlocking inner strength.
        <br /><br />
        With 4+ years of trading experience across Stocks, Crypto, Forex & Derivatives, I specialize in combining algorithmic precision with market psychology.
        <br /><br />
        I am always exploring new technologies and creating innovative solutions to solve complex problems in a range of fields.
        </motion.p>

      <motion.ul
        variants={fadeInUp}
        className="mt-6 space-y-2 text-neutral-300"
      >
        <li><strong>Email:</strong> mailtoprabhat72@gmail.com</li>
        <li><strong>Location:</strong> Bangaluru, India</li>
        <li><strong>Interests:</strong> AI, Full Stack Development, Open Source, System Design, Trading, Writing, Innovation</li>
      </motion.ul>

      <motion.div
        variants={fadeInUp}
        className="mt-10 text-neutral-100"
      >
        <h3 className="text-2xl font-bold mb-4 text-pink-500">Work Experience</h3>
        <ul className="space-y-6">
          <li>
            <strong className="text-lg text-white">JMR Infotech Pvt Ltd (Jan 2023 – Present) – Backend Developer</strong>
            <ul className="ml-4 list-disc text-neutral-400 mt-2">
              <li>Developed login/signup systems with Spring Security & JWT</li>
              <li>Built secure, scalable backend services for Supply Chain & Real Estate projects</li>
              <li>Created blog APIs with features like like/dislike, edit/delete</li>
              <li>Collaborated closely with frontend and QA teams</li>
              <li><strong>Tech:</strong> Java, Spring Boot, Hibernate, MySQL, JWT, Postman, Maven</li>
            </ul>
          </li>
          <li>
            <strong className="text-lg text-white">CodeSpeedy Technology Pvt Ltd (Oct 2022 – Dec 2022) – Java Software Engineer Intern</strong>
            <ul className="ml-4 list-disc text-neutral-400 mt-2">
              <li>Built authentication modules using Spring Boot & JWT</li>
              <li>Managed entity relationships via Hibernate ORM</li>
              <li>Streamlined error handling with custom exceptions</li>
              <li><strong>Tech:</strong> Java, Spring Boot, Hibernate, JWT, MySQL</li>
            </ul>
          </li>
          <li>
            <strong className="text-lg text-white">Walmart USA (2022) – Remote Job Simulation</strong>
            <ul className="ml-4 list-disc text-neutral-400 mt-2">
              <li>Completed Advanced Software Engineering simulations</li>
              <li>Built custom Java heap for logistics and shipping ops</li>
              <li>Created UML/ER diagrams for scalable system design</li>
            </ul>
          </li>
        </ul>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className="absolute -top-8 right-8 w-28 h-28 bg-gradient-to-tr from-purple-500/40 to-pink-400/30 blur-3xl rounded-full animate-pulse"
      />
    </motion.section>
  );
}
