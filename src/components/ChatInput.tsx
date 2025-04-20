import type React from "react";
import { useState, useRef, useEffect } from "react";

export default function ChatInput({ onSend, onVoice }: { onSend: (msg: string) => void; onVoice: () => void }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize the textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, 200); // Cap at 200px height
    textarea.style.height = `${newHeight}px`;
  }, [value]);

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
      // Reset height after sending
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  }

  return (
    <div className="w-full px-2 md:px-4 pb-3 pt-2 bg-gradient-to-b from-transparent via-chat-bg to-chat-input-bg">
      <div className="max-w-4xl mx-auto flex items-end gap-2 border border-chat-border rounded-xl bg-chat-input-bg px-3 py-2 shadow-md">
        <button
          onClick={onVoice}
          title="Voice input"
          className="text-2xl text-primary hover:text-primary/80 px-1 py-1 focus:outline-none transition-colors"
        >
          <i className="fa-solid fa-microphone" />
        </button>
        <textarea
          ref={textareaRef}
          className="flex-1 resize-none bg-transparent text-foreground px-2 py-2 focus:outline-none focus:ring-0
                    placeholder:text-muted-foreground text-sm min-h-[40px] max-h-[200px] rounded-md"
          placeholder="Send a message..."
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <button
          onClick={handleSend}
          title="Send"
          className="text-2xl px-1 py-1 text-primary hover:text-primary/80 disabled:opacity-30 focus:outline-none transition-colors"
          disabled={!value.trim()}
        >
          <i className="fa-solid fa-paper-plane" />
        </button>
      </div>
    </div>
  );
}
