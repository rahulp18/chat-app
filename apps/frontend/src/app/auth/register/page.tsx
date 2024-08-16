import RegisterForm from "@/components/forms/register-form";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

type Props = {};

const Register = (props: Props) => {
  return (
    <div className="flex flex-col items-center  justify-center">
      <div className="flex flex-col items-center justify-center gap-2 mb-3">
        <h1 className="text-lg font-semibold">Register</h1>
        <p className="text-sm text-muted-foreground">
          Get your Chatvia account now.
        </p>
      </div>
      <Card className="md:w-[400px]  w-[90%]">
        <CardContent className="py-3">
          <RegisterForm />
        </CardContent>
      </Card>
      <div className="mt-6 flex items-center justify-center">
        <Link href={"/auth/login"}>
          Already have an account ?{" "}
          <span className="text-secondary cursor-pointer hover:underline transition-all duration-200">
            Signin
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Register;
