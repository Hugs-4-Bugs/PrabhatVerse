import React from "react";

const techs = [
  { name: "React", icon: "fab fa-react", desc: "Modern frontend framework" },
  { name: "Spring Boot", icon: "fas fa-leaf", desc: "Java backend framework" },
  { name: "Tailwind CSS", icon: "fas fa-wind", desc: "Utility-first CSS" },
  { name: "MySQL", icon: "fas fa-database", desc: "Relational DBMS" },
  { name: "Framer Motion", icon: "fas fa-bolt", desc: "Animations for React" }
];

export default function TechnologySection() {
  return (
    <section className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-white">Tech Stack & Tools</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {techs.map(t => (
          <div key={t.name} className="rounded p-4 bg-[#232325] flex flex-col items-center border border-gray-700">
            <i className={`${t.icon} text-2xl text-green-400 mb-2`} />
            <span className="text-white font-semibold">{t.name}</span>
            <span className="text-gray-400 text-xs text-center">{t.desc}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
