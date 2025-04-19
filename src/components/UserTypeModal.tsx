import React from "react";
export default function UserTypeModal({ onSelect }: { onSelect: (type: "Visitor" | "Recruiter") => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="bg-[#232325] rounded-xl p-8 max-w-xs w-full text-center border border-gray-800 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-5">Who are you?</h2>
        <div className="flex flex-col gap-4">
          <button
            className="w-full py-2 rounded bg-green-700 hover:bg-green-600 text-white font-semibold text-lg transition"
            onClick={() => onSelect("Visitor")}
          >
            Visitor
          </button>
          <button
            className="w-full py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg transition"
            onClick={() => onSelect("Recruiter")}
          >
            Recruiter
          </button>
        </div>
      </div>
    </div>
  );
}
