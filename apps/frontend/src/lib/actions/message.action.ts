"use server";

import api from "@/config/api";
import { ApiResponse } from "@/types/index.type";

export const fetchAllMessages = async (
  chatId: string
): Promise<ApiResponse> => {
  try {
    const { data } = await api.get(`/messages/chat/${chatId}`);
    return { success: true, data };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.message || "Failed to fetch users",
      data: [],
    };
  }
};
