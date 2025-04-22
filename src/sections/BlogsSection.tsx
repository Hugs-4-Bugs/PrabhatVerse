import React, { useState, useEffect } from "react";

// Types
interface BlogLink {
  title: string;
  link: string;
  isPaid?: boolean; // Added optional isPaid property
}

interface BlogCategory {
  category: string;
  blogs: BlogLink[];
}

interface CategoryGroup {
  label: string;
  categories: BlogCategory[];
}

const allBlogs: CategoryGroup[] = [
  {
    label: "Technical",
    categories: [
      {
        category: "Java",
        blogs: [
          { title: "Core Java", link: "https://example.com/core-java" },
          { title: "Java 8", link: "https://example.com/java-8" },
          { title: "Collections", link: "https://www.geeksforgeeks.org/collections-in-java-2/" },
          { title: "Design Pattern", link: "https://www.geeksforgeeks.org/software-design-patterns/", isPaid: true }, // Example of a paid blog
        ],
      },
      {
        category: "ML",
        blogs: [
          { title: "AI", link: "https://example.com/ai" },
          { title: "Reinforcement Learning", link: "https://example.com/reinforcement-learning" },
        ],
      },
      {
        category: "Python",
        blogs: [
          { title: "Django", link: "https://example.com/django" },
          { title: "Flask", link: "https://example.com/flask" },
        ],
      },
      {
        category: "Career",
        blogs: [
          { title: "Landing Your First Dev Job", link: "https://example.com/landing-your-first-dev-job" },
        ],
      },
      {
        category: "Open Source",
        blogs: [
          { title: "Contributing on GitHub", link: "https://example.com/contributing-on-github" },
        ],
      },
    ],
  },
  {
    label: "Non-Technical",
    categories: [
      {
        category: "Writing",
        blogs: [
          { title: "Self-Improvement", link: "https://example.com/self-improvement" },
          { title: "Deep Thinking", link: "https://example.com/deep-thinking", isPaid: true }, // Example of a paid blog
        ],
      },
      {
        category: "Research",
        blogs: [
          { title: "AI Innovations", link: "https://example.com/ai-innovations" },
          { title: "Trading Strategies", link: "https://example.com/trading-strategies" },
        ],
      },
    ],
  },
  {
    label: "Books",
    categories: [
      {
        category: "Trading",
        blogs: [
          { title: "Market Psychology", link: "https://example.com/market-psychology-book" },
          { title: "Stock Market Strategies", link: "https://example.com/stock-market-strategies-book" },
        ],
      },
      {
        category: "Personal Growth",
        blogs: [
          { title: "Atomic Habits", link: "https://example.com/atomic-habits" },
          { title: "The Power of Now", link: "https://example.com/the-power-of-now", isPaid: true }, // Example of a paid blog
        ],
      },
    ],
  },
];

