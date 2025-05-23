import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

// Define an interface for a single technology item
interface TechnologyItem {
  name: string;
  icon: string;
  desc: string;
  details: string; // Add details property to the interface
}

// Define an interface for a technology category
interface TechnologyCategory {
  category: string;
  items: TechnologyItem[];
}

const technologies: TechnologyCategory[] = [
  {
    category: "Programming Languages & Problem Solving",
    items: [
      { name: "Java", icon: "fab fa-java", desc: "Core backend programming", details: "Java is a high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible. It's widely used for enterprise-level applications, Android development, and big data." },
      { name: "SQL", icon: "fas fa-code", desc: "Structured Query Language", details: "SQL (Structured Query Language) is a standard language for storing, manipulating and retrieving data in relational databases. It's essential for data analysis, reporting, and managing database systems." },
      { name: "Data Structures & Algorithms", icon: "fas fa-project-diagram", desc: "Problem-solving logic", details: "Data Structures and Algorithms (DSA) are fundamental concepts in computer science. Data structures organize data efficiently, while algorithms are step-by-step procedures to solve computational problems. Mastering DSA is crucial for efficient problem-solving and optimizing code performance." },
      { name: "Competitive Coding", icon: "fas fa-laptop-code", desc: "Code optimization skills", details: "Competitive coding involves solving programming problems efficiently under time and memory constraints. It enhances problem-solving skills, algorithmic thinking, and the ability to write optimized and bug-free code." },
    ],
  },
  {
    category: "Java Frameworks & Libraries",
    items: [
      { name: "Spring Boot", icon: "fas fa-leaf", desc: "Java backend framework", details: "Spring Boot simplifies the development of production-ready Spring applications. It provides auto-configuration, an embedded server, and a vast ecosystem of tools, making it easy to create standalone, robust applications." },
      { name: "Spring MVC", icon: "fas fa-stream", desc: "Model View Controller architecture", details: "Spring MVC is a powerful framework for building web applications based on the Model-View-Controller design pattern. It provides a clear separation of concerns, making applications scalable and maintainable." },
      { name: "Spring Security", icon: "fas fa-shield-alt", desc: "Security for Java applications", details: "Spring Security is a powerful and highly customizable authentication and access-control framework. It provides comprehensive security services for Java applications, protecting them from common vulnerabilities." },
      { name: "Spring Cloud", icon: "fas fa-cloud", desc: "Microservices & distributed systems", details: "Spring Cloud provides tools for developers to quickly build some of the common patterns in distributed systems (e.g., configuration management, service discovery, circuit breakers, intelligent routing, micro-proxy, control bus). It's essential for building resilient and scalable microservices architectures." },
      { name: "Spring AI", icon: "fas fa-brain", desc: "AI integration with Spring", details: "Spring AI aims to simplify the development of AI-powered applications using Spring. It provides abstractions and integrations for various AI models and services, enabling developers to easily incorporate AI functionalities into their Spring projects." },
      { name: "Apache POI", icon: "fas fa-file-excel", desc: "Java API for Microsoft documents", details: "Apache POI is a Java API for manipulating various file formats based on Microsoft's OLE 2 Compound Document format, including Excel (.xls and .xlsx), Word (.doc and .docx), and PowerPoint (.ppt and .pptx). It's widely used for generating and parsing office documents in Java applications." },
      { name: "ORM", icon: "fas fa-table", desc: "Object Relational Mapping", details: "Object-Relational Mapping (ORM) is a programming technique for converting data between incompatible type systems using object-oriented programming languages. In Java, ORM frameworks like Hibernate map Java objects to database tables, simplifying database interactions." },
    ],
  },
  {
    category: "Web Technologies",
    items: [
      { name: "HTML", icon: "fab fa-html5", desc: "Markup language for web", details: "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It is the backbone of all web pages, defining their structure and content." },
      { name: "CSS", icon: "fab fa-css3-alt", desc: "Style sheet language", details: "CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML or XML. It controls the layout, colors, fonts, and overall visual appearance of web pages." },
      { name: "RESTful API", icon: "fas fa-plug", desc: "Web service architecture", details: "REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs allow different systems to communicate with each other over the internet using standard HTTP methods, forming the backbone of modern web services." },
      { name: "JWT", icon: "fas fa-key", desc: "Authentication via JSON Web Tokens", details: "JWT (JSON Web Token) is a compact, URL-safe means of representing claims to be transferred between two parties. It's commonly used for authentication and authorization in web applications, allowing secure information exchange." },
    ],
  },
  {
    category: "Cloud Services - AWS",
    items: [
      { name: "AWS", icon: "fab fa-aws", desc: "Amazon Cloud Platform", details: "Amazon Web Services (AWS) is the world's most comprehensive and broadly adopted cloud platform, offering over 200 fully featured services from data centers globally. It provides on-demand access to computing power, storage, databases, and more." },
      { name: "EC2", icon: "fab fa-aws", desc: "Elastic Compute Cloud", details: "Amazon EC2 (Elastic Compute Cloud) provides scalable computing capacity in the AWS cloud. It allows users to rent virtual servers, configure their operating systems, and run applications without worrying about hardware provisioning." },
      { name: "S3", icon: "fab fa-aws", desc: "Simple Storage Service", details: "Amazon S3 (Simple Storage Service) is an object storage service offering industry-leading scalability, data availability, security, and performance. It's used for storing and retrieving any amount of data, from websites and mobile apps to backups and data archives." },
      { name: "Lambda", icon: "fab fa-aws", desc: "Serverless compute service", details: "AWS Lambda is a serverless, event-driven compute service that lets you run code for virtually any type of application or backend service without provisioning or managing servers. You pay only for the compute time you consume." },
      { name: "RDS", icon: "fab fa-aws", desc: "Managed Relational DB", details: "Amazon RDS (Relational Database Service) makes it easy to set up, operate, and scale a relational database in the cloud. It supports various database engines like MySQL, PostgreSQL, and Oracle, abstracting away administrative tasks." },
      { name: "CloudFront", icon: "fab fa-aws", desc: "Content Delivery Network", details: "Amazon CloudFront is a fast content delivery network (CDN) service that securely delivers data, videos, applications, and APIs to customers globally with low latency and high transfer speeds. It caches content at edge locations closer to users." },
      { name: "IAM", icon: "fab fa-aws", desc: "Access & Identity Management", details: "AWS IAM (Identity and Access Management) enables you to securely control access to AWS services and resources. It allows you to manage users, groups, and permissions, ensuring that only authorized individuals and applications can access your AWS environment." },
      { name: "CloudWatch", icon: "fab fa-aws", desc: "Monitoring & Logging", details: "Amazon CloudWatch is a monitoring and observability service that provides data and actionable insights to monitor your applications, respond to system-wide performance changes, and optimize resource utilization. It collects logs, metrics, and events." },
      { name: "Cognito", icon: "fab fa-aws", desc: "Authentication & user pools", details: "Amazon Cognito provides authentication, authorization, and user management for your web and mobile apps. It supports user directories and identity federation, making it easy to add sign-up/sign-in and access control to your applications." },
      { name: "DynamoDB", icon: "fab fa-aws", desc: "NoSQL database", details: "Amazon DynamoDB is a fast and flexible NoSQL database service for all applications that need consistent, single-digit millisecond latency at any scale. It's a fully managed service that supports both document and key-value data models." },
      { name: "SQS", icon: "fab fa-aws", desc: "Message queueing service", details: "Amazon SQS (Simple Queue Service) is a fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications. It allows messages to be sent, stored, and received between software components." },
      { name: "SNS", icon: "fab fa-aws", desc: "Notification service", details: "Amazon SNS (Simple Notification Service) is a fully managed messaging service for both application-to-application (A2A) and application-to-person (A2P) communication. It enables you to send notifications to a large number of subscribers via various protocols." },
      { name: "VPC", icon: "fab fa-aws", desc: "Virtual Private Cloud", details: "Amazon VPC (Virtual Private Cloud) lets you provision a logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define. You have complete control over your virtual networking environment." },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "MySQL", icon: "fas fa-database", desc: "Relational DBMS", details: "MySQL is an open-source relational database management system (RDBMS). It's widely used for web applications, enterprise applications, and embedded systems due to its reliability, performance, and ease of use." },
      { name: "PostgreSQL", icon: "fas fa-database", desc: "Advanced open-source DB", details: "PostgreSQL is a powerful, open-source object-relational database system with a strong reputation for reliability, feature robustness, and performance. It supports both SQL and JSON querying, making it versatile for various applications." },
      { name: "MongoDB", icon: "fas fa-database", desc: "NoSQL database", details: "MongoDB is a popular open-source NoSQL database that stores data in flexible, JSON-like documents. It's designed for scalability and high performance, making it suitable for modern applications with rapidly evolving data requirements." },
    ],
  },
  {
    category: "DevOps & Tools",
    items: [
      { name: "Docker", icon: "fab fa-docker", desc: "Container platform", details: "Docker is an open-source platform that enables developers to automate the deployment, scaling, and management of applications using containerization. Containers package an application and all its dependencies into a single, isolated unit." },
      { name: "Kubernetes", icon: "fas fa-network-wired", desc: "Container orchestration", details: "Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications. It groups containers that make up an application into logical units for easy management and discovery." },
      { name: "Jenkins", icon: "fab fa-jenkins", desc: "CI/CD automation", details: "Jenkins is an open-source automation server that facilitates continuous integration and continuous delivery (CI/CD). It automates the various stages of the software development lifecycle, including building, testing, and deploying applications." },
      { name: "Postman", icon: "fas fa-paper-plane", desc: "API testing tool", details: "Postman is a popular API platform for building and using APIs. It provides a user-friendly interface for sending HTTP requests, inspecting responses, and automating API tests, making API development and testing much easier." },
      { name: "Git", icon: "fab fa-git", desc: "Version control system", details: "Git is a distributed version control system that tracks changes in source code during software development. It enables multiple developers to collaborate on a project, manage different versions of code, and revert to previous states if needed." },
      { name: "GitHub", icon: "fab fa-github", desc: "Code hosting platform", details: "GitHub is a web-based platform for version control and collaboration, primarily using Git. It provides hosting for software development and version control using Git, offering features like pull requests, issue tracking, and project management." },
      { name: "JIRA", icon: "fab fa-jira", desc: "Agile project management", details: "Jira is a proprietary issue tracking product developed by Atlassian that allows bug tracking and agile project management. It's widely used by development teams for tracking tasks, bugs, and managing project workflows." },
      { name: "Agile", icon: "fas fa-sitemap", desc: "Development methodology", details: "Agile is an iterative and incremental approach to software development that emphasizes collaboration, self-organizing teams, and adapting to change. It promotes rapid delivery of working software and continuous improvement." },
      { name: "SDLC", icon: "fas fa-project-diagram", desc: "Software Development Life Cycle", details: "The Software Development Life Cycle (SDLC) is a process followed for a software project within a software organization. It defines a methodology for improving the quality of software and the overall development process, typically including planning, analysis, design, implementation, testing, and maintenance." },
    ],
  },
  {
    category: "Editors / IDEs",
    items: [
      { name: "IntelliJ IDEA", icon: "fas fa-code", desc: "Java IDE", details: "IntelliJ IDEA is a powerful and intelligent Integrated Development Environment (IDE) for Java. It offers advanced code completion, refactoring tools, debugging capabilities, and extensive support for various frameworks and technologies, significantly boosting developer productivity." },
      { name: "Eclipse", icon: "fas fa-code", desc: "Java development environment", details: "Eclipse is a popular open-source Integrated Development Environment (IDE) primarily used for Java development. It provides a comprehensive set of tools for coding, debugging, and deploying Java applications, with a vast ecosystem of plugins for extended functionality." },
      { name: "Visual Studio Code", icon: "fas fa-code", desc: "Lightweight editor", details: "Visual Studio Code (VS Code) is a lightweight yet powerful source code editor developed by Microsoft. It supports a wide range of programming languages and offers features like debugging, syntax highlighting, intelligent code completion, and integrated Git control, making it highly versatile for developers." },
      { name: "STS", icon: "fas fa-code", desc: "Spring Tool Suite", details: "Spring Tool Suite (STS) is a specialized IDE built on top of Eclipse, specifically designed for developing Spring-based applications. It provides enhanced support for Spring projects, including quick starts, intelligent code assistance, and visual editors for Spring configurations." },
      { name: "MySQL Workbench", icon: "fas fa-toolbox", desc: "DB visualization tool", details: "MySQL Workbench is a unified visual tool for database architects, developers, and DBAs. It provides tools for SQL development, database design, migration, and administration, allowing users to visually design, model, generate, and manage databases." },
    ],
  },
  {
    category: "Operating Systems",
    items: [
      { name: "macOS", icon: "fab fa-apple", desc: "Apple Operating System", details: "macOS is the proprietary operating system developed by Apple Inc. for its Macintosh line of computers. It's known for its intuitive user interface, robust security features, and seamless integration with Apple's hardware and ecosystem." },
      { name: "Windows", icon: "fab fa-windows", desc: "Microsoft OS", details: "Microsoft Windows is a series of graphical operating systems developed and marketed by Microsoft. It's the most widely used desktop operating system globally, known for its extensive software compatibility and user-friendly interface." },
      { name: "Linux", icon: "fab fa-linux", desc: "Open-source OS", details: "Linux is an open-source operating system kernel that powers a wide range of devices, from servers and supercomputers to smartphones and embedded systems. It's known for its stability, security, flexibility, and strong community support." },
    ],
  },
  {
    category: "Frontend Tools",
    items: [
      { name: "React (Basic)", icon: "fab fa-react", desc: "Frontend JavaScript library", details: "React is a free and open-source frontend JavaScript library for building user interfaces based on components. It's declarative, efficient, and flexible, allowing developers to create complex UIs from small, isolated pieces of code." },
      { name: "Tailwind CSS", icon: "fas fa-wind", desc: "Utility-first CSS", details: "Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces. It provides a vast set of low-level utility classes that can be composed to build any design directly in your markup, reducing the need for writing custom CSS." },
      { name: "Framer Motion", icon: "fas fa-bolt", desc: "Animation library for React", details: "Framer Motion is a production-ready animation library for React. It makes it easy to create beautiful and smooth animations in your React applications with simple, declarative syntax and powerful features like gestures, transitions, and layout animations." },
      { name: "Angular (Basic)", icon: "fab fa-angular", desc: "Frontend JavaScript framework", details: "Angular is a platform and framework for building single-page client applications using HTML and TypeScript. It provides a comprehensive set of tools and features for building complex, enterprise-grade web applications with a structured and maintainable architecture." },
    ],
  },
  {
    category: "Design & UI/UX",
    items: [
      { name: "Figma", icon: "fab fa-figma", desc: "UI/UX design tool", details: "Figma is a collaborative, cloud-based design tool for creating user interfaces and user experiences. It enables real-time collaboration, prototyping, and handoff, making it a popular choice for design teams." },
      { name: "Adobe XD", icon: "fab fa-adobe", desc: "Design & prototyping tool", details: "Adobe XD is a vector-based user experience design tool for web and mobile apps. It allows designers to create wireframes, prototypes, and high-fidelity designs, with features for interactive prototyping and collaboration." },
      { name: "UI/UX", icon: "fas fa-pencil-ruler", desc: "User experience & design", details: "UI (User Interface) and UX (User Experience) are crucial aspects of product design. UI focuses on the visual elements users interact with, while UX encompasses the entire user journey and satisfaction. A good UI/UX ensures a product is both aesthetically pleasing and easy to use." },
    ],
  },
  {
    category: "AI, ML, Automation",
    items: [
      { name: "AI", icon: "fas fa-robot", desc: "Artificial Intelligence development", details: "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think like humans and mimic their actions. It encompasses various fields like machine learning, deep learning, and natural language processing, enabling systems to perform tasks that typically require human intelligence." },
      { name: "Machine Learning", icon: "fas fa-robot", desc: "Intelligent systems", details: "Machine Learning (ML) is a subset of AI that enables systems to learn from data, identify patterns, and make decisions with minimal human intervention. It involves training algorithms on large datasets to recognize patterns and make predictions, driving advancements in various industries." },
      { name: "Algorithmic Trading", icon: "fas fa-cogs", desc: "Automated trading strategies", details: "Algorithmic trading, also known as algo-trading, uses computer programs to execute trades at speeds and frequencies impossible for human traders. These algorithms are based on predefined sets of instructions, often incorporating complex mathematical models, to automate trading decisions and capitalize on market opportunities." },
      { name: "Trading Algorithms", icon: "fas fa-cogs", desc: "Automated trading systems", details: "Trading algorithms are automated sets of rules and strategies used to execute trades in financial markets. They analyze market data, identify trading opportunities, and automatically place orders, allowing for efficient and disciplined trading without manual intervention." },
    ],
  },
  {
    category: "Testing & Documentation",
    items: [
      {
        name: "JUnit",
        icon: "fas fa-vial",
        desc: "Unit testing framework",
        details: "JUnit is a widely used testing framework for Java applications, enabling test-driven development and automated unit testing. It provides annotations and assertions to write and run tests efficiently, ensuring the correctness and reliability of individual code components."
      },
      {
        name: "Mockito",
        icon: "fas fa-magic",
        desc: "Mocking framework",
        details: "Mockito is a Java-based mocking framework used for unit testing by creating mock objects and verifying interactions. It allows developers to isolate the code under test from its dependencies, making tests faster, more reliable, and easier to write."
      },
      {
        name: "Swagger",
        icon: "fas fa-book",
        desc: "API documentation",
        details: "Swagger is a tool for designing, building, and documenting RESTful APIs with interactive UI and OpenAPI specifications. It provides a standardized way to describe APIs, enabling developers to easily understand and interact with them, and facilitating collaboration."
      }
    ]
  },
  {
    category: "Build & Dependency Management",
    items: [
      {
        name: "Maven",
        icon: "fas fa-cogs",
        desc: "Build automation tool",
        details: "Apache Maven is a build automation and project management tool used primarily for Java projects with dependency management via POM files. It simplifies the build process, manages project dependencies, and ensures consistency across development environments."
      },
      {
        name: "Gradle",
        icon: "fas fa-wrench",
        desc: "Build system for Java",
        details: "Gradle is a modern build automation tool that supports dependency management and builds scripting with Groovy or Kotlin DSL. It's known for its flexibility, performance, and ability to build complex multi-project builds efficiently."
      }
    ]
  },
  {
    category: "Trading & Market Concepts",
    items: [
      { name: "Supply & Demand", icon: "fas fa-balance-scale", desc: "Core market movement concept", details: "Supply and Demand are fundamental economic principles that determine prices in a market. In trading, understanding these forces helps identify potential price movements based on the imbalance between available assets and buyers/sellers." },
      { name: "Order Blocks", icon: "fas fa-cube", desc: "Institutional trading zones", details: "Order Blocks are specific price areas on a chart where institutional traders have placed a significant number of orders. Identifying these zones can indicate potential strong support or resistance levels where large market participants are active." },
      { name: "Fair Value Gap (FVG)", icon: "fas fa-equals", desc: "Inefficiencies in price", details: "A Fair Value Gap (FVG) represents an inefficiency or imbalance in price delivery, often characterized by a gap between candlesticks. Traders look for FVGs as potential areas where price might retrace to fill the gap, indicating a return to equilibrium." },
      { name: "Support & Resistance", icon: "fas fa-arrows-alt-h", desc: "Price action key levels", details: "Support and Resistance are key price levels on a chart where the price tends to pause or reverse due to increased buying (support) or selling (resistance) interest. These levels are crucial for identifying potential entry and exit points." },
      { name: "Market Psychology", icon: "fas fa-brain", desc: "Investor behavior insights", details: "Market Psychology refers to the overall sentiment and emotional biases of market participants that can influence price movements. Understanding fear, greed, and herd mentality helps traders anticipate irrational market behavior and make informed decisions." },
      { name: "Trendlines", icon: "fas fa-chart-line", desc: "Visual guide to market trends", details: "Trendlines are diagonal lines drawn on a chart connecting significant price highs or lows, indicating the direction and strength of a trend. They act as visual guides for identifying potential support or resistance in trending markets." },
      { name: "Real vs Fake Breakouts", icon: "fas fa-exchange-alt", desc: "Detecting trap moves", details: "A breakout occurs when price moves beyond a significant support or resistance level. Distinguishing between real breakouts (sustained movement) and fake breakouts (price quickly reversing) is critical for avoiding false signals and trap moves orchestrated by larger players." },
      { name: "Candlestick Patterns", icon: "fas fa-chart-bar", desc: "Visual market patterns", details: "Candlestick patterns are visual representations of price movements over a specific period, forming distinct shapes that can signal potential future price direction. They provide insights into market sentiment and are widely used in technical analysis." },
      { name: "Mirror Market", icon: "fas fa-magic", desc: "Reflected price behavior", details: "The Mirror Market concept suggests that price action in one asset or timeframe can mirror similar patterns or reversals seen in another, often inversely. It implies a symmetrical relationship in market behavior." },
      { name: "Backtesting", icon: "fas fa-backward", desc: "Test trading logic", details: "Backtesting involves applying a trading strategy to historical data to determine its effectiveness and profitability. It's a crucial step in validating and refining trading algorithms before deploying them in live markets." },
      { name: "Technical Analysis", icon: "fas fa-chart-line", desc: "Stock pattern analysis", details: "Technical analysis is a trading discipline employed to evaluate investments and identify trading opportunities by analyzing statistical trends gathered from trading activity, such as price movement and volume. It relies on chart patterns, indicators, and historical data to predict future price action." },
      { name: "Liquidity Grab", icon: "fas fa-hand-holding-usd", desc: "Accumulation or liquidation of orders", details: "A Liquidity Grab, often seen as a 'stop hunt,' occurs when large market participants intentionally push price to an area with a high concentration of stop-loss orders. This action 'grabs' liquidity, allowing institutions to fill their large orders at favorable prices." },
      { name: "Fake Breakout", icon: "fas fa-exchange-alt", desc: "Price traps for retail traders", details: "A Fake Breakout is a price movement that initially appears to break a significant support or resistance level but quickly reverses, trapping traders who entered on the breakout. It's a common manipulation tactic used by smart money to induce retail traders into unfavorable positions." },
      { name: "Smart Money Concepts (SMC)", icon: "fas fa-briefcase", desc: "Market manipulation and institutional strategies", details: "Smart Money Concepts (SMC) is a trading methodology that focuses on understanding and tracking the actions of institutional or 'smart money' participants in the market. It assumes that these large players leave footprints that can be identified to anticipate future price movements and avoid 'retail traps'." },
      { name: "Net Volume", icon: "fas fa-chart-bar", desc: "Volume analysis for market sentiment", details: "Net Volume refers to the difference between buying and selling volume over a specific period. Analyzing net volume can provide insights into market sentiment, indicating whether buyers or sellers are dominating and confirming the strength of price movements." },
      { name: "CHoCH (Change of Character)", icon: "fas fa-random", desc: "Market behavior shift signal", details: "CHoCH (Change of Character) is a concept in Smart Money Concepts (SMC) indicating a shift in market structure or trend. It often signals a potential reversal or a change in the dominant market flow, prompting traders to re-evaluate their biases." },
      { name: "BOS (Break of Structure)", icon: "fas fa-bolt", desc: "Trend reversal or continuation signal", details: "BOS (Break of Structure) signifies that the market has continued its current trend by breaking a previous high (in an uptrend) or low (in a downtrend). It confirms the continuation of the trend, but in specific contexts, a break of internal structure can also signal a potential reversal." },
      { name: "Institutional Trading", icon: "fas fa-university", desc: "Trading strategies used by institutions", details: "Institutional Trading refers to the trading activities of large financial institutions like hedge funds, investment banks, and mutual funds. Their sheer volume of trades and sophisticated strategies often dictate market movements, and understanding their behavior is key for many advanced trading approaches." },
      { name: "Retail Traps & Stop Hunts", icon: "fas fa-lock", desc: "Exploiting retail trader positions", details: "Retail Traps and Stop Hunts are strategies employed by institutional traders to manipulate price, causing retail traders to enter unfavorable positions or trigger their stop-loss orders. This allows institutions to accumulate or distribute assets at better prices by exploiting the predictable behavior of retail traders." },
      { name: "Accumulative Distribution", icon: "fas fa-sync", desc: "Identifying accumulation vs distribution phases", details: "Accumulation and Distribution are phases in market cycles where smart money is either buying (accumulating) or selling (distributing) large quantities of an asset without significantly moving its price. Identifying these phases helps traders align with institutional flow." },
      { name: "Momentum Candle", icon: "fas fa-fire", desc: "Candles indicating strong market movement", details: "A Momentum Candle is a candlestick with a large body and small wicks, indicating strong buying or selling pressure and a significant price movement in a single direction. They often signal the continuation of a trend or a strong breakout." },
      { name: "Limit Orders vs Order Blocks", icon: "fas fa-limits", desc: "Difference in order flow", details: "Limit Orders are pending orders placed at a specific price, while Order Blocks are price zones where large institutional orders are believed to be clustered. Understanding the relationship helps in identifying where significant liquidity might be located." },
      { name: "Insider Demand", icon: "fas fa-user-secret", desc: "Orders by institutional players", details: "Insider Demand refers to the buying pressure generated by institutional or 'smart money' participants. This demand often originates from strategic accumulation at key price levels, reflecting their long-term conviction or tactical positioning." },
      { name: "Insider Supply", icon: "fas fa-user-secret", desc: "Supply zone controlled by institutions", details: "Insider Supply represents selling pressure from institutional players, often observed in specific price zones where they are distributing their holdings. Identifying these zones helps anticipate potential price reversals or resistance." },
      { name: "Outsider Demand", icon: "fas fa-users", desc: "Orders from retail traders", details: "Outsider Demand refers to the buying pressure primarily from retail traders. This demand can be less sophisticated and often reactive to market movements, making retail order flow a potential target for institutional manipulation." },
      { name: "Outsider Supply", icon: "fas fa-users", desc: "Supply zone controlled by retail traders", details: "Outsider Supply is the selling pressure originating mainly from retail traders. These supply zones can become targets for liquidity grabs as institutions might push price into these areas to trigger stop losses and fill their buy orders." },
      { name: "Curve Line Support", icon: "fas fa-sliders-h", desc: "Support line following a curved pattern", details: "A Curve Line Support is a dynamic support level that follows a curved or parabolic path, often indicating accelerating buying interest. It differs from traditional straight trendlines and can be observed in strong trending markets." },
      { name: "Curve Line Resistance", icon: "fas fa-sliders-h", desc: "Resistance line following a curved pattern", details: "A Curve Line Resistance is a dynamic resistance level that follows a curved or parabolic path, often indicating accelerating selling pressure. It signals increasing bearish momentum and can be a point of price reversal." },
      { name: "Market Manipulation", icon: "fas fa-puzzle-piece", desc: "Market distortion by large players", details: "Market Manipulation involves intentional actions by large, influential market participants to distort prices or create artificial activity. This can include tactics like spoofing, wash trading, or spreading false information to profit at the expense of less informed traders." },
      { name: "Smart Money vs Dumb Money", icon: "fas fa-cogs", desc: "Contrasting institutional and retail trading behavior", details: "This concept differentiates between 'Smart Money' (institutional traders with deep pockets and advanced strategies) and 'Dumb Money' (retail traders, often seen as reactive and prone to emotional decisions). Understanding this dynamic helps traders align with the more powerful market forces." },
      { name: "Insider Supply & Demand Zones", icon: "fas fa-cogs", desc: "Key levels controlled by institutions", details: "Insider Supply & Demand Zones are specific price areas on a chart where institutional activity (buying or selling) is evident. These zones are considered highly significant as they represent areas where large orders were executed, often leading to strong reactions when price revisits them." },
    ],
  },
  {
    category: "Personal & Creative",
    items: [
      { name: "Writing", icon: "fas fa-pencil-alt", desc: "Creative expression", details: "Writing is a powerful form of communication and creative expression. It involves articulating thoughts, ideas, and stories through written words, whether for technical documentation, creative prose, or persuasive arguments." },
      { name: "Research", icon: "fas fa-search", desc: "Knowledge discovery", details: "Research is the systematic investigation into and study of materials and sources in order to establish facts and reach new conclusions. It's crucial for problem-solving, innovation, and gaining a deeper understanding of various subjects." },
      { name: "Self-Help", icon: "fas fa-heart", desc: "Personal development", details: "Self-help encompasses resources and strategies aimed at improving one's personal life, mental well-being, and overall development. It involves learning and applying techniques to enhance self-awareness, productivity, and emotional intelligence." },
      { name: "Motivation", icon: "fas fa-lightbulb", desc: "Inspiring others", details: "Motivation is the psychological feature that arouses an organism to action toward a desired goal; the reason for the action. It's about driving oneself and inspiring others to achieve objectives, overcome challenges, and strive for continuous improvement." },
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
  const sectionRef = useRef<HTMLElement>(null); // Specify HTMLElement for useRef
  const isInView = useInView(sectionRef, { once: true });
  const controls = useAnimation();

  // Specify the type for selectedTech as TechnologyItem or null
  const [selectedTech, setSelectedTech] = useState<TechnologyItem | null>(null);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Explicitly type the 'tech' parameter
  const openModal = (tech: TechnologyItem) => {
    setSelectedTech(tech);
  };

  const closeModal = () => {
    setSelectedTech(null);
  };

  return (
    <section ref={sectionRef} className="pb-12">
      <div className="sticky top-0 z-20 bg-gradient-to-b from-[#1a1a1b] shadow-lg">
        <h2 className="sticky backdrop-blur-md top-0 z-10 text-center text-4xl md:-4xl font-extrabold mb-14 py-6">
          <span className="mr-2 text-purple-500">🍳</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-green-600 to-purple-400">
            Tech Stack & Tools
          </span>
        </h2>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {technologies.map((category: TechnologyCategory) => ( // Explicitly type category
          <div key={category.category} className="mb-10">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-purple-300 mb-4">{category.category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((tech: TechnologyItem, index: number) => ( // Explicitly type tech and index
                <motion.div
                  key={tech.name}
                  className="rounded-xl p-5 bg-[#232325] border border-gray-700 shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105 flex flex-col items-center cursor-pointer"
                  variants={cardVariants}
                  initial="hidden"
                  animate={controls}
                  custom={index * 0.05} // Stagger within each category
                  onClick={() => openModal(tech)}
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

      {selectedTech && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="relative bg-[#232325] rounded-xl p-8 max-w-lg w-full border border-gray-700 shadow-xl"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl font-bold"
            >
              &times;
            </button>
            <div className="flex flex-col items-center mb-4">
              <i className={`${selectedTech.icon} text-5xl text-green-400 mb-3`} />
              <h3 className="text-white font-bold text-2xl text-center">{selectedTech.name}</h3>
            </div>
            <p className="text-gray-300 text-base text-center">{selectedTech.details}</p>
          </motion.div>
        </div>
      )}
    </section>
  );
}