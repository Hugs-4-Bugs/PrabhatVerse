import React from "react";

const TopBar = ({ onProfileClick, isGridOpen, onTerminalClick, onVoiceAssistantClick, theme, setTheme }: {
  onProfileClick: () => void;
  isGridOpen: boolean;
  onTerminalClick: () => void;
  onVoiceAssistantClick: () => void;
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
}) => {
  return (
    <header className="flex items-center justify-between h-14 w-full px-4 bg-[#343541] border-b border-gray-800 shadow-none relative z-10">
      <div />
      <div className="flex items-center gap-3">
        <button
          aria-label="Open Voice Assistant"
          className="w-9 h-9 rounded-full flex items-center justify-center bg-[#232325] hover:bg-green-900 text-gray-200 hover:text-green-400"
          onClick={onVoiceAssistantClick}
        >
          <i className="fa-solid fa-microphone" />
        </button>
        <button
          aria-label="Open Terminal"
          className="w-9 h-9 rounded-full flex items-center justify-center bg-[#232325] hover:bg-zinc-900 text-gray-200 hover:text-green-400"
          onClick={onTerminalClick}
          style={{fontSize: 20, padding: 0 }}
        >
          <i className="fa-solid fa-terminal" />
        </button>
        <button
          aria-label="Toggle light/dark mode"
          className="w-9 h-9 rounded-full bg-[#232325] flex items-center justify-center hover:bg-zinc-700 text-gray-300"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark'
            ? <i className="fa fa-sun text-xl text-yellow-400" />
            : <i className="fa fa-moon text-xl text-gray-800" />
          }
        </button>
        <button
          aria-label="Show Social Links"
          className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border-2 border-[#202123] bg-gray-700 transition ${isGridOpen ? "ring-2 ring-green-500" : "hover:ring-2 hover:ring-gray-400"}`}
          onClick={onProfileClick}
        >
          <img
            src="/assets/profile.jpg"
            alt="Profile"
            className="w-9 h-9 object-cover rounded-full bg-gray-500"
            onError={e => (e.currentTarget.src = "https://same-assets.com/ai-avatar.png")}
          />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
