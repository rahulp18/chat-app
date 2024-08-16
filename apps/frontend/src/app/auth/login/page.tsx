import LogInForm from "@/components/forms/login-form";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

type Props = {};

const LogIn = (props: Props) => {
  return (
    <div className="flex flex-col items-center   justify-center">
      <div className="flex flex-col items-center justify-center gap-2 mb-3">
        <h1 className="text-lg font-semibold">Login</h1>
        <p className="text-sm text-muted-foreground">
          Login to your Chatvia account now.
        </p>
      </div>
      <Card className="md:w-[400px]  w-[90%]">
        <CardContent className="py-3">
          <LogInForm />
        </CardContent>
      </Card>
      <div className="mt-6 flex items-center justify-center">
        <Link href={"/auth/register"}>
          Don't have an account ?{" "}
          <span className="text-secondary cursor-pointer hover:underline transition-all duration-200">
            Register
          </span>
        </Link>
      </div>
    </div>
  );
};

export default LogIn;
