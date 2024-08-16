"use client";

import React, { useEffect, useState } from "react";
import ChatCard from "./chat-card";

import { useSearchParams } from "next/navigation";

import { Chat } from "@/types/index.type";
import { fetchAllChats } from "@/lib/actions/chats.action";
import { toast } from "react-toastify";

type Props = {};

const ChatLists = ({}: Props) => {
  const searchParams = useSearchParams();
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);
  const getAllChats = async () => {
    setLoading(true);
    const res = await fetchAllChats(searchParams.get("search") || "");
    if (res.success) {
      setChats(res.data);
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    getAllChats();
  }, [searchParams.get("search")]);
  if (loading) {
    return <div className="px-5">loading...</div>;
  }
  return (
    <div className=" relative overflow-y-auto px-5 flex-1">
      <div className="flex flex-col gap-2 mt-5">
        {chats.map((chat) => {
          return <ChatCard chat={chat} key={chat.id} />;
        })}
      </div>
    </div>
  );
};

export default ChatLists;
