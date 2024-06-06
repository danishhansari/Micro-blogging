import axios from "axios";
import { queryClient } from "./queryClient";
const options = {
  baseURL: import.meta.env.VITE_SERVER,
  withCredentials: true,
};

const TokenRefreshToken = axios.create(options);
TokenRefreshToken.interceptors.response.use((response) => response.data);

const API = axios.create(options);
import { navigate } from "../lib/navigation";

API.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const { config, response } = error;
    const { status, data } = response || {};
    // Try to refresh code BTS
    if (status === 401 && data?.errorCode === "InvalidAccessToken") {
      try {
        await TokenRefreshToken.get("/auth/refresh");
        return TokenRefreshToken(config);
      } catch (error) {
        queryClient.clear();
        navigate("/login", {
          state: {
            redirectUrl: window.location.pathname,
          },
        });
      }
    }
    return Promise.reject({ status, ...data });
  }
);

export default API;