export default function BlogsSection() {
  const [activeGroup, setActiveGroup] = useState<CategoryGroup | null>(null);
  const [activeCat, setActiveCat] = useState<BlogCategory | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null); // State to track expanded parent category

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to handle parent category click
  const handleGroupClick = (group: CategoryGroup) => {
    if (expandedGroup === group.label) {
      setExpandedGroup(null); // Collapse if already expanded
      setActiveCat(null); // Reset active subcategory
    } else {
      setExpandedGroup(group.label); // Expand the clicked group
      setActiveCat(null); // Reset active subcategory
      // If it's mobile, open the sidebar
      if (isMobile) {
        setSidebarOpen(true);
      }
    }
  };

  const categoryFontStyle = {
    fontFamily: "'Caveat', 'Patrick Hand', 'Shadows Into Light', cursive",
  };

  const subCategoryFontStyle = {
    fontFamily: "sans-serif", // You can choose a different font for subcategories if desired
  };

  return (
    <div className="min-h-screen"> {/* Main background - Fixed light mode background */}
      {/* Sticky Header */}
      <header className="sticky top-5 z-50 bg-[#1A1A1A] bg-opacity-45 backdrop-blur-md text-center font-extrabold py-4">
        <h2 className="text-4xl font-extrabold">
          <span className="mr-2 text-teal-600 dark:text-teal-400">📝</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F172A] via-[#0D9488] to-[#0F172A] dark:from-gray-300 dark:via-teal-500 dark:to-gray-300">
            Explore Our Premium Resources
          </span>
        </h2>
      </header>
      <section className="w-full px-4 sm:px-6 lg:px-20 xl:px-32 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Toggle for Mobile */}
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mb-4 inline-block w-max self-start px-4 py-2 bg-teal-600 text-white rounded-md shadow hover:bg-teal-700 transition"
            >
              {sidebarOpen ? "Hide Categories" : "Show Categories"}
            </button>
          )}

          {/* Sidebar */}
          {(!isMobile || sidebarOpen) && (
            // category/subcategory container length and more left shift
            <aside className="lg:w-1/4 lg:-ml-12">
              {/* 👉 CHANGE text-lg TO text-xl to increase size as large and, md:text-xl to increase size as medium */}
              <h3 className="mb-3 font-semibold text-gray-800 dark:text-gray-400 text-xl uppercase tracking-wide" 
              style={categoryFontStyle}> {/* Fixed light mode text color */}
                Categories
              </h3>
              <div className="w-24 border-b-2 border-gray-400 dark:border-gray-600" /> {/* Simple underline */}
              <ul className="space-y-2 mt-4">
                {allBlogs.map(group => (
                  <li key={group.label}>
                    {/* Parent Category (Level 1) - Distinct styling */}
                    <button
                      onClick={() => handleGroupClick(group)}
                      /* 👉 CHANGE text-lg TO text-xl to increase size as large and, md:text-xl to increase size as medium */
                      className={`w-full text-left px-3 py-2 rounded-md font-semibold transition text-lg ${
                        expandedGroup === group.label
                          ? "bg-gray-200 text-teal-600 shadow-sm dark:bg-gray-700 dark:text-teal-300" /* Fixed light mode active background and text */
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800" /* Fixed light mode text color */
                      }`}
                      style={categoryFontStyle} // Apply the cursive font style
                    >
                      {group.label}
                    </button>
                    {/* Subcategories (Level 2) - displayed only if the parent is expanded */}
                    {expandedGroup === group.label && (
                      <ul className="mt-2 ml-12 space-y-1">
                        {group.categories.map(c => (
                          <button
                            key={c.category}
                            onClick={() => {
                              setActiveGroup(group);
                              setActiveCat(c);
                              if (isMobile) setSidebarOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-md font-medium transition text-base ${
                              activeCat?.category === c.category
                                ? "bg-teal-600 text-white shadow-md dark:bg-teal-700" /* Fixed light mode active background */
                                : "text-gray-700 dark:text-gray-300 hover:bg-teal-100 dark:hover:bg-teal-900" /* Fixed light mode text color */
                            }`}
                            style={subCategoryFontStyle} // Apply the sans-serif font style (can be changed)
                          >
                            {c.category}
                          </button>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {!activeCat && (
              <div className="text-gray-700 dark:text-gray-400 text-center mt-10"> {/* Fixed light mode text color */}
                Select a category to view its content.
              </div>
            )}

            {activeCat && (
              <div className="max-w-xl mx-auto"> {/* Customizable container size */}
                <h3 className="mb-4 font-semibold text-gray-800 dark:text-gray-300 text-xl" 
                style={categoryFontStyle}> {/* Fixed light mode text color */}
                  {activeGroup?.label} - {activeCat.category} Resources
                </h3>
                <ul className="grid grid-cols-1 gap-6">
                  {activeCat.blogs.map(blog => (
                    <li key={blog.title}>
                      <div className="bg-gray-100 dark:bg-[#1e1e1e] rounded-2xl p-5 shadow hover:shadow-xl transition-all duration-300 flex items-center justify-between"> {/* Fixed light mode background */}
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1" style={subCategoryFontStyle}> {/* Fixed light mode text color */}
                            {blog.title}
                            {/* Paid tag */}
                            {blog.isPaid && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200" style={subCategoryFontStyle}>
                                Paid
                              </span>
                            )}
                          </h4>
                        </div>
                        <a
                          href={blog.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 dark:text-teal-300 hover:underline font-medium text-sm"
                          style={subCategoryFontStyle}
                        >
                          Visit →
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}