"use client";
import { fetchUsers } from "@/lib/actions/user.action";
import { User } from "@/types/index.type";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserCard from "./user-card";
import { useUser } from "@/contexts/user.context";

type Props = {};

const UserLists = (props: Props) => {
  const param = useSearchParams();

  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(false);
  const getAllUsers = async () => {
    setLoading(true);
    const res = await fetchUsers(param.get("search") || "");
    if (res.success) {
      setUsers(res.data);
    } else {
      toast.error(res.message);
      setUsers(null);
    }
    setLoading(false);
  };
  useEffect(() => {
    getAllUsers();
  }, [param.get("search")]);
  if (loading) {
    return <p className="px-4">Loading...</p>;
  }
  if (!users || users.length === 0) {
    return null;
  }
  const modifiedData = param.get("search") ? users : users.slice(0, 4);
  return (
    <div className="flex items-center justify-start px-4 gap-2 flex-wrap">
      {modifiedData.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserLists;
