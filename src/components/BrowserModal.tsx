import { useEffect, useRef } from "react";

interface BrowserModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BrowserModal({ open, onClose }: BrowserModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
  
    // Remove old CSE script
    const prevScript = document.querySelector("script[src*='cse.google.com']");
    if (prevScript) prevScript.remove();
  
    // Inject new CSE script
    const script = document.createElement("script");
    script.src = "https://cse.google.com/cse.js?cx=239bbab29c8ae43e3";
    script.async = true;
    containerRef.current?.appendChild(script);
  
    // Inject styling & control links after CSE loads
    setTimeout(() => {
      // Inject dark mode styling
      const style = document.createElement("style");
      style.textContent = `
        /* Search Container */
        .gsc-control-cse {
          background-color: #1a1a1a !important;
          color: white !important;
          border-radius: 10px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
          padding: 16px;
        }
  
        /* Search Input Box */
        .gsc-input-box {
          background-color: #1a1a1a !important;
          border: 1px solid #444 !important;
          border-radius: 6px !important;
        }
  
        input.gsc-input {
          background-color: #1a1a1a !important;
          color: white !important;
          border: none !important;
          font-size: 15px !important;
        }
  
        input.gsc-input::placeholder {
          color: #888 !important;
        }
  
        /* Search Results */
        .gsc-webResult.gsc-result {
          background-color: #111 !important;
          color: #eaeaea !important;
          border-bottom: 1px solid #333 !important;
          padding: 12px !important;
          border-radius: 6px !important;
        }
  
        .gsc-webResult.gsc-result:hover {
          background-color: #1f1f1f !important;
        }
  
        /* Result Links */
        .gs-title, .gs-title * {
          color: #4ea8ff !important;
        }
  
        .gs-snippet {
          color: #ccc !important;
        }
  
        /* Suggestions Dropdown */
        .gsc-completion-container {
          background-color: #222 !important;
          color: white !important;
          border-radius: 6px !important;
        }
  
        .gsc-completion-title {
          color: #ffffff !important;
        }
  
        .gsc-completion-snippet {
          color: #b0b8c1 !important;
        }
  
        /* Pagination */
        .gsc-results .gsc-cursor-box {
          background-color: #1a1a1a !important;
          color: white !important;
        }
  
        .gsc-cursor-page {
          background-color: #2a2a2a !important;
          color: white !important;
          border-radius: 4px;
          padding: 4px 8px;
        }
  
        .gsc-cursor-page.gsc-cursor-current-page {
          background-color: #4a90e2 !important;
          color: white !important;
        }
  
        /* Scrollbar for results */
        .gsc-results::-webkit-scrollbar {
          width: 8px;
        }
        .gsc-results::-webkit-scrollbar-track {
          background: #1a1a1a;
        }
        .gsc-results::-webkit-scrollbar-thumb {
          background: #555;
          border-radius: 4px;
        }
      `;
      document.head.appendChild(style);

    // Hijack link behavior to open inside iframe
    const interval = setInterval(() => {
      const anchors = document.querySelectorAll(".gsc-webResult a");
      anchors.forEach((a) => {
        a.removeAttribute("target"); // remove _blank or _parent
        a.addEventListener("click", (e) => {
          e.preventDefault();
          const href = (e.currentTarget as HTMLAnchorElement).href;

          const iframeContainer = document.getElementById("search-result-iframe");
          if (iframeContainer) {
            iframeContainer.innerHTML = `<iframe src="${href}" class="w-full h-full rounded-md border-none" />`;
          }
        });
      });
    }, 500);

    setTimeout(() => clearInterval(interval), 10000);
  }, 2000);
}, [open]);
  
  
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl h-[80vh] bg-[#111] rounded-lg flex flex-col shadow-xl border border-neutral-700 overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2 border-b border-neutral-700 text-white bg-[#1e1e1e]">
          <div className="text-sm font-semibold">Custom Google Search</div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-red-500/10 flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Google Search Area */}
        <div className="flex-1 overflow-auto p-4 bg-[#111] text-white" ref={containerRef}>
          <div className="gcse-search"></div>
        </div>
      </div>
    </div>
  );
}
