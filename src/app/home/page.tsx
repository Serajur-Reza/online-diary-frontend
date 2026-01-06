import { baseUrl } from "@/constants/constants";
import api from "@/utils/axios";
import React from "react";
import HomePage from "./components/HomePage";

const Home = async () => {
  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-2xl font-semibold">Your Records</h1>
      <HomePage />
    </div>
  );
};

export default Home;
