import React, { useState } from "react";
const skills = {
  Frontend: ["React", "HTML", "CSS", "Tailwind", "AngularJS"],
  Backend: ["Spring Boot", "Node.js", "REST API", "Java"],
  Design: ["Figma", "Adobe XD", "UI/UX"],
  Database: ["MySQL", "MongoDB", "PostgreSQL"],
  DevOps: ["Git", "Docker", "Jenkins"],
  Other: ["Machine Learning", "AppleScript"]
};

type OpenState = { [key: string]: boolean };

export default function SkillsSection() {
  const [open, setOpen] = useState<OpenState>({});
  return (
    <section className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-white">Skills</h2>
      <div className="space-y-3">
        {Object.entries(skills).map(([cat, list]) => (
          <div key={cat} className="bg-[#232325] rounded border border-gray-700">
            <button onClick={() => setOpen(o => ({ ...o, [cat]: !o[cat] }))} className="w-full flex justify-between p-3 text-left text-white font-medium">
              <span>{cat}</span>
              <span>{open[cat] ? "-" : "+"}</span>
            </button>
            {open[cat] && (
              <ul className="pl-6 pb-3">
                {list.map((sk: string) => <li key={sk} className="text-gray-300 py-1">{sk}</li>)}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
