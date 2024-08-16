import Image from "next/image";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#e6ebf5] flex-col gap-3">
      <Image alt="logo" src={"/assets/logo.png"} height={30} width={120} />
      {children}
      <div className="mt-5">© 2024 Chatvia. Crafted with ❤️ by Rahul</div>
    </div>
  );
};

export default AuthLayout;
