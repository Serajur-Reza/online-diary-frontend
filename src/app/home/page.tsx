import { baseUrl } from "@/constants/constants";
import api from "@/utils/axios";
import React from "react";
import HomePage from "./components/HomePage";

const Home = async () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default Home;
