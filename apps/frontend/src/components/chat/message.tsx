"use client";
import React, { forwardRef, useEffect, useState } from "react";

const Message = forwardRef<
  HTMLDivElement,
  {
    message: any;
    currentUserId: string;
    participants: any[];
    isGroup: boolean;
  }
>(({ message, currentUserId, participants, isGroup }, ref) => {
  const isOwnMessage = message.senderId === currentUserId;
  const [sender, setSender] = useState<string>("");

  useEffect(() => {
    const data = participants.find(
      (participant: any) => participant.userId === message.senderId
    );

    setSender(data ? data.user.fullname : "Unknown");
  }, [participants, message]);

  return (
    <div
      key={message.id}
      ref={ref}
      className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-2`}
    >
      {!isOwnMessage && isGroup && (
        <div className="flex items-center mr-2">
          <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
            {sender && sender.charAt(0).toUpperCase()}
          </div>
        </div>
      )}

      <div
        className={`max-w-xs p-2 rounded-lg  ${
          isOwnMessage
            ? "bg-secondary text-white"
            : "bg-secondary-foreground text-gray-500"
        }`}
      >
        {!isOwnMessage && isGroup && (
          <div className="text-sm font-bold text-gray-700 mb-1">{sender}</div>
        )}
        {message.content}
      </div>
    </div>
  );
});

export default Message;
