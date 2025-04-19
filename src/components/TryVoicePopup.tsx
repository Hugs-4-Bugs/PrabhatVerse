import React from "react";

export default function TryVoicePopup({ open, onTry, onLater }: { open: boolean; onTry: () => void; onLater: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed z-[999] inset-0 flex items-center justify-center bg-[#202122e6] backdrop-blur-[2px]">
      <div className="w-[95vw] max-w-lg bg-[#171821] p-8 rounded-xl border border-gray-700 text-center shadow-xl">
        <div className="mb-3 text-3xl text-green-400 "><i className="fa fa-microphone animate-pulse" /></div>
        <h2 className="text-white font-bold text-2xl mb-4">Try Prabhat’s AI Voice Assistant?</h2>
        <p className="mb-5 text-gray-300">Interact with Prabhat's portfolio using only your voice—powered by the live profile!</p>
        <div className="flex flex-col gap-3 mt-7 font-semibold">
          <button className="px-6 py-3 bg-green-700 rounded text-white text-lg hover:bg-green-600" onClick={onTry}>Try Now</button>
          <button className="px-6 py-3 bg-gray-700 rounded text-white text-lg hover:bg-gray-600" onClick={onLater}>Maybe Later</button>
        </div>
      </div>
    </div>
  );
}
