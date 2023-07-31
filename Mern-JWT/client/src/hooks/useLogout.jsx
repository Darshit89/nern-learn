import React from "react";
import axios from "../api/axios";
import { useAuth } from "./useAuth";

function useLogout() {
  const { handleAuth } = useAuth();
  const logout = async () => {
    try {
      handleAuth({});
      const response = await axios.get("/logout");
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return logout;
}

export default useLogout;
