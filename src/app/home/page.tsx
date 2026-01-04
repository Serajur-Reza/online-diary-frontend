import { baseUrl } from "@/constants/constants";
import api from "@/utils/axios";
import React from "react";
import HomePage from "./components/HomePage";

const Home = async () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Home</h1>
      <HomePage />
    </div>
  );
};

export default Home;
