"use server";

import api from "@/config/api";
import { ApiResponse, Chat } from "@/types/index.type";
import { unstable_noStore as noStore } from "next/cache";
export const fetchAllChats = async (
  search: string
): Promise<{ success: boolean; message?: string; data: Chat[] }> => {
  try {
    noStore();
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

export const leaveGroupChat = async (
  chatId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const { data } = await api.delete(`/chats/group/${chatId}/leave`);
    return { success: true, message: data.message };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
export const deleteDirectChat = async (
  chatId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const { data } = await api.delete(`/chats/direct/${chatId}/leave`);
    return { success: true, message: data.message };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
