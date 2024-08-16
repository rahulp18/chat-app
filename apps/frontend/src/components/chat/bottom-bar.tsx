import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

type Props = {};

const BottomBar = (props: Props) => {
  return (
    <div className="flex gap-3">
      <Input placeholder="Enter message..." className="flex-1" />
      <Button
        variant={"default"}
        className="hover:bg-green-600/60 bg-green-500"
        size={"icon"}
      >
        <Send size={16} className="text-white" />
      </Button>
    </div>
  );
};

export default BottomBar;
