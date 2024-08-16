"use server";
import axios from "axios";
import { cookies } from "next/headers";
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token?.value}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
