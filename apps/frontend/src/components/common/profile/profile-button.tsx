"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/user.context";
type Props = {};

const ProfileButton = (props: Props) => {
  const router = useRouter();
  const { logout } = useUser();
  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };
  return (
    <Popover>
      <PopoverTrigger className="p-1 bg-white rounded-full">
        <Image
          src={"https://randomuser.me/api/portraits/men/1.jpg"}
          alt="profile"
          height={30}
          width={30}
          className="rounded-full"
        />
      </PopoverTrigger>
      <PopoverContent className="w-auto px-1 py-2 ml-5">
        <div className="flex flex-col gap-1  ">
          <div className="flex gap-4 items-center justify-between text-sm text-muted-foreground hover:bg-blue-50 px-4 py-1 cursor-pointer">
            <p className="">Profile</p> <User size={14} />
          </div>
          <div className="flex gap-4 items-center justify-between text-sm text-muted-foreground hover:bg-blue-50 px-4 py-1 cursor-pointer">
            <p className="">Setting</p> <Settings size={14} />
          </div>
          <Separator />
          <div
            onClick={handleLogout}
            className="flex gap-4 justify-between items-center text-sm text-muted-foreground hover:bg-blue-50 px-4 py-1 cursor-pointer"
          >
            <p className="">Logout</p> <LogOut size={14} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ProfileButton;
