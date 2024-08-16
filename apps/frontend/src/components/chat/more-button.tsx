"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Archive,
  Delete,
  MicOff,
  MoreHorizontal,
  MoreVertical,
  Trash,
} from "lucide-react";

type Props = {};

const MoreButton = (props: Props) => {
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
          <div className="flex gap-4 justify-between items-center text-base font-normal hover:bg-blue-50 px-4 py-1 cursor-pointer">
            <p className="">Delete</p> <Trash size={14} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default MoreButton;
