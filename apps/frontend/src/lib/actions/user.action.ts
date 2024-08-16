"use server";

import api from "@/config/api";
import { ApiResponse } from "@/types/index.type";

export const loginUser = async (values: any): Promise<ApiResponse> => {
  try {
    const { data } = await api.post("/auth/login", values);
    return { success: true, data };
  } catch (error: any) {
    return {
      success: false,
      message: error.response.message || "Logged in failed",
      data: [],
    };
  }
};
export const registerUser = async (values: any): Promise<ApiResponse> => {
  try {
    const { data } = await api.post("/auth/register", values);
    return { success: true, data };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.message || "Registration failed",
      data: [],
    };
  }
};

export const fetchUsers = async (search: string): Promise<ApiResponse> => {
  try {
    const { data } = await api.get(`/users/others?search=${search}`);
    return { success: true, data };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.message || "Failed to fetch users",
      data: [],
    };
  }
};

export const fetchLoggedInUserInfo = async (): Promise<ApiResponse> => {
  try {
    const { data } = await api.get("/auth/me");
    return { success: true, data };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.message || "Failed to fetch logged-in user info",
      data: [],
    };
  }
};
