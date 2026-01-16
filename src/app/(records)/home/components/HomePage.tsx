"use client";

import React, { useState } from "react";
import RecordActions from "./RecordActions";
import ShowRecordModal from "./ShowRecordModal";
import EditRecordModal from "./EditRecordModal";
import useGetRecords from "../api/useGetRecords";
import CreateRecordModal from "./CreateRecordModal";
import DeleteRecordModal from "./DeleteRecordModal";

const HomePage = () => {
  // const [records, setRecords] = useState([]);
  const [singleRecord, setSingleRecord] = useState();

  const [showViewRecordModal, setShowViewRecordModal] = useState(false);
  const [showCreateRecordModal, setShowCreateRecordModal] = useState(false);
  const [showEditRecordModal, setShowEditRecordModal] = useState(false);
  const [showDeleteRecordModal, setShowDeleteRecordModal] = useState(false);

  const { data: records } = useGetRecords();

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Your Records</h1>
        <button
          className="bg-indigo-600 rounded-md text-white py-2 px-4 font-semibold cursor-pointer"
          onClick={() => setShowCreateRecordModal(true)}
        >
          Create Record
        </button>
      </div>

      <div className="mt-5">
        <div className="rounded-lg border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-left text-gray-900">
                  Title
                </th>
                <th className="px-4 py-3 font-semibold text-left text-gray-900">
                  Mood
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
                <tr
                  key={item?.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900">
                    {item?.title}
                  </td>
                  <td className="px-4 py-3 text-gray-700 max-w-xs truncate">
                    {item?.sentiment?.mood}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                    {new Date(item?.date).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-gray-500 text-xs">
                    {new Date(item?.createdAt).toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <div onClick={() => setSingleRecord(item)}>
                      <RecordActions
                        showViewRecordModal={showViewRecordModal}
                        setShowViewRecordModal={setShowViewRecordModal}
                        showEditRecordModal={showEditRecordModal}
                        setShowEditRecordModal={setShowEditRecordModal}
                        showDeleteRecordModal={showDeleteRecordModal}
                        setShowDeleteRecordModal={setShowDeleteRecordModal}
                        singleRecord={singleRecord}
                        setSingleRecord={setSingleRecord}
                      />
                    </div>
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
            setSingleRecord={setSingleRecord}
          />
        )}

        {showCreateRecordModal && (
          <CreateRecordModal
            showCreateRecordModal={showCreateRecordModal}
            setShowCreateRecordModal={setShowCreateRecordModal}
          />
        )}

        {showEditRecordModal && (
          <EditRecordModal
            showEditRecordModal={showEditRecordModal}
            setShowEditRecordModal={setShowEditRecordModal}
            singleRecord={singleRecord}
            setSingleRecord={setSingleRecord}
          />
        )}

        {showDeleteRecordModal && (
          <DeleteRecordModal
            showDeleteRecordModal={showDeleteRecordModal}
            setShowDeleteRecordModal={setShowDeleteRecordModal}
            singleRecord={singleRecord}
            setSingleRecord={setSingleRecord}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
