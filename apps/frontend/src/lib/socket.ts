import { io, Socket } from "socket.io-client";

let socket: Socket;
const URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
export const connectSocket = (token: string) => {
  console.log({ token });
  socket = io(URL, {
    query: { token },
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    console.log("Connected to server");
  });
  socket.on("disconnect", () => {
    console.log("disconnected to server");
  });
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not initialized");
  }
  return socket;
};
