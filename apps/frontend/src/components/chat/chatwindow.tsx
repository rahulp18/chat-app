"use client";
import React, { useEffect, useRef, useState } from "react";
import Message from "./message";
import { useUser } from "@/contexts/user.context";
import { Message as MessageType, Participant } from "@/types/index.type";
import { fetchAllMessages } from "@/lib/actions/message.action";
import { connectSocket } from "@/lib/socket";
import { getCookie } from "cookies-next";
import { Socket } from "socket.io-client";
type Props = {
  chatId: string;
  participantsData: Participant[];
  isGroup: boolean;
};

const ChatWindow = ({ chatId, participantsData, isGroup }: Props) => {
  const { user } = useUser();
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [participants, setParticipants] = useState<Participant[]>(
    participantsData || []
  );
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await fetchAllMessages(chatId);
  //     if (res.success) {
  //       setMessages(res.data);
  //     }

  //     if (user && res.success) {
  //       const token = getCookie("token");

  //       if (!token) return;
  //       const socket = connectSocket(token);
  //       socketRef.current = socket;

  //       socket.emit("joinChat", chatId);

  //       socket.on("message", (message) => {
  //         setMessages((prevMessages) => {
  //           if (prevMessages.some((msg) => msg.id === message.id)) {
  //             return prevMessages;
  //           }
  //           return [...prevMessages, message];
  //         });
  //       });

  //       return () => {
  //         if (socketRef.current) {
  //           socket.emit("leaveChat", chatId);
  //           socket.off("message"); // Remove the message listener
  //           socket.disconnect(); // Disconnect the socket connection
  //           socketRef.current = null; // Reset the socket instance
  //         }
  //       };
  //     }
  //   };
  //   fetchData();
  //   const cleanupSocket=setupSocket()
  //   return cleanupSocket
  // }, [chatId, user]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchAllMessages(chatId);
      if (res.success) {
        setMessages(res.data);
      }
    };

    const setupSocket = () => {
      const token = getCookie("token");
      if (!token) return;
      const socket = connectSocket(token);
      socketRef.current = socket;

      // Join the chat room
      socket.emit("joinChat", chatId);
      // Listen for incoming messages
      socket.on("message", (message: MessageType) => {
        setMessages((prevMessages) => {
          // Avoid adding duplicate messages
          if (prevMessages.some((msg) => msg.id === message.id)) {
            return prevMessages;
          }
          return [...prevMessages, message];
        });
      });
      // Cleanup function when the component unmounts or chat changes
      return () => {
        if (socketRef.current) {
          socket.emit("leaveChat", chatId);
          socket.off("message");
          socket.disconnect();
          socketRef.current = null;
        }
      };
    };

    fetchData();
    const cleanupSocket = setupSocket();
    return cleanupSocket;
  }, [chatId, user]);

  console.log({ messages });

  return (
    <div className="">
      <div className="p-4 h-full overflow-y-auto chat-window">
        {messages.map((message, index) => (
          <Message
            key={index}
            message={message}
            currentUserId={user?.id || ""}
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
