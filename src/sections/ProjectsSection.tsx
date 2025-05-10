import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const allProjects = [
  {
    title: "Cryptocurrency Price prediction using Machine Learning",
    category: "AI & Finance",
    desc: "This program helps in forecasting cryptocurrency prices. In an effort to more accurately predict bitcoin prices quantitatively. It involves training a machine learning model to predict future prices of bitcoin based on historical data. It requires skills in data analysis, machine learning, and programming, and demonstrates expertise in these areas. This is a longer description to test the scrolling functionality within the card.",
    link: "https://github.com/Hugs-4-Bugs/Cryptocurrency-Price-prediction-using-ML",
  },
  {
    title: "REST-API-CRUD-Operation",
    category: "Web Development",
    desc: "The 'REST-API-CRUD-Operation' project is a Java-based application using Hibernate, Spring Boot, Maven, JSP, and Servlets. It enables efficient Create, Read, Update, and Delete (CRUD) operations, ensuring seamless data management and robust RESTful API interaction with the database.",
    link: "https://github.com/Hugs-4-Bugs/REST-API-CRUD-Operation",
  },
  {
    title: "Flight Reservation Project",
    category: "E-commerce & Web",
    desc: "Designed and implemented a comprehensive airline E-commerce website using Java Spring Boot, MySQL, AngularJS, and Thymeleaf. Integrated secure user authentication, flight search, booking, and check-in functionalities, incorporating REST APIs and role-based access control. Employed Spring Data JPA for seamless database interaction and implemented robust logging features.",
    link: "https://github.com/Hugs-4-Bugs/Flight_Reservation_Project",
  },
  {
    title: "Blog_Application-SpringBoot-Project",
    category: "Web Development",
    desc: "I developed a secure blogging application using Spring Security for user authentication and authorization. Leveraging Spring Boot, Maven, and Postman, the app supports CRUD operations for blog posts. Users can generate authentication tokens, access endpoints securely, and perform actions such as creating, updating, and deleting posts. This description is also a bit longer to see the scrolling.",
    link: "https://github.com/Hugs-4-Bugs/Blog_Application-SpringBoot-Project",
  },
  {
    title: "Hospital Management Application",
    category: "Web Development",
    desc: "Hospital Management Application with HTML, CSS, Bootstrap, and Spring Thymeleaf for frontend, and MySQL, Spring Boot, and Hibernate for backend. Features CRUD operations, contact service, service sections, downloadable reports, and REST API endpoints. Demonstrates proficiency in full-stack development and user-friendly interface design.",
    link: "https://github.com/Hugs-4-Bugs/Hospital-Managment-Application",
  },
  {
    title: "Bitcoin Mining Application",
    category: "Web & Finance",
    desc: "Java Spring Boot app with HTML and CSS for user interaction. Enables Bitcoin mining, user account management, transaction history viewing, configuration settings, logging, and audit trails. Features RESTful API endpoints and controllers. Dependencies: Spring Boot, BitcoinJ, MySQL Connector/J, Spring Boot Starter Test, and Spring Boot DevTools.",
    link: "https://github.com/Hugs-4-Bugs/Bitcoin-Mining-App",
  },
  {
    title: "Multiple File Upload Using Spring Boot",
    category: "Web Development",
    desc: "MultiFileUpload-Using-Spring-Boot-Application is a Spring Boot project facilitating multiple file uploads into a database via a RESTful API. It showcases multipart file handling and storage with Spring Data JPA. Simply clone the repository, build, and run the application to upload files via POST request.",
    link: "https://github.com/Hugs-4-Bugs/MultiFileUpload-Using-Spring-Boot-Application",
  },
  {
    title: "QR-code-Generator",
    category: "Utility & Web",
    desc: "'QR-code-Generator' is a Java project for creating unique QR codes for various inputs. It's scalable and customizable, supporting different sizes and error correction levels. Clone the repository, compile, and run using a Java IDE. Test input data via Postman at http://localhost:8100/qr/qrcode/{Your Input}.",
    link: "https://github.com/Hugs-4-Bugs/QR-code-Generator",
  },
  {
    title: "Awesome-Portfolio-Collection",
    category: "Resources & Web",
    desc: "'Awesome-Portfolio-Collection' is a comprehensive repository housing a vast array of over 100 portfolio collections. Each portfolio is crafted using HTML, CSS, JavaScript, and other technologies, offering a rich diversity of designs and functionalities. Explore and gain inspiration from a wide range of professional and creative portfolio examples.",
    link: "https://github.com/Hugs-4-Bugs/Awesome-Portfolio-Collection",
  },
  {
    title: "GitHub-Streak-Back",
    category: "Utility & API",
    desc: "GitHub-Streak-Back is a tool that helps restore broken GitHub streaks effortlessly. It automates contributions using Node.js and Git commands, ensuring your streak remains intact. Ideal for developers who accidentally missed a commit and want to maintain their streak history.",
    link: "https://github.com/Hugs-4-Bugs/github-streak-back.git",
  },
  {
    title: "AlgoByPrabhat",
    category: "Educational & Web",
    desc: "AlgoByPrabhat is a platform designed to simplify learning complex data structures and algorithms through interactive and engaging visualizations. Whether you're a student, coding enthusiast, or preparing for technical interviews, this platform provides a hands-on approach to mastering key algorithmic concepts.",
    link: "https://github.com/Hugs-4-Bugs/AlgoByPrabhat.git",
  },
  {
    title: "Sharma AI",
    category: "AI & Utility",
    desc: "Sharma AI is a voice-activated virtual assistant that allows users to interact with their computer using voice commands. Built with HTML, CSS, and JavaScript for the frontend, and Node.js with AppleScript for backend tasks, Sharma AI enables seamless application control and automation through voice interactions.",
    link: "https://github.com/Hugs-4-Bugs/Sharma-AI.git",
  },
  {
    title: "User Details App",
    category: "Web Development",
    desc: "The User Details App is a Spring Boot-based CRUD application that allows users to manage personal information, including adding, viewing, updating, and deleting entries. It features a clean REST API with validation and MySQL integration for data storage.",
    link: "https://github.com/Hugs-4-Bugs/user-details-app.git",
  },
  {
    title: "SpringBoot-OpenAI",
    category: "AI & API",
    desc: "SpringBoot-OpenAI is a Spring Boot-based API integration with OpenAI, allowing seamless interaction with AI models for generating responses, text processing, and more. It serves as an example for integrating AI-driven capabilities into Java applications.",
    link: "https://github.com/Hugs-4-Bugs/SpringBoot-OpenAI",
  },
  {
    title: "Mobile Banking",
    category: "Web & Finance",
    desc: "Mobile Banking is a Spring Boot application designed to provide banking services such as account management, transactions, and secure fund transfers. It ensures high security and scalability while offering seamless integration with financial systems.",
    link: "https://github.com/Hugs-4-Bugs/Sharma-AI.git",
  },
  {
    title: "Uber Application",
    category: "Web & E-commerce",
    desc: "Uber Application is a Spring Boot-based ride-hailing platform that allows users to book rides, track drivers, estimate fares, and make secure payments. It ensures real-time ride management and seamless integration with mapping and payment systems.",
    link: "https://github.com/Hugs-4-Bugs/Uber-Application.git",
  },
  {
    title: "Cafe Management System",
    category: "Web & Business",
    desc: "Cafe Management System is a Spring Boot application designed to streamline cafe operations, including order management, menu customization, billing, and customer management. It ensures efficiency and enhances the overall cafe experience through automation and easy tracking.",
    link: "https://github.com/Hugs-4-Bugs/Cafe-Management-System.git",
  },
  {
    title: "Ollama Spring Boot AI Implementation",
    category: "AI & API",
    desc: "Ollama Spring Boot AI Implementation integrates Spring Boot with Ollama AI models to provide AI-powered responses using Spring AI and Flux. It supports synchronous and streaming AI responses using models like DeepSeek R1, ensuring real-time, efficient AI interactions. This description is intentionally very long to demonstrate the scrolling functionality within the project card. It spans multiple lines and contains extra text to exceed the typical card height.",
    link: "https://github.com/Hugs-4-Bugs/Ollama-Spring-Boot-AI-Implementation.git",
  },
  {
    title: "LinkedIn Application",
    category: "Web & Social",
    desc: "LinkedIn Application is a Spring Boot microservices-based project that replicates key features of LinkedIn, including user management, connections, posts, and notifications. It leverages Eureka for service discovery and API Gateway for seamless interaction between services.",
    link: "https://github.com/Hugs-4-Bugs/LinkedIn-Application.git",
  },
];

