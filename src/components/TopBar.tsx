import React from "react";

const TopBar = ({
  onProfileClick,
  isGridOpen,
  onTerminalClick,
  onVoiceAssistantClick,
  onBrowserClick,
  theme,
  setTheme,
  onReset
}: {
  onProfileClick: () => void;
  isGridOpen: boolean;
  onTerminalClick: () => void;
  onVoiceAssistantClick: () => void;
  onBrowserClick: () => void;
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
  onReset?: () => void;
}) => {
  // Reset function for debugging
  const handleReset = () => {
    if (onReset) {
      if (window.confirm("Reset all settings? This will clear localStorage and refresh the page.")) {
        onReset();
      }
    }
  };

  return (
    <header className="flex items-center justify-between h-14 w-full px-4 bg-card border-b border-border shadow-sm relative z-10">
      {/* Left side - Empty div for flex layout */}
      <div className="flex-1">
        {onReset && (
          <button
            onClick={handleReset}
            aria-label="Reset All"
            className="text-xs opacity-30 hover:opacity-100"
            title="Reset all settings (debug)"
          >
            Reset
          </button>
        )}
      </div>

      {/* Center - App title */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-foreground font-semibold text-xl sm:text-2xl tracking-wide">
        <span>PrabhatVerse</span>
      </div>

      {/* Right side - Controls */}
      <div className="flex items-center gap-3 flex-1 justify-end">
        <button
          aria-label="Open Voice Assistant"
          className="w-9 h-9 rounded-full flex items-center justify-center bg-muted hover:bg-muted/80 text-foreground hover:text-green-500 transition-colors"
          onClick={onVoiceAssistantClick}
        >
          <i className="fa-solid fa-microphone" />
        </button>
        <button
          aria-label="Open Browser"
          className="w-9 h-9 rounded-full flex items-center justify-center bg-muted hover:bg-muted/80 text-foreground hover:text-blue-500 transition-colors"
          onClick={onBrowserClick}
        >
          <i className="fa-solid fa-globe" />
        </button>
        <button
          aria-label="Open Terminal"
          className="w-9 h-9 rounded-full flex items-center justify-center bg-muted hover:bg-muted/80 text-foreground hover:text-green-500 transition-colors"
          onClick={onTerminalClick}
          style={{fontSize: 18, padding: 0 }}
        >
          <i className="fa-solid fa-terminal" />
        </button>
        <button
          aria-label="Toggle light/dark mode"
          className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 text-foreground transition-colors"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark'
            ? <i className="fa fa-sun text-xl text-yellow-400" />
            : <i className="fa fa-moon text-xl text-blue-600" />
          }
        </button>
        <button
          aria-label="Show Social Links"
          className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border-2 ${isGridOpen ? "ring-2 ring-primary border-transparent" : "border-border hover:ring-2 hover:ring-primary/30"}`}
          onClick={onProfileClick}
        >
          <img
            src="/assets/profile.jpg"
            alt="Profile"
            className="w-9 h-9 object-cover rounded-full bg-muted"
            onError={e => (e.currentTarget.src = "https://same-assets.com/ai-avatar.png")}
          />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
