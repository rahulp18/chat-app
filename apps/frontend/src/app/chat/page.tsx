import Image from "next/image";
import React from "react";

type Props = {};
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

// If loading a variable font, you don't need to specify the font weight
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});
const ChatPage = (props: Props) => {
  return (
    <div className="h-full   flex items-center justify-center flex-col">
      <div className="flex flex-col items-center gap-2">
        <Image src={"/assets/logo.png"} alt="logo" height={60} width={160} />
        <h1 className={cn("text-4xl font-normal", montserrat.className)}>
          {" "}
          Welcome to Your Chat Hub{" "}
        </h1>
      </div>
      <div className="mt-5 flex items-center justify-center flex-col">
        <h1 className="text-lg text-center font-bold">
          Connect, Collaborate, and Communicate Effortlessly{" "}
        </h1>
        <p className="text-sm text-center max-w-[400px] font-normal text-gray-400">
          {" "}
          Stay connected and collaborate effortlessly with real-time messaging.
          Our chat app offers a secure, user-friendly platform for all your
          conversations{" "}
        </p>
      </div>
    </div>
  );
};

export default ChatPage;
