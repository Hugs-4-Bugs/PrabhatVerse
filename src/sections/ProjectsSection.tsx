import React, { useState } from "react";

const allProjects = [
  { title: "Cryptocurrency Price Prediction", category: "AI", desc: "ML model to forecast crypto prices using historical data." },
  { title: "REST API CRUD Operation", category: "Web", desc: "Java Spring Boot app for full CRUD via REST endpoints." },
  { title: "Flight Reservation", category: "E-commerce", desc: "Airline booking system with user auth, search, and payment." },
  { title: "Blog Application", category: "Web", desc: "Spring Boot blogging app with authentication and CRUD posts." },
  { title: "GitHub Streak Back", category: "API", desc: "Node.js tool to automate restoring missed GitHub contributions." }
];
const categories = ["All", "AI", "Web", "E-commerce", "API"];

export default function ProjectsSection() {
  const [filter, setFilter] = useState("All");
  const shown = allProjects.filter(p => filter === "All" || p.category === filter);
  return (
    <section className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-white">Projects</h2>
      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map(cat => (
          <button key={cat} onClick={()=>setFilter(cat)} className={`px-3 py-1 rounded text-sm font-medium border transition ${filter === cat ? "bg-green-600 text-white border-green-700" : "bg-[#222328] text-gray-300 border-gray-600 hover:bg-green-700 hover:text-white"}`}>
            {cat}
          </button>
        ))}
      </div>
      <div className="grid gap-4">
        {shown.map(pr => (
          <div key={pr.title} className="p-4 rounded bg-[#232325] border border-gray-700">
            <div className="font-semibold text-white">{pr.title}</div>
            <div className="text-sm text-gray-400 mb-1">Category: {pr.category}</div>
            <div className="text-gray-300 text-sm">{pr.desc}</div>
          </div>
        ))}
        {shown.length === 0 && <div className="text-gray-500 py-8 text-center">No projects to show.</div>}
      </div>
    </section>
  );
}