const categories = ["All", ...new Set(allProjects.map(p => p.category).flatMap(cat => cat.split(" & ").map(c => c.trim())))];

const cardVariants = {
  initial: 
  { opacity: 0, 
    scale: 0.7, 
    rotateZ: 15 
  },
  animate: 
  { opacity: 1, 
    scale: 1, 
    rotateZ: 0, 
    transition: 
    { 
      type: "spring", 
      damping: 18, 
      stiffness: 160 
    } 
  },
  exit: 
  { 
    opacity: 0, 
    scale: 0.9, 
    rotateZ: -15, 
    transition: 
    { 
      duration: 3 
    } 
  },
};

export default function ProjectsSection() {
  const [filter, setFilter] = useState("All");
  const shown = allProjects.filter(p =>
    filter === "All" || p.category.split(" & ").map(c => c.trim()).includes(filter)
  );

  // const stickyRef = useRef(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (stickyRef.current) {
          stickyRef.current.classList.toggle("intersecting", entry.isIntersecting);
        }
      },
      {
        rootMargin: "-80px 0px 0px 0px",
        threshold: 0,
      }
    );

    if (stickyRef.current) {
      observer.observe(stickyRef.current);
    }

    return () => {
      if (stickyRef.current) {
        observer.unobserve(stickyRef.current);
      }
    };
  }, []);

  return (
    // project card section
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div ref={stickyRef} className="fixed top-16 left-1/2 transform -translate-x-1/3 z-50 bg-opacity-20 backdrop-blur-md py-2 transition-shadow duration-300">
      {/* <div ref={stickyRef} className="sticky top-0 z-50 bg-opacity-90 backdrop-blur-md py-4 transition-shadow duration-300"> */}
        <h2 className="text-center text-4xl md:-4xl font-extrabold mb-4">
          <span className="mr-2 mr-2 text-teal-60">💻</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            My Projects
          </span>
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-semibold transition-colors duration-300
                ${
                  filter === cat
                    ? "bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-md"
                    : "bg-zinc-800 text-gray-300 hover:bg-purple-700 hover:text-white shadow-inner"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
      {/* lg:grid-cols-2 means 1 colume me 2 card honge */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
        <AnimatePresence>
          {shown.map((pr, index) => (
            <motion.div
              key={pr.title}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={cardVariants}
              transition={{ delay: index * 0.1 }} // Subtle stagger
              className="bg-zinc-900 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 h-[500px]"
              style={{ maxHeight: "350px", marginTop: "90px" }}   // container length
            >
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-bold text-purple-400 mb-2">{pr.title}</h3>
                <div className="text-gray-400 text-sm mb-4 overflow-y-auto flex-grow">
                  {pr.desc}
                </div>
                <div className="mt-auto">
                  <a
                    href={pr.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-300"
                  >
                    <span className="mr-2">🔗</span>Project Link
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {shown.length === 0 && (
          <div className="col-span-full text-gray-500 py-8 text-center">
            No projects to show in this category.
          </div>
        )}
      </div>
    </section>
  );
}