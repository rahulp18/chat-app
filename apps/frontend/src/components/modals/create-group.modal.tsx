"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus, Search } from "lucide-react";
import { Input } from "../ui/input";
import CreateGroupForm from "../forms/group-form";
import { User } from "@/types/index.type";
import { fetchUsers } from "@/lib/actions/user.action";
import { toast } from "react-toastify";

type Props = {};

const CreateGroupModal = (props: Props) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(false);
  const getAllUsers = async () => {
    setLoading(true);
    const res = await fetchUsers(search);
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
  }, [search]);
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger
        onClick={() => setIsOpen(true)}
        className="text-xs w-auto h-auto px-2 py-1 bg-green-500 flex rounded-sm hover:bg-green-500/60 text-white"
      >
        Create Group <Plus size={14} className="ml-2" />
      </DialogTrigger>
      <DialogContent className="max-h-[500px]">
        <DialogHeader>
          <DialogTitle>Want to Create group ?</DialogTitle>
        </DialogHeader>
        <div className="h-[400px] flex flex-col">
          <div className="my-5 bg-[#E6EBF5] flex items-center gap-1 border py-1 border-gray-50 px-2 rounded-md shadow">
            <Search size={18} className="text-[#495057]" />
            <Input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Search for user"
              className="bg-transparent text-[#495057] shadow-none focus-visible:ring-offset-0 focus-visible:ring-0 border-none "
            />
          </div>
          <div className="flex-1   overflow-y-auto">
            <CreateGroupForm
              users={users || []}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupModal;
