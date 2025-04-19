import React, { useState } from "react";

type Blog = {
  title: string;
  content: string;
};
type BlogCategory = {
  category: string;
  blogs: Blog[];
};

const blogs: BlogCategory[] = [
  {
    category: "Tech",
    blogs: [
      { title: "Understanding React", content: "A beginner's intro to React and its component model." },
      { title: "Machine Learning 101", content: "An overview of common ML concepts with real-world uses." }
    ]
  },
  {
    category: "Career",
    blogs: [
      { title: "Landing Your First Dev Job", content: "Tips and tricks for kickstarting your developer career." }
    ]
  },
  {
    category: "Open Source",
    blogs: [
      { title: "Contributing on GitHub", content: "How to find and contribute to open source projects." }
    ]
  }
];

export default function BlogsSection() {
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [activeBlog, setActiveBlog] = useState<Blog | null>(null);
  return (
    <section className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-white">Blogs</h2>
      <div className="flex gap-6">
        <aside className="w-40 bg-[#222328] rounded p-2 border border-gray-700">
          <h3 className="mb-2 font-semibold text-gray-200 text-sm">Categories</h3>
          <ul>
            {blogs.map(c => (
              <li key={c.category}>
                <button onClick={() => { setActiveCat(c.category); setActiveBlog(null); }} className={`text-left w-full px-2 py-1 rounded mb-1 ${activeCat === c.category ? "bg-green-700 text-white" : "text-gray-200 hover:bg-green-900"}`}>{c.category}</button>
              </li>
            ))}
          </ul>
        </aside>
        <div className="flex-1">
          {!activeCat && <div className="text-gray-400">Select a category to view blogs.</div>}
          {activeCat && !activeBlog && (
            <ul className="space-y-2">
              {blogs.find(b => b.category === activeCat)?.blogs.map((b) => (
                <li key={b.title}>
                  <button className="block w-full text-left p-2 rounded bg-[#232325] border border-gray-700 text-gray-200 hover:bg-green-900" onClick={() => setActiveBlog(b)}>{b.title}</button>
                </li>
              ))}
            </ul>
          )}
          {activeBlog && (
            <div className="mt-4 bg-[#232325] border border-gray-700 rounded p-4">
              <div className="font-bold text-lg text-white mb-2">{activeBlog.title}</div>
              <div className="text-gray-300 text-sm whitespace-pre-line">{activeBlog.content}</div>
              <button className="mt-4 bg-green-700 text-white rounded px-3 py-1" onClick={() => setActiveBlog(null)}>Back to Blogs</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
