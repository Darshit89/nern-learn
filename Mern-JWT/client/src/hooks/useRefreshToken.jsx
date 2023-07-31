import React from "react";
import { useAuth } from "./useAuth";
import axios from "../api/axios";

function useRefreshToken() {
  const { handleAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.get("/refresh");
      handleAuth({
        acessToken: response.data.acessToken,
        roles: response.data.roles,
      });
      return response.data.acessToken;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return refresh;
}

export default useRefreshToken;
