"use client";

import React, { useEffect } from "react";
import useGetRecords from "../../home/api/useGetRecords";

function getMostFrequentMood(data) {
  // 1. Create a frequency map (e.g., { "Positive": 3, "Negative": 1 })
  const moodMap = data?.data.reduce((acc, entry) => {
    if (entry?.sentiment?.mood) {
      const mood = entry?.sentiment?.mood?.toLowerCase();
      acc[mood] = (acc[mood] || 0) + 1;
    }

    return acc;
  }, {});

  // 2. Find the mood with the highest count
  let highestMood = "";
  let maxCount = 0;

  for (const [mood, count] of Object.entries(moodMap)) {
    if (count > maxCount) {
      maxCount = count;
      highestMood = mood;
    }
  }

  return {
    mood: highestMood,
    count: maxCount,
    allMoods: moodMap, // Optional: returns the full map for your charts
  };
}

const AverageMood = () => {
  const { data: records, isLoading } = useGetRecords({
    title: "",
    limit: 10,
    offset: 0,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const res = getMostFrequentMood(records);

  return (
    <div>
      <h3 className="font-extrabold text-4xl">
        {res?.mood || "No data available"}
      </h3>
    </div>
  );
};

export default AverageMood;
