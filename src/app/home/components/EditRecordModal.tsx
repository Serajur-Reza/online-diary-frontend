"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { baseUrl } from "@/constants/constants";
import { getAccessToken } from "@/utils/auth";
import api from "@/utils/axios";
import { toast } from "sonner";
import dayjs from "dayjs";
import useUpdateRecord from "../api/useUpdateRecord";

export default function EditRecordModal(props) {
  const {
    showEditRecordModal,
    setShowEditRecordModal,
    singleRecord,
    setSingleRecord,
  } = props;
  const [formData, setFormData] = useState({
    title: singleRecord?.title || "",
    description: singleRecord?.description || "",
    date: dayjs(singleRecord?.date).format("YYYY-MM-DD") || "",
  });
  const { mutateAsync: updateRecord, isPending: loading } = useUpdateRecord();

  const onClose = () => {
    setShowEditRecordModal(false);
    setSingleRecord(null);
  };

  const handleSubmit = async (e) => {
    try {
      e?.preventDefault();

      const partialBody = {};
      if (formData?.title !== singleRecord?.title)
        partialBody["title"] = formData?.title;
      if (formData?.description !== singleRecord?.description)
        partialBody["description"] = formData?.description;
      if (formData?.date !== singleRecord?.date)
        partialBody["date"] = dayjs(formData?.date).format("YYYY-MM-DD");

      const res = await updateRecord({
        id: singleRecord?.id,
        data: partialBody,
      });

      toast?.success("Successfully Updated Record");
    } catch (error) {
      toast?.error(error?.message || "something went wrong");
    } finally {
      setShowEditRecordModal(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!showEditRecordModal) return null;

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
          <h2 className="text-xl font-semibold text-gray-800">Edit Record</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={formData?.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
              value={formData?.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
              }}
            />
          </div>

          {/* Date Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={formData?.date}
              onChange={(e) => {
                console.log("dagte edit", e.target.value);
                setFormData({
                  ...formData,
                  date: dayjs(e.target.value).format("YYYY-MM-DD"),
                });
              }}
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
