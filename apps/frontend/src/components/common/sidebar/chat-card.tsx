"use client";

import { useUser } from "@/contexts/user.context";
import { cn } from "@/lib/utils";
import { Chat } from "@/types/index.type";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { memo, useMemo } from "react";
import { format } from "date-fns";

type Props = { chat: Chat };

const ChatCard = ({ chat }: Props) => {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();

  // Memoize the derived values to avoid unnecessary calculations on re-renders
  const isSelected = useMemo(
    () => params.chatId === chat.id,
    [params.chatId, chat.id]
  );
  const lastMessage = useMemo(
    () => chat.messages[chat.messages.length - 1],
    [chat.messages]
  );
  const participantName = useMemo(() => {
    if (chat.isGroup) return chat.name;
    const participant = chat.participants.find((p) => p.userId !== user?.id);
    return participant?.user.fullname || "Unknown";
  }, [chat.isGroup, chat.participants, user?.id]);

  // Handle click to avoid unnecessary re-renders
  const handleClick = () => {
    if (params.chatId !== chat.id) {
      router.push(`/chat/${chat.id}`);
    }
  };

  return (
    <div
      className={cn("px-4 py-3 rounded-sm flex gap-2 hover:bg-[#E6EBF5]", {
        "bg-[#E6EBF5]": isSelected,
      })}
      onClick={handleClick}
    >
      <div className="bg-white p-1 rounded-full">
        <Image
          src={"/assets/default.png"}
          alt="profile"
          className="object-contain rounded-full"
          height={40}
          width={40}
        />
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-base font-medium">{participantName}</h1>
          <p className="text-xs text-gray-400">
            {lastMessage
              ? format(new Date(lastMessage.updatedAt), "h:mm a")
              : ""}
          </p>
        </div>
        <p className="text-xs font-normal text-gray-400">
          {lastMessage?.content || "No messages yet"}
        </p>
      </div>
    </div>
  );
};

// Memoizing ChatCard to avoid re-renders if props do not change
export default memo(ChatCard);
