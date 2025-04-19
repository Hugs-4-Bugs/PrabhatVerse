import React, { useEffect, useState } from "react";

const Sidebar = ({ activeSection, setActiveSection, collapsed, setCollapsed }: {
  activeSection: string;
  setActiveSection: (s: string) => void;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) => {
  const [sections, setSections] = useState<string[]>([]);

  useEffect(() => {
    fetch("/src/data/sections.json").then(r => r.json()).then(setSections);
  }, []);

  if (collapsed) {
    return (
      <aside className="fixed lg:relative z-40 flex flex-col w-12 min-h-screen bg-[#202123] border-r border-gray-800 items-center justify-start py-2 transition-all duration-200">
        <button onClick={()=>setCollapsed(false)} className="w-8 h-8 flex items-center justify-center rounded hover:bg-zinc-800 mt-3" title="Expand sidebar">
          <i className="fa fa-chevron-right text-xl text-gray-200" />
        </button>
      </aside>
    );
  }

  return (
    <aside className="fixed lg:relative z-40 flex flex-col w-56 bg-[#202123] text-gray-100 border-r border-gray-800 min-h-screen p-3 transition-all duration-200">
      <div className="flex items-center justify-between mb-1 mt-1 px-2">
        <span className="text-lg font-bold">Prabhat Kumar</span>
        <button onClick={()=>setCollapsed(true)} className="w-8 h-8 flex items-center justify-center rounded hover:bg-zinc-800" title="Collapse sidebar">
          <i className="fa fa-chevron-left text-lg text-gray-300" />
        </button>
      </div>
      <nav className="flex-1 flex flex-col gap-2 mt-2">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`flex items-center px-3 py-2 rounded transition-colors duration-150 text-sm font-medium hover:bg-[#343541] ${activeSection === section ? "bg-[#343541]" : ""}`}
          >
            {section}
          </button>
        ))}
      </nav>
    </aside>
  );
};


export default Sidebar;
