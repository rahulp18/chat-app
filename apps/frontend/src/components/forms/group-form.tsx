"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
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

import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import Image from "next/image";
import { Input } from "../ui/input";
import { toast } from "react-toastify";
import { User } from "@/types/index.type";
import { createGroupChat } from "@/lib/actions/chats.action";
import { useRouter } from "next/navigation";

type Props = {
  onClose: () => void;
  users: User[];
};
const FormSchema = z.object({
  users: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  name: z.string().min(2),
});
const CreateGroupForm = ({ onClose, users }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      users: [],
      name: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);

    const res = await createGroupChat(data);

    if (res.success) {
      router.push(`/chat/${res.data.id}`);
      router.refresh();
      onClose();
    } else {
      toast.error(res.message);
    }
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  px-2">
        <FormField
          control={form.control}
          name="users"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Users</FormLabel>
                <FormDescription>
                  Select the user you want to add in the group.
                </FormDescription>
              </div>
              <div className="flex gap-2 flex-wrap">
                {users.slice(0, 5).map((user, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name="users"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={user.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(user.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, user.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== user.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal flex flex-col items-center ">
                            <div className="bg-white p-1  rounded-full">
                              <Image
                                src={user.avatarUrl || "/assets/default.png"}
                                alt="user"
                                className="object-contain rounded-full"
                                height={30}
                                width={30}
                              />
                            </div>
                            {user.fullname}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter group name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-3 items-center">
          <Button onClick={onClose} variant={"destructive"} type="reset">
            Cancel
          </Button>
          <Button
            disabled={loading}
            variant={"secondary"}
            className="hover:bg-green-500/60 bg-green-500 text-white"
            type="submit"
          >
            {loading ? "Loading..." : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateGroupForm;
