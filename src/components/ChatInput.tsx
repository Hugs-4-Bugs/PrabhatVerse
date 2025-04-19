import type React from "react";
import { useState, useRef } from "react";

export default function ChatInput({ onSend, onVoice }: { onSend: (msg: string) => void; onVoice: () => void }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }
  function handleSend() {
    if (value.trim()) {
      onSend(value.trim());
      setValue("");
      textareaRef.current?.focus();
    }
  }

  return (
    <div className="w-full px-1 md:px-2 pb-2 bg-gradient-to-b from-transparent to-[#232325]">
      <div className="max-w-2xl mx-auto flex items-end gap-2 border border-gray-700 rounded-xl bg-[#222328] px-3 py-2 shadow-lg">
        <button onClick={onVoice} title="Voice input" className="text-2xl text-green-400 hover:text-green-500 px-1 py-1 focus:outline-none">
          <i className="fa-solid fa-microphone" />
        </button>
        <textarea
          ref={textareaRef}
          className="flex-1 resize-none bg-transparent text-gray-100 px-2 py-1 focus:outline-none focus:ring-0 overflow-y-auto placeholder:text-gray-400 text-sm h-7 min-h-[28px] max-h-32"
          placeholder="Send a message..."
          value={value}
          onChange={e => setValue(e.target.value)}
          rows={1}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSend} title="Send" className="text-2xl px-1 py-1 text-green-400 hover:text-green-500 disabled:opacity-30 focus:outline-none" disabled={!value.trim()}>
          <i className="fa-solid fa-paper-plane" />
        </button>
      </div>
    </div>
  );
}
