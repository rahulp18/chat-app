"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {};
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Lock, Mail, User } from "lucide-react";
import { toast } from "react-toastify";
import api from "@/config/api";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { loginUser } from "@/lib/actions/user.action";

const formSchema = z.object({
  email: z.string().min(2),
  password: z.string(),
});
const LogInForm = (props: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    const res = await loginUser(values);
    if (res.success) {
      toast.success("Login successful");
      setCookie("token", res.data.access_token);
      form.reset();
      router.push("/chat");
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(res.message);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="flex">
                  <div className="px-[8px] flex items-center justify-center bg-gray-100 text-gray-500">
                    <Mail size={16} />
                  </div>
                  <Input
                    className="rounded-none"
                    placeholder="Enter your Email"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="flex">
                  <div className="px-[8px] flex items-center justify-center bg-gray-100 text-gray-500">
                    <Lock size={16} />
                  </div>
                  <Input
                    className="rounded-none"
                    placeholder="Enter your password"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant={"secondary"}
          type="submit"
          className="w-full mt-5 hover:bg-secondary-foreground hover:text-secondary text-white"
        >
          Submit
        </Button>
        <p className="text-sm text-center text-gray-400">
          By registering you agree to the Chatvia{" "}
          <span className="text-secondary cursor-pointer hover:underline transition-all duration-100">
            Terms of use
          </span>
        </p>
      </form>
    </Form>
  );
};

export default LogInForm;
