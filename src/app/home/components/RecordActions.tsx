"use client";

import React, { useState, useEffect, useRef } from "react";
import { Edit, Trash, ExternalLink, EllipsisVertical } from "lucide-react";
import { getAccessToken } from "@/utils/auth";
import { baseUrl } from "@/constants/constants";
import api from "@/utils/axios";

export default function RecordActions(props) {
  const {
    showViewRecordModal,
    setShowViewRecordModal,
    showEditRecordModal,
    setShowEditRecordModal,
    showDeleteRecordModal,
    setShowDeleteRecordModal,
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  //   const fetchData = async (id) => {
  //     const accessToken = getAccessToken();
  //     const res = await api.get(`${baseUrl}/records/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     console.log("records", res?.data);
  //     setSingleRecord(res?.data);
  //   };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* The 3-Dots Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
      >
        <EllipsisVertical size={18} />
      </button>

      {/* The Actual Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-1000 focus:outline-none animate-in fade-in zoom-in duration-100">
          <div className="py-1">
            <button
              onClick={() => {
                // console.log("View", rowId);
                // fetchData()
                console.log(showViewRecordModal);
                setShowViewRecordModal(true);
                setIsOpen(false);
              }}
              className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white transition-colors"
            >
              <ExternalLink className="mr-3 h-4 w-4" />
              View Record
            </button>
            <button
              onClick={() => {
                // console.log("Edit", rowId);

                setIsOpen(false);
              }}
              className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white transition-colors"
            >
              <Edit className="mr-3 h-4 w-4" />
              Edit Record
            </button>
          </div>
          <div className="py-1">
            <button
              onClick={() => {
                // console.log("Delete", rowId);
                setIsOpen(false);
              }}
              className="group flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-600 hover:text-white transition-colors"
            >
              <Trash className="mr-3 h-4 w-4" />
              Delete Record
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
