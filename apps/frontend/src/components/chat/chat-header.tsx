import { Phone, Video } from "lucide-react";
import Image from "next/image";
import React from "react";
import MoreButton from "./more-button";
import { Chat } from "@/types/index.type";
import ChatName from "./chat-name";

type Props = {
  chatInfo: Chat;
};

const ChatHeader = async ({ chatInfo }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <div className="p-1">
          <Image
            src={
              chatInfo.isGroup
                ? "https://randomuser.me/api/portraits/men/1.jpg"
                : "/assets/default.png"
            }
            alt="image"
            height={45}
            width={45}
            className="rounded-full object-contain"
          />
        </div>
        <ChatName chatInfo={chatInfo} />
      </div>
      <div className="flex gap-3 items-center">
        <Phone
          size={20}
          className="text-gray-400 cursor-pointer hover:text-gray-600"
        />
        <Video
          size={22}
          className="text-gray-400 cursor-pointer hover:text-gray-600"
        />
        <MoreButton chatInfo={chatInfo} />
      </div>
    </div>
  );
};

export default ChatHeader;
