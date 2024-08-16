"use client";
import React, { useEffect, useRef } from "react";
import Message from "./message";

type Props = {
  participants: any[];
  isGroup: boolean;
  messages: any[];
};

const ChatWindow = ({ participants, isGroup, messages }: Props) => {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  let currentUserId = "user1_id";
  return (
    <div className="">
      <div className="p-4 h-full overflow-y-auto chat-window">
        {messages.map((message, index) => (
          <Message
            key={message.id}
            message={message}
            currentUserId={currentUserId}
            participants={participants}
            isGroup={isGroup}
            ref={index === messages.length - 1 ? lastMessageRef : undefined}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
