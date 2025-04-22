// import React from "react";

// const education = [
//   {
//     school: "Visvesvaraya Technological University",
//     degree: "Bachelor's in Computer Science & Engineering",
//     year: "2019-2023"
//   },
//   {
//     school: "St. Anne's Mission School",
//     degree: "Senior Secondary, Science",
//     year: "2016-2018"
//   }
// ];

// export default function EducationSection() {
//   return (
//     <section className="max-w-2xl mx-auto mt-10">
//       <h2 className="text-2xl font-bold mb-6 text-white">Education</h2>
//       <ul className="space-y-4">
//         {education.map((ed) => (
//           <li key={ed.school+ed.year} className="p-4 bg-[#232325] border border-gray-700 rounded-md">
//             <h3 className="font-semibold text-lg text-white">{ed.school}</h3>
//             <div className="text-gray-400">{ed.degree}</div>
//             <div className="text-gray-500 text-sm">{ed.year}</div>
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// }
















import React from "react";
import { motion } from "framer-motion";

const education = [
  {
    school: "Visvesvaraya Technological University",
    degree: "Bachelor of Engineering, Computer Science",
    year: "2019-2023",
    level: "bachelor"
  },
  {
    school: "Ram Dulari Ganga Ucha Vidyalaya",
    degree: "Pre-University Course",
    year: "2016-2018",
    level: "pre-university"
  },
  {
    school: "St. Anne's Mission School",
    degree: "Secondary School",
    year: "2016",
    level: "secondary"
  }
];

export default function EducationSection() {
  return (
    <section className="max-w-2xl mx-auto mt-10">
      <h2 className="text-center text-4xl md:text-4xl font-extrabold mb-14 mt-0">
  <span className="mr-2">🧑🏻‍🎓</span>
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-800 to-white">
    My Educational Journey
  </span>
</h2>

      <div className="flex flex-col items-center gap-10">
        {education.map((ed, index) => (
          <motion.div
          key={ed.school + ed.year}
          initial={{
            x: index === 0 ? "-100vw" : index === 1 ? "100vw" : "100vw", // Top: Left, Middle: Right, Bottom: Right
            opacity: 0
          }}
          animate={{
            x: 0,
            opacity: 1
          }}
          whileHover={{ scale: 1.1 }}
          transition={{
            type: "keyframes",          // Smooth constant motion
            ease: "easeInOut",
            duration: 0.2          // Slower animation
          }}
          className={`${
            ed.level === "bachelor"
              ? "h-[170px] w-[820px]" // Large for Bachelor
              : ed.level === "pre-university"
              ? "h-[150px] w-[700px]" // Medium for Pre-University
              : "h-[130px] w-[580px]" // Small for Secondary
          } bg-[#232325]/80 border border-gray-700 backdrop-blur-md rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.3)] relative overflow-hidden group cursor-pointer transition-all duration-300`}
        >
        
            <div className="absolute inset-0 z-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur-xl bg-gradient-to-br from-[#ffffff0d] via-[#ffffff0a] to-[#ffffff0d]" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition duration-300">
                {ed.school}
              </h3>
              <div className="text-gray-300 group-hover:text-gray-100 transition duration-300">
                {ed.degree}
              </div>
              <div className="text-gray-500 text-sm group-hover:text-gray-300 transition duration-300">
                {ed.year}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
