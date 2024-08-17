"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { getSocket } from "@/lib/socket";

type Props = {
  chatId: string;
};

const BottomBar = ({ chatId }: Props) => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    const socket = getSocket();
    if (socket && message.trim()) {
      socket.emit("sendMessage", { chatId, content: message });
      setMessage("");
    }
  };
  return (
    <div className="flex gap-3">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message..."
        className="flex-1"
      />
      <Button
        variant={"default"}
        className="hover:bg-green-600/60 bg-green-500"
        size={"icon"}
        onClick={handleSendMessage}
      >
        <Send size={16} className="text-white" />
      </Button>
    </div>
  );
};

export default BottomBar;
