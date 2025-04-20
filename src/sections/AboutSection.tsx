import React from "react";

export default function AboutSection() {
  return (
    <section className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-2 text-foreground">About Me</h2>
      <p className="text-foreground/80">
        Hi! I'm Prabhat Kumar, a passionate developer fascinated by AI, web technologies, and building software that solves real-world problems. I love working with Java, Spring Boot, React, and machine learning.
      </p>
      <ul className="mt-4 space-y-1 text-foreground/70">
        <li><strong>Email:</strong> mailtopeabhat72@gmail.com</li>
        <li><strong>Location:</strong> India</li>
        <li><strong>Interests:</strong> AI, Full Stack Development, Open Source, Problem Solving, Trading</li>
      </ul>
    </section>
  );
}
