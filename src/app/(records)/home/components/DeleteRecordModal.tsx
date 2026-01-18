"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

import useDeleteRecord from "../api/useDeleteRecord";

export default function DeleteRecordModal(props) {
  const {
    showDeleteRecordModal,
    setShowDeleteRecordModal,
    singleRecord,
    setSingleRecord,
  } = props;

  const { mutateAsync: deleteRecord, isPending: loading } = useDeleteRecord();

  const onClose = () => {
    setShowDeleteRecordModal(false);
    setSingleRecord(null);
  };

  const handleDelete = async (e) => {
    try {
      e?.preventDefault();

      const res = await deleteRecord({
        id: singleRecord?.id,
      });

      toast?.success("Successfully Deleted Record");
    } catch (error) {
      toast?.error(error?.message || "something went wrong");
    } finally {
      setShowDeleteRecordModal(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!showDeleteRecordModal) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-110 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Modal Container: Added 'flex flex-col' and 'max-h' */}
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200 
               flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: Fixed at top */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
          <h2 className="text-xl font-semibold text-gray-800">Delete Record</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content: Added 'overflow-y-auto' and 'flex-1' */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center">
            <div className="mb-4 p-4 bg-red-50 rounded-full">
              {/* Optional: Add a warning icon here */}
              <X size={40} className="text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Are you sure you want to delete this record?
            </h2>
            <p className="mt-2 text-gray-500 text-sm">
              This action cannot be undone. All data associated with this record
              will be permanently removed.
            </p>
          </div>

          {/* Footer: Fixed at bottom */}
          <div className="flex items-center gap-3 pt-4  bottom-0 bg-white">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md shadow-red-200 transition-all cursor-pointer"
              disabled={loading}
              onClick={handleDelete}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
