import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const technologies = [
  {
    category: "Programming Languages & Problem Solving",
    items: [
      { name: "Java", icon: "fab fa-java", desc: "Core backend programming" },
      { name: "SQL", icon: "fas fa-code", desc: "Structured Query Language" },
      { name: "Data Structures & Algorithms", icon: "fas fa-project-diagram", desc: "Problem-solving logic" },
      { name: "Competitive Coding", icon: "fas fa-laptop-code", desc: "Code optimization skills" },
    ],
  },
  {
    category: "Java Frameworks & Libraries",
    items: [
      { name: "Spring Boot", icon: "fas fa-leaf", desc: "Java backend framework" },
      { name: "Spring MVC", icon: "fas fa-stream", desc: "Model View Controller architecture" },
      { name: "Spring Security", icon: "fas fa-shield-alt", desc: "Security for Java applications" },
      { name: "Spring Cloud", icon: "fas fa-cloud", desc: "Microservices & distributed systems" },
      { name: "Spring AI", icon: "fas fa-brain", desc: "AI integration with Spring" },
      { name: "Apache POI", icon: "fas fa-file-excel", desc: "Java API for Microsoft documents" },
      { name: "ORM", icon: "fas fa-table", desc: "Object Relational Mapping" },
    ],
  },
  {
    category: "Web Technologies",
    items: [
      { name: "HTML", icon: "fab fa-html5", desc: "Markup language for web" },
      { name: "CSS", icon: "fab fa-css3-alt", desc: "Style sheet language" },
      { name: "RESTful API", icon: "fas fa-plug", desc: "Web service architecture" },
      { name: "JWT", icon: "fas fa-key", desc: "Authentication via JSON Web Tokens" },
    ],
  },
  {
    category: "Cloud Services - AWS",
    items: [
      { name: "AWS", icon: "fab fa-aws", desc: "Amazon Cloud Platform" },
      { name: "EC2", icon: "fab fa-aws", desc: "Elastic Compute Cloud" },
      { name: "S3", icon: "fab fa-aws", desc: "Simple Storage Service" },
      { name: "Lambda", icon: "fab fa-aws", desc: "Serverless compute service" },
      { name: "RDS", icon: "fab fa-aws", desc: "Managed Relational DB" },
      { name: "CloudFront", icon: "fab fa-aws", desc: "Content Delivery Network" },
      { name: "IAM", icon: "fab fa-aws", desc: "Access & Identity Management" },
      { name: "CloudWatch", icon: "fab fa-aws", desc: "Monitoring & Logging" },
      { name: "Cognito", icon: "fab fa-aws", desc: "Authentication & user pools" },
      { name: "DynamoDB", icon: "fab fa-aws", desc: "NoSQL database" },
      { name: "SQS", icon: "fab fa-aws", desc: "Message queueing service" },
      { name: "SNS", icon: "fab fa-aws", desc: "Notification service" },
      { name: "VPC", icon: "fab fa-aws", desc: "Virtual Private Cloud" },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "MySQL", icon: "fas fa-database", desc: "Relational DBMS" },
      { name: "PostgreSQL", icon: "fas fa-database", desc: "Advanced open-source DB" },
      { name: "MongoDB", icon: "fas fa-database", desc: "NoSQL database" },
    ],
  },
  {
    category: "DevOps & Tools",
    items: [
      { name: "Docker", icon: "fab fa-docker", desc: "Container platform" },
      { name: "Kubernetes", icon: "fas fa-network-wired", desc: "Container orchestration" },
      { name: "Jenkins", icon: "fab fa-jenkins", desc: "CI/CD automation" },
      { name: "Postman", icon: "fas fa-paper-plane", desc: "API testing tool" },
      { name: "Git", icon: "fab fa-git", desc: "Version control system" },
      { name: "GitHub", icon: "fab fa-github", desc: "Code hosting platform" },
      { name: "JIRA", icon: "fab fa-jira", desc: "Agile project management" },
      { name: "Agile", icon: "fas fa-sitemap", desc: "Development methodology" },
      { name: "SDLC", icon: "fas fa-project-diagram", desc: "Software Development Life Cycle" },
    ],
  },
  {
    category: "Editors / IDEs",
    items: [
      { name: "IntelliJ IDEA", icon: "fas fa-code", desc: "Java IDE" },
      { name: "Eclipse", icon: "fas fa-code", desc: "Java development environment" },
      { name: "Visual Studio Code", icon: "fas fa-code", desc: "Lightweight editor" },
      { name: "STS", icon: "fas fa-code", desc: "Spring Tool Suite" },
      { name: "MySQL Workbench", icon: "fas fa-toolbox", desc: "DB visualization tool" },
    ],
  },
  {
    category: "Operating Systems",
    items: [
      { name: "macOS", icon: "fab fa-apple", desc: "Apple Operating System" },
      { name: "Windows", icon: "fab fa-windows", desc: "Microsoft OS" },
      { name: "Linux", icon: "fab fa-linux", desc: "Open-source OS" },
    ],
  },
  {
    category: "Frontend Tools",
    items: [
      { name: "React (Basic)", icon: "fab fa-react", desc: "Frontend JavaScript library" },
      { name: "Tailwind CSS", icon: "fas fa-wind", desc: "Utility-first CSS" },
      { name: "Framer Motion", icon: "fas fa-bolt", desc: "Animation library for React" },
      { name: "Angular (Basic)", icon: "fab fa-angular", desc: "Frontend JavaScript framework" },
    ],
  },
  {
    category: "Design & UI/UX",
    items: [
      { name: "Figma", icon: "fab fa-figma", desc: "UI/UX design tool" },
      { name: "Adobe XD", icon: "fab fa-adobe", desc: "Design & prototyping tool" },
      { name: "UI/UX", icon: "fas fa-pencil-ruler", desc: "User experience & design" },
    ],
  },
  {
    category: "AI, ML, Automation",
    items: [
      { name: "AI", icon: "fas fa-robot", desc: "Artificial Intelligence development" },
      { name: "Machine Learning", icon: "fas fa-robot", desc: "Intelligent systems" },
      { name: "Algorithmic Trading", icon: "fas fa-cogs", desc: "Automated trading strategies" },
      { name: "Trading Algorithms", icon: "fas fa-cogs", desc: "Automated trading systems" },
    ],
  },
  {
    category: "Trading & Market Concepts",
    items: [
      { name: "Supply & Demand", icon: "fas fa-balance-scale", desc: "Core market movement concept" },
      { name: "Order Blocks", icon: "fas fa-cube", desc: "Institutional trading zones" },
      { name: "Fair Value Gap (FVG)", icon: "fas fa-equals", desc: "Inefficiencies in price" },
      { name: "Support & Resistance", icon: "fas fa-arrows-alt-h", desc: "Price action key levels" },
      { name: "Market Psychology", icon: "fas fa-brain", desc: "Investor behavior insights" },
      { name: "Trendlines", icon: "fas fa-chart-line", desc: "Visual guide to market trends" },
      { name: "Real vs Fake Breakouts", icon: "fas fa-exchange-alt", desc: "Detecting trap moves" },
      { name: "Candlestick Patterns", icon: "fas fa-chart-bar", desc: "Visual market patterns" },
      { name: "Mirror Market", icon: "fas fa-magic", desc: "Reflected price behavior" },
      { name: "Backtesting", icon: "fas fa-backward", desc: "Test trading logic" },
      { name: "Technical Analysis", icon: "fas fa-chart-line", desc: "Stock pattern analysis" },
      { name: "Liquidity Grab", icon: "fas fa-hand-holding-usd", desc: "Accumulation or liquidation of orders" },
      { name: "Fake Breakout", icon: "fas fa-exchange-alt", desc: "Price traps for retail traders" },
      { name: "Smart Money Concepts (SMC)", icon: "fas fa-briefcase", desc: "Market manipulation and institutional strategies" },
      { name: "Net Volume", icon: "fas fa-chart-bar", desc: "Volume analysis for market sentiment" },
      { name: "CHoCH (Change of Character)", icon: "fas fa-random", desc: "Market behavior shift signal" },
      { name: "BOS (Break of Structure)", icon: "fas fa-bolt", desc: "Trend reversal or continuation signal" },
      { name: "Institutional Trading", icon: "fas fa-university", desc: "Trading strategies used by institutions" },
      { name: "Retail Traps & Stop Hunts", icon: "fas fa-lock", desc: "Exploiting retail trader positions" },
      { name: "Accumulative Distribution", icon: "fas fa-sync", desc: "Identifying accumulation vs distribution phases" },
      { name: "Momentum Candle", icon: "fas fa-fire", desc: "Candles indicating strong market movement" },
      { name: "Limit Orders vs Order Blocks", icon: "fas fa-limits", desc: "Difference in order flow" },
      { name: "Insider Demand", icon: "fas fa-user-secret", desc: "Orders by institutional players" },
      { name: "Insider Supply", icon: "fas fa-user-secret", desc: "Supply zone controlled by institutions" },
      { name: "Outsider Demand", icon: "fas fa-users", desc: "Orders from retail traders" },
      { name: "Outsider Supply", icon: "fas fa-users", desc: "Supply zone controlled by retail traders" },
      { name: "Curve Line Support", icon: "fas fa-sliders-h", desc: "Support line following a curved pattern" },
      { name: "Curve Line Resistance", icon: "fas fa-sliders-h", desc: "Resistance line following a curved pattern" },
      { name: "Market Manipulation", icon: "fas fa-puzzle-piece", desc: "Market distortion by large players" },
      { name: "Smart Money vs Dumb Money", icon: "fas fa-cogs", desc: "Contrasting institutional and retail trading behavior" },
      { name: "Insider Supply & Demand Zones", icon: "fas fa-cogs", desc: "Key levels controlled by institutions" },
    ],
  },
  {
    category: "Personal & Creative",
    items: [
      { name: "Writing", icon: "fas fa-pencil-alt", desc: "Creative expression" },
      { name: "Research", icon: "fas fa-search", desc: "Knowledge discovery" },
      { name: "Self-Help", icon: "fas fa-heart", desc: "Personal development" },
      { name: "Motivation", icon: "fas fa-lightbulb", desc: "Inspiring others" },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 1.2, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50, // Reduced stiffness for a softer spring
      damping: 20,  // Softer damping for a smoother stop
      duration: 3.2, // Slower transition for a gentle effect
      delay: 0.5,  // Added delay for a slight pause before animation starts
      ease: "easeInOut", // Even smoother easing for a controlled arrival
    },
  },
};


