"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

export default function ShowRecordModal(props) {
  const {
    showViewRecordModal,
    setShowViewRecordModal,
    singleRecord,
    setSingleRecord,
  } = props;

  const onClose = () => {
    setShowViewRecordModal(false);
    setSingleRecord(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!showViewRecordModal) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-110 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Record</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h1 className="block text-xl font-semibold text-gray-900 mb-1">
              Title
            </h1>
            <h3 className="text-md font-normal text-gray-900 mb-1">
              {singleRecord?.title}
            </h3>
          </div>

          <div>
            <h1 className="block text-xl font-semibold text-gray-900 mb-1">
              Description
            </h1>

            <p className="text-sm font-normal text-gray-900 mb-1">
              {singleRecord?.description}
            </p>
          </div>

          {/* Date Field */}
          <div>
            <h1 className="block text-xl font-semibold text-gray-900 mb-1">
              Date
            </h1>
            <p className="text-sm font-normal text-gray-900 mb-1">
              {new Date(singleRecord?.date).toLocaleDateString()}
            </p>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
