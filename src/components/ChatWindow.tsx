import type React from "react";
import { useEffect, useRef } from "react";

const ChatWindow = ({ children, activeSection }: { children?: React.ReactNode; activeSection?: string }) => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeSection && activeSection !== 'Home') {
      mainRef.current?.scrollTo({ top: 0 });
    }
  }, [children, activeSection]);

  return (
    <main
      ref={mainRef}
      className="flex-1 bg-[#343541] min-h-0 px-4 py-4 md:px-10 flex flex-col relative overflow-y-auto"
    >
      <div className={`w-full max-w-2xl mx-auto flex-1 flex flex-col gap-6 ${activeSection === 'Home' ? 'justify-end' : ''}`}>
        {children || (
          <div className="flex flex-col items-center justify-center h-full opacity-70 select-none mt-24">
            <h2 className="text-xl mb-2 font-bold text-white">Welcome to Prabhat Kumar's Portfolio</h2>
            <p className="text-md max-w-md text-center text-gray-300">Select a section from the left or ask a question below to get started!</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ChatWindow;
