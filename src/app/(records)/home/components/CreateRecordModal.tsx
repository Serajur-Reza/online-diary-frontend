"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import dayjs from "dayjs";

import useCreateRecord from "../api/useCreateRecord";
import Editor from "@/components/Editor";

export default function CreateRecordModal(props) {
  const { showCreateRecordModal, setShowCreateRecordModal } = props;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
  });

  const { mutateAsync: createRecord, isPending: loading } = useCreateRecord();

  const [error, setError] = useState(false);

  const onClose = () => {
    setShowCreateRecordModal(false);
  };

  const handleSubmit = async (e) => {
    try {
      e?.preventDefault();

      // Validation Logic
      // We strip HTML tags to check if there is actual text content
      const isActuallyEmpty =
        formData?.description.replace(/<[^>]*>/g, "").trim().length === 0;

      if (isActuallyEmpty) {
        setError(true);
        return; // Stop the save
      }

      setError(false);

      //

      const res = await createRecord({
        data: formData,
      });

      toast?.success("Successfully Created Record");
      setShowCreateRecordModal(false);
    } catch (error) {
      toast?.error(error?.message || "something went wrong");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!showCreateRecordModal) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-110 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Modal Container: Added 'flex flex-col' and a 'max-h' */}
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
          <h2 className="text-xl font-semibold text-gray-800">Create Record</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar"
        >
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData?.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <Editor
              onChange={(newHtml) =>
                setFormData({ ...formData, description: newHtml })
              }
            />
            {error && (
              <span className="text-red-600 text-sm">
                Please write something
              </span>
            )}
          </div>

          {/* Date Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  date: dayjs(e.target.value).format("YYYY-MM-DD"),
                });
              }}
            />
          </div>

          <div className="flex items-center gap-3 pt-4  bottom-0 bg-white">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all disabled:bg-indigo-400 cursor-pointer"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
