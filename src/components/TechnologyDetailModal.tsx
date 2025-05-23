import React from 'react';

interface TechnologyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  technology: {
    name: string;
    details: string;
  } | null; // Allow technology to be null initially
}

const TechnologyDetailModal: React.FC<TechnologyDetailModalProps> = ({ isOpen, onClose, technology }) => {
  if (!isOpen || !technology) {
    return null; // Don't render the modal if it's not open or no technology is selected
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose} // Close modal when clicking outside
      ></div>

      {/* Modal Content */}
      <div className="relative w-auto max-w-3xl mx-auto my-6">
        <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
          {/* Modal Header */}
          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-2xl font-semibold">
              {technology.name}
            </h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={onClose}
            >
              <span className="text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>

          {/* Modal Body */}
          <div className="relative p-6 flex-auto">
            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
              {technology.details}
            </p>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnologyDetailModal;