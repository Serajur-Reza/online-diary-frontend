"use client";

import { baseUrl } from "@/constants/constants";
import { getAccessToken } from "@/utils/auth";
import api from "@/utils/axios";
import React, { useEffect, useState } from "react";
import RecordActions from "./RecordActions";
import ShowRecordModal from "./ShowRecordModal";

const HomePage = () => {
  const [records, setRecords] = useState([]);
  const [singleRecord, setSingleRecord] = useState();

  const [showViewRecordModal, setShowViewRecordModal] = useState(false);
  const [showEditRecordModal, setShowEditRecordModal] = useState(false);
  const [showDeleteRecordModal, setShowDeleteRecordModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = getAccessToken();
      const res = await api.get(`${baseUrl}/records`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("records", res?.data);
      setRecords(res?.data);
    };
    fetchData();
  }, [records?.length]);
  return (
    <div className="mt-5">
      <div className="rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-semibold text-left text-gray-900">
                Title
              </th>
              <th className="px-4 py-3 font-semibold text-left text-gray-900">
                Description
              </th>
              <th className="px-4 py-3 font-semibold text-left text-gray-900">
                Date
              </th>
              <th className="px-4 py-3 font-semibold text-left text-gray-900">
                Created At
              </th>
              <th className="px-4 py-3 text-right"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {records?.map((item) => (
              <tr key={item?.id} className="hover:bg-gray-50 transition-colors">
                <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                  {item?.title}
                </td>
                <td className="px-4 py-3 text-gray-700 max-w-xs truncate">
                  {item?.description}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                  {new Date(item?.date).toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-gray-500 text-xs">
                  {new Date(item?.createdAt).toLocaleString()}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  {/* <button
                    className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
                    onClick={() => console.log("Open menu for", item?.id)}
                  >
                    <EllipsisVertical size={18} />
                  </button> */}
                  <RecordActions
                    showViewRecordModal={showViewRecordModal}
                    setShowViewRecordModal={setShowViewRecordModal}
                    showEditRecordModal={showEditRecordModal}
                    setShowEditRecordModal={setShowEditRecordModal}
                    showDeleteRecordModal={showDeleteRecordModal}
                    setShowDeleteRecordModal={setShowDeleteRecordModal}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showViewRecordModal && (
        <ShowRecordModal
          showViewRecordModal={showViewRecordModal}
          setShowViewRecordModal={setShowViewRecordModal}
          singleRecord={singleRecord}
        />
      )}
    </div>
  );
};

export default HomePage;
