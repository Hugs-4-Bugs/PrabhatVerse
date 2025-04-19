import type React from "react";
import { useEffect, useRef, useState } from "react";

const COMMANDS = [
  { cmd: "about", desc: "Show the about/summary" },
  { cmd: "cd projects", desc: "List all major projects" },
  { cmd: "ls skills", desc: "List all skills" },
  { cmd: "tech stack", desc: "Show core technologies used" },
  { cmd: "cd experience", desc: "Display work experience" },
  { cmd: "cd education", desc: "Show educational background" },
  { cmd: "cd services", desc: "List provided services" },
  { cmd: "cd certifications", desc: "View all certifications" },
  { cmd: "cd trading", desc: "Show advanced trading concepts" },
  { cmd: "cd ai-tools", desc: "List custom AI tools & innovations" },
  { cmd: "cd blogs", desc: "Open blog categories & subcategories" },
  { cmd: "cd contact", desc: "Show contact information" },
  { cmd: "cd socials", desc: "Display all social profiles" },
  { cmd: "clear", desc: "Clear the terminal screen" },
  { cmd: "help", desc: "Show all commands" }
];

interface TerminalModalProps {
  open: boolean;
  onClose: () => void;
  knowledge: string;
}

export default function TerminalModal({ open, onClose, knowledge }: TerminalModalProps) {
  const [history, setHistory] = useState<string[]>([
    "Prabhat's macOS Terminal. Type 'help' for commands."
  ]);
  const [cmd, setCmd] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [open]);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history, open]);

  function extractSection(title: string): string {
    const regex = new RegExp(`## ${title}[\\s\\S]*?(?=## |$)`, "i");
    return knowledge.match(regex)?.[0]?.replace(/#+.+/g, "").trim() || `No ${title.toLowerCase()} info found.`;
  }

  function parse(command: string): string {
    switch (command) {
      case "about":
        return extractSection("About");
      case "cd projects":
        return extractSection("Projects").replace(/\d+\.\s/g, "- ");
      case "ls skills":
        return extractSection("Skills").replace(/\*\*/g, "");
      case "tech stack":
        return extractSection("Technology");
      case "cd experience":
        return extractSection("Experience");
      case "cd education":
        return extractSection("Education");
      case "cd services":
        return extractSection("Services");
      case "cd certifications":
        return extractSection("Certifications");
      case "cd trading":
        return extractSection("Trading");
      case "cd ai-tools":
        return extractSection("AI Tools");
      case "cd blogs":
        return extractSection("Blogs");
      case "cd contact":
        return extractSection("Contact").replace(/\*\*/g, "");
      case "cd socials":
        return extractSection("Socials");
      case "help":
        return `Available Commands:\n\n${COMMANDS.map(c => `- ${c.cmd.padEnd(18)} ${c.desc}`).join("\n")}`;
      case "clear":
        setHistory([]);
        return "";
      case "":
        return "";
      default:
        return `zsh: command not found: ${command}`;
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = cmd.trim();
    if (!value) return;
    const output = parse(value);
    if (value === "clear") {
      return;
    }
    setHistory(h => [...h, `> ${value}`, output]);
    setCmd("");
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Escape") onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-[2px]">
      <div className="bg-[#191c1e] rounded-xl shadow-2xl border border-gray-700 max-w-xl w-[95vw] md:w-[520px] h-[500px] flex flex-col font-mono">
        <div className="flex items-center justify-between px-5 py-2 bg-[#232325] rounded-t-xl border-b border-gray-800 select-none">
          <span className="text-green-400 font-bold text-base">● Terminal — zsh</span>
          <button
            onClick={onClose}
            title="Close Terminal"
            className="w-7 h-7 rounded flex items-center justify-center bg-[#292929] hover:bg-red-500 transition"
          >
            <span className="text-gray-300 text-lg">×</span>
          </button>
        </div>
        <div
          ref={terminalBodyRef}
          className="flex-1 px-6 py-4 overflow-y-auto text-sm text-[#92d3a2] whitespace-pre-wrap"
        >
          {history.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex items-center border-t border-gray-800 bg-[#222328] px-4 py-3"
          onKeyDown={handleKey}
        >
          <span className="text-green-500 pr-2">$</span>
          <input
            ref={inputRef}
            className="flex-1 bg-transparent focus:outline-none text-[#fffd] text-base placeholder:text-gray-500"
            value={cmd}
            onChange={e => setCmd(e.target.value)}
            placeholder="Type a command and press Enter..."
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
}
