"use client";
import CreateGroupModal from "@/components/modals/create-group.modal";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const SidebarHeader = (props: Props) => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState<string>(
    searchParams.get("search") || ""
  );
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (search) {
      newSearchParams.set("search", search);
    } else {
      newSearchParams.delete("search");
    }
    router.replace(`${pathName}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  }, [search]);

  return (
    <div className="py-4 px-5">
      <h1 className="text-xl font-semibold">Chats</h1>
      <div className="my-5 bg-[#E6EBF5] flex items-center gap-1 border py-1 border-gray-50 px-2 rounded-md shadow">
        <Search size={18} className="text-[#495057]" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for user"
          className="bg-transparent text-[#495057] shadow-none focus-visible:ring-offset-0 focus-visible:ring-0 border-none "
        />
      </div>
      <div className="flex justify-between">
        <h1 className="text-base font-medium">Recent</h1>
        <CreateGroupModal />
      </div>
    </div>
  );
};

export default SidebarHeader;
