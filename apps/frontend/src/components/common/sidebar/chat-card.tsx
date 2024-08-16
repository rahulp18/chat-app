"use client";
import { useUser } from "@/contexts/user.context";
import { cn } from "@/lib/utils";
import { Chat, User } from "@/types/index.type";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";

type Props = { chat: Chat };

const ChatCard = ({ chat }: Props) => {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();

  return (
    <div
      className={cn("px-4 py-3 rounded-sm flex gap-2 hover:bg-[#E6EBF5]", {
        "bg-[#E6EBF5]": params.chatId == chat.id,
      })}
      key={chat.id}
      onClick={() => router.push(`/chat/${chat.id}`)}
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
          <h1 className="text-base font-medium">
            {chat.isGroup
              ? chat.name
              : chat.participants.filter((p) => p.userId !== user?.id)[0].user
                  .fullname}
          </h1>
          <p className="text-xs text-gray-400">2.50 PM</p>
        </div>
        <p className="text-xs font-normal text-gray-400">{`Lorem ipsum dolor sit amet.`}</p>
      </div>
    </div>
  );
};

export default ChatCard;
