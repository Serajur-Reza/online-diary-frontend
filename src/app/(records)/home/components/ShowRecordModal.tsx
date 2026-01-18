"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";

import UniversalHtmlRenderer from "@/components/HTMLParser";

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
      {/* Modal Container: Flex layout with restricted height */}
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200 
               flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: Fixed at the top */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
          <h2 className="text-xl font-semibold text-gray-800">
            Record Details
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Scrollable Body: Content expands here */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {/* Title Field */}
            <div>
              <h1 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-1">
                Title
              </h1>
              <h3 className="text-xl font-semibold text-gray-900">
                {singleRecord?.title}
              </h3>
            </div>

            {/* Description Field - This is the part likely to scroll */}
            <div>
              <h1 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">
                Description
              </h1>
              <div className="prose prose-indigo max-w-none bg-gray-50 p-4 rounded-xl border border-gray-100">
                <UniversalHtmlRenderer
                  html={singleRecord?.description}
                  className="html-content"
                />
              </div>
            </div>

            {/* Date Field */}
            <div className="pb-4">
              <h1 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-1">
                Date
              </h1>
              <p className="text-md font-medium text-gray-800">
                {new Date(singleRecord?.date).toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Footer Actions: Fixed at bottom */}
          <div className="p-6 border-t border-gray-100 bg-white shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
