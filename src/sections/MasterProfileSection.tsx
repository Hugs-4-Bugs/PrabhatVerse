import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function MasterProfileSection() {
  const [md, setMd] = useState("");
  useEffect(() => {
    fetch("/src/data/master_profile.md").then(res => res.text()).then(setMd);
  }, []);
  return (
    <div className="max-w-2xl mx-auto mt-10 bg-[#232325] p-6 rounded shadow border border-gray-700 text-gray-200 min-h-[200px] max-h-[70vh] overflow-auto">
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown>{md}</ReactMarkdown>
      </div>
      <div className="mt-4 text-gray-400 text-xs">Edit <code>src/data/master_profile.md</code> to update all about you here!</div>
    </div>
  );
}
