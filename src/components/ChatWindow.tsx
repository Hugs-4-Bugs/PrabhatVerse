
import type React from "react";
import { useEffect, useRef } from "react";

const ChatWindow = ({
  children,
  activeSection,
  sidebarCollapsed
}: {
  children?: React.ReactNode;
  activeSection?: string;
  sidebarCollapsed?: boolean;
}) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom when new children (messages) come
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [children]);

  // Scroll to top only when changing section (other than Home)
  useEffect(() => {
    if (activeSection && activeSection !== "Home") {
      mainRef.current?.scrollTo({ top: 0 });
    }
  }, [activeSection]);

  return (
    <main
      ref={mainRef}
      className="flex-1 bg-chat-bg min-h-0 px-3 sm:px-6 py-4 flex flex-col relative overflow-y-auto w-full"
    >
      <div
        className={`w-full mx-auto flex-1 flex flex-col gap-6 ${
          activeSection === "Home" ? "justify-end" : "justify-center"
        } transition-all duration-300 max-w-[800px]`}
      >
        {children}
        <div ref={chatEndRef} />
        {!children && (
          <div className="flex flex-col items-center justify-center h-full opacity-70 select-none mt-24">
            <h2 className="text-xl mb-2 font-bold text-foreground">
              Welcome to Prabhat Kumar's Portfolio
            </h2>
            <p className="text-md max-w-md text-center text-muted-foreground">
              Select a section from the left or ask a question below to get
              started!
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ChatWindow;
