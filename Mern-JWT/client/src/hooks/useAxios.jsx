import React, { useEffect } from "react";
import userRefreshToken from "./useRefreshToken";
import { useAuth } from "./useAuth";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function useAxios(location) {
  const refresh = userRefreshToken();
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const axiosRequestInterceptor = axios.interceptors.request.use(
      function (config) {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.acessToken}`;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
    const axiosResponseInterceptor = axios.interceptors.response.use(
      function (response) {
        return response;
      },
      async function (error) {
        const prevRequest = error?.config;
        if (
          error?.response &&
          error?.response.status === 401 &&
          !prevRequest.sent
        ) {
          prevRequest.sent = true;
          const newRefreshToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newRefreshToken}`;
          return axios(prevRequest);
        }
        if (error.response && error?.response.status === 403) {
          navigate("/login", { state: { from: location }, replace: true });
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.response.eject(axiosResponseInterceptor);
      axios.interceptors.request.eject(axiosRequestInterceptor);
    };
  }, [auth, refresh]);

  return axios;
}

export default useAxios;
