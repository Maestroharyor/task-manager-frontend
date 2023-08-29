import axios, { AxiosInstance } from "axios";

const endpointURL = import.meta.env.VITE_BASE_URL;
export const taskService: AxiosInstance = axios.create({
  baseURL: endpointURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const cacheKey = endpointURL;
export const tagCacheKey = endpointURL + "/tags";
