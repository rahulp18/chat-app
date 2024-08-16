"use client";
import { useUser } from "@/contexts/user.context";
import { Chat } from "@/types/index.type";
import React from "react";

type Props = {
  chatInfo: Chat;
};

const ChatName = ({ chatInfo }: Props) => {
  const { user } = useUser();
  return (
    <div>
      {chatInfo.isGroup
        ? chatInfo.name
        : chatInfo.participants.filter((p) => p.userId !== user?.id)[0].user
            .fullname}
      <div className="flex items-center gap-2">
        {chatInfo.isGroup &&
          chatInfo.participants.map((p) => {
            return (
              <span className="text-xs font-medium text-gray-400" key={p.id}>
                {p.user.fullname}
              </span>
            );
          })}
      </div>
    </div>
  );
};

export default ChatName;
