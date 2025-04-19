import React from "react";

const services = [
  {
    title: "Web Application Development",
    desc: "End-to-end responsive and performant modern web apps."
  },
  {
    title: "API Design & Integration",
    desc: "RESTful APIs and backend microservices for your apps."
  },
  {
    title: "AI/ML Implementation",
    desc: "Machine learning models integrated into practical applications."
  },
  {
    title: "UI/UX Design",
    desc: "Beautiful, intuitive, and modern user experiences."
  }
];

export default function ServicesSection() {
  return (
    <section className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-white">Services</h2>
      <div className="flex flex-col gap-6">
        {services.map((s) => (
          <div key={s.title} className="rounded-md bg-[#232325] p-4 shadow border border-gray-700">
            <h3 className="font-semibold text-lg text-white mb-1">{s.title}</h3>
            <p className="text-gray-300">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
