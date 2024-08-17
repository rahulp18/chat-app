"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Archive, LogOut, MicOff, MoreHorizontal, Trash } from "lucide-react";
import { Chat } from "@/types/index.type";
import { deleteDirectChat, leaveGroupChat } from "@/lib/actions/chats.action";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Props = {
  chatInfo: Chat;
};

const MoreButton = ({ chatInfo }: Props) => {
  const router = useRouter();
  const handleDelete = async (type: string) => {
    let res: { success: boolean; message: string };
    if (type === "group") {
      res = await leaveGroupChat(chatInfo.id);
    } else {
      res = await deleteDirectChat(chatInfo.id);
    }
    if (res.success) {
      toast.success("Chat deleted successfully");
      router.push("/chat");
      router.refresh();
    } else {
      toast.error(res.message);
    }
  };
  return (
    <Popover>
      <PopoverTrigger>
        <MoreHorizontal
          size={20}
          className="text-gray-400 cursor-pointer hover:text-gray-600"
        />
      </PopoverTrigger>
      <PopoverContent className="w-auto px-1 py-2 mr-5">
        <div className="flex flex-col gap-1">
          <div className="flex gap-4 items-center justify-between text-base font-normal hover:bg-blue-50 px-4 py-1 cursor-pointer">
            <p className="">Archive</p> <Archive size={14} />
          </div>
          <div className="flex gap-4 items-center justify-between text-base font-normal hover:bg-blue-50 px-4 py-1 cursor-pointer">
            <p className="">Muted</p> <MicOff size={14} />
          </div>

          {chatInfo.isGroup ? (
            <div
              onClick={() => handleDelete("group")}
              className="flex gap-4 justify-between items-center text-base font-normal hover:bg-blue-50 px-4 py-1 cursor-pointer"
            >
              <p className="">Leave</p> <LogOut size={14} />
            </div>
          ) : (
            <div
              onClick={() => handleDelete("direct")}
              className="flex gap-4 justify-between items-center text-base font-normal hover:bg-blue-50 px-4 py-1 cursor-pointer"
            >
              <p className="">Delete</p> <Trash size={14} />
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MoreButton;
