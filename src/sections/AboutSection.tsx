import React from "react";

export default function AboutSection() {
  return (
    <section className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-2 text-white">About Me</h2>
      <p className="text-gray-300">
        Hi! I'm Prabhat Kumar, a passionate developer fascinated by AI, web technologies, and building software that solves real-world problems. I love working with Java, Spring Boot, React, and machine learning.
      </p>
      <ul className="mt-4 space-y-1 text-gray-400">
        <li><strong>Email:</strong> prabhatkumarv@gmail.com</li>
        <li><strong>Location:</strong> India</li>
        <li><strong>Interests:</strong> AI, Full Stack Development, Open Source, Problem Solving</li>
      </ul>
    </section>
  );
}
