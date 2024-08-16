"use server";

import api from "@/config/api";
import { ApiResponse, Chat } from "@/types/index.type";

export const fetchAllChats = async (
  search: string
): Promise<{ success: boolean; message?: string; data: Chat[] }> => {
  try {
    const { data } = await api.get(`/chats?search=${search}`);
    return { success: true, data };
  } catch (error: any) {
    console.log(error);
    return { success: false, message: error.response.message, data: [] };
  }
};
export const createSingleChat = async (
  userId: string
): Promise<ApiResponse> => {
  try {
    const { data } = await api.post("/chats/direct", { recipientId: userId });

    return { success: true, data };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.response.message || "Chat creation failed",
      data: null,
    };
  }
};
export const createGroupChat = async (values: any): Promise<ApiResponse> => {
  try {
    const { data } = await api.post("/chats/group", {
      memberIds: values.users,
      name: values.name,
    });

    return { success: true, data };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.response.message || "Chat creation failed",
      data: null,
    };
  }
};

export const fetchChatDetails = async (
  chatId: string
): Promise<ApiResponse> => {
  try {
    const { data } = await api.get(`/chats/${chatId}`);

    return { success: true, data };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.response.message || "FAILED TO LOAD CHAT DETAILS",
      data: null,
    };
  }
};
