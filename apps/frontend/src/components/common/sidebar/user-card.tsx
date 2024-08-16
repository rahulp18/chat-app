import { createSingleChat } from "@/lib/actions/chats.action";
import { User } from "@/types/index.type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  const router = useRouter();
  const createChat = async (id: string) => {
    const res = await createSingleChat(id);

    if (res.success) {
      router.push(`/chat/${res.data.id}`);
      router.refresh();
    } else {
      toast.error(res.message);
    }
  };
  return (
    <div
      className="flex flex-col items-center bg-gray-300/30 px-4 py-3 rounded-md"
      onClick={() => createChat(user.id)}
    >
      <div className="bg-white p-1  rounded-full">
        <Image
          src={user.avatarUrl || "/assets/default.png"}
          alt="user"
          className="object-contain rounded-full"
          height={30}
          width={30}
        />
      </div>
      <p className="text-xs font-medium text-muted-foreground">
        {user.fullname}
      </p>
    </div>
  );
};

export default UserCard;