export default function TechnologySection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <section ref={sectionRef} className="pb-12">
      <div className="sticky top-0 z-20 bg-gradient-to-b from-[#1a1a1b]  shadow-lg">
        <h2 className="sticky  backdrop-blur-md top-0 z-10 text-center text-4xl md:-4xl font-extrabold mb-14 py-6">
          <span className="mr-2 text-purple-500">🍳</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-green-600 to-purple-400">
            Tech Stack & Tools
          </span>
        </h2>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {technologies.map((category) => (
          <div key={category.category} className="mb-10">
            {/* <h3 className="text-xl font-semibold text-gray-300 mb-4">{category.category}</h3> */}
            <h3 className="text-xl font-semibold text-gray-700 dark:text-purple-300 mb-4">{category.category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">  
              {category.items.map((tech, index) => (
                <motion.div
                key={tech.name}
                className="rounded-xl p-5 bg-[#232325] border border-gray-700 shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 flex flex-col items-center"
                variants={cardVariants}
                initial="hidden"
                animate={controls}
                custom={index * 0.05} // Stagger within each category
                style={{ height: "180px", overflow: "hidden" }} // Fixed height with hidden overflow
              >
                  <i className={`${tech.icon} text-3xl text-green-400 mb-3`} />
                  <span className="text-white font-semibold text-lg mb-1 text-center">{tech.name}</span>
                  <span className="text-gray-400 text-sm text-center">{tech.desc}</span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}