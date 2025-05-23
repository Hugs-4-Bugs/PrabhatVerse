import React, { useEffect, useState } from "react";

const Sidebar = ({ activeSection, setActiveSection, collapsed, setCollapsed, theme }: {
  activeSection: string;
  setActiveSection: (s: string) => void;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  theme: "light" | "dark";
}) => {
  const [sections, setSections] = useState<string[]>([]);

  useEffect(() => {
    fetch("/sections.json")
      .then(response => response.json())
      .then(data => {
        setSections(data);
      })
      .catch(error => {
        console.error("Error loading sections:", error);
      });
  }, []);

  // Toggle function - toggles between expanded and collapsed states
  function toggleSidebar() {
    console.log(`Toggling sidebar from ${collapsed ? "collapsed" : "expanded"} to ${collapsed ? "expanded" : "collapsed"}`);
    setCollapsed(!collapsed);
  }

  // When collapsed, show only the icons and toggle button
  if (collapsed) {
    return (
      <aside className="fixed z-40 h-screen w-12 bg-sidebar transition-all duration-300 border-r border-sidebar-border flex flex-col shrink-0">
        <div className="py-3 flex justify-center">
          <button
            id="toggle-sidebar-btn"
            onClick={toggleSidebar}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-sidebar-accent text-sidebar-foreground"
            title="Expand sidebar"
          >
            <i className="fa fa-chevron-right text-sm" />
          </button>
        </div>
        <nav className="flex-1 flex flex-col items-center gap-4 mt-4">
          {sections.slice(0, 6).map((section, index) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-150
                ${activeSection === section
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"}`}
              title={section}
            >
              <i className={`fa fa-${getIconForSection(section, index)}`} />
            </button>
          ))}
        </nav>
      </aside>
    );
  }

  // When expanded, show full sidebar with section names and toggle button
  return (
    <aside className="fixed z-40 h-screen w-56 bg-sidebar text-sidebar-foreground border-r border-sidebar-border p-3 transition-all duration-300 flex flex-col shrink-0">
      <div className="flex items-center justify-between mb-3 mt-1 px-2">
        <span className="text-lg font-bold text-sidebar-primary">Prabhat Kumar</span>
        <button
          id="toggle-sidebar-btn"
          onClick={toggleSidebar}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-sidebar-accent"
          title="Collapse sidebar"
        >
          <i className="fa fa-chevron-left text-sm" />
        </button>
      </div>
      <nav className="flex-1 flex flex-col gap-1.5 mt-2 overflow-y-auto">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`flex items-center px-3 py-2 rounded-md transition-colors duration-150 text-sm font-medium hover:bg-sidebar-accent ${
              activeSection === section
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground"
            }`}
          >
            {section}
          </button>
        ))}
      </nav>
    </aside>
  );
}

// Helper function to get icon for section in collapsed mode
function getIconForSection(section: string, index: number): string {
  const iconMap: Record<string, string> = {
    Home: "home",
    About: "user",
    Projects: "briefcase",
    Skills: "code",
    Services: "cogs",
    Education: "graduation-cap",
    Technology: "laptop-code",
    Blogs: "rss",
    Contact: "envelope",
    Resume: "file-alt",
  };

  return iconMap[section] || `circle-${index + 1}`;
}

export default Sidebar;
