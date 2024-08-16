import React from "react";
import SidebarHeader from "./sidebar-header";
import ChatLists from "./chat-list";
import UserLists from "./user-lists";

type Props = {};

const Sidebar = (props: Props) => {
  return (
    <div className="  flex flex-col cursor-pointer h-full">
      <SidebarHeader />
      <UserLists />
      <ChatLists />
    </div>
  );
};

export default Sidebar;
