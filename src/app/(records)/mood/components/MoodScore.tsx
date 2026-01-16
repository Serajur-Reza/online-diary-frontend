"use client";

import React, { useEffect } from "react";
import useGetRecords from "../../home/api/useGetRecords";

const MoodScore = () => {
  const { data: records } = useGetRecords();

  const score = records?.reduce((acc, curr) => {
    console.log("cuur", curr?.sentiment?.score);
    if (curr?.sentiment?.score) {
      acc = acc + curr?.sentiment?.score;
    }
    return acc;
  }, 0);

  return (
    <div className="h-48 w-48  border-16 border-solid border-indigo-600 rounded-full flex items-center justify-center">
      <p className="font-extrabold text-4xl">
        {(score / records?.length).toFixed(2)}
      </p>
    </div>
  );
};

export default MoodScore;
