import BottomBar from "@/components/chat/bottom-bar";
import ChatHeader from "@/components/chat/chat-header";
import ChatWindow from "@/components/chat/chatwindow";
import { Separator } from "@/components/ui/separator";
import api from "@/config/api";
import { fetchChatDetails } from "@/lib/actions/chats.action";
import { groupChat, singleChat } from "@/utils/data";

import React from "react";

type Props = {
  params: {
    chatId: string;
  };
};

const ChatIdPage = async ({ params: { chatId } }: Props) => {
  const res = await fetchChatDetails(chatId);
  if (!res.success) {
    return <div className="">Invalid Chat Id ${res.message}</div>;
  }
  return (
    <div className=" h-full flex flex-col  relative">
      <div className="sticky top-0 left-0 px-4 py-3  w-full  ">
        <ChatHeader chatInfo={res.data} />
        <Separator className="mt-3" />
      </div>
      <div className="flex-1 px-4 py-1 overflow-y-auto">
        <ChatWindow
          chatId={chatId}
          participantsData={res.data.participants}
          isGroup={res.data.isGroup}
        />
      </div>
      <div className="sticky bottom-0  px-4 py-5 shadow w-full border-t-[1px] ">
        <BottomBar chatId={chatId} />
      </div>
    </div>
  );
};

export default ChatIdPage;
