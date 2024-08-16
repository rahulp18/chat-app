"use client";
import ProfileButton from "@/components/common/profile/profile-button";
import Sidebar from "@/components/common/sidebar";
import Image from "next/image";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const ChatLayout = ({ children }: Props) => {
  return (
    <section className="flex flex-row h-screen">
      <div className="md:basis-[4%] drop-shadow flex justify-between flex-col  items-center py-4">
        <Image
          src={"/assets/logo-small.svg"}
          alt="logo"
          height={30}
          width={30}
        />
        <div className="">
          <ProfileButton />
        </div>
      </div>
      <div className="md:basis-[30%] bg-[#f5f7fb]">
        <Sidebar />
      </div>
      <div className="md:basis-[66%]">{children} </div>
    </section>
  );
};

export default ChatLayout;
