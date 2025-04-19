import React from "react";

const education = [
  {
    school: "Visvesvaraya Technological University",
    degree: "Bachelor's in Computer Science & Engineering",
    year: "2019-2023"
  },
  {
    school: "St. Anne's Mission School",
    degree: "Senior Secondary, Science",
    year: "2016-2018"
  }
];

export default function EducationSection() {
  return (
    <section className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-white">Education</h2>
      <ul className="space-y-4">
        {education.map((ed) => (
          <li key={ed.school+ed.year} className="p-4 bg-[#232325] border border-gray-700 rounded-md">
            <h3 className="font-semibold text-lg text-white">{ed.school}</h3>
            <div className="text-gray-400">{ed.degree}</div>
            <div className="text-gray-500 text-sm">{ed.year}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
