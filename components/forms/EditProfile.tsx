"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { updateUser } from "@/lib/actions/user.action";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  userDetails: any;
}

const formSchema = z.object({
  fullName: z.string(),
  username: z.string(),
  portfolioWebsite: z.string(),
  location: z.string(),
  bio: z.string(),
});

const EditProfile = ({ userDetails }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  // parsed user details
  const parsedUserDetails = JSON.parse(userDetails);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: parsedUserDetails.name || "",
      username: parsedUserDetails.username || "",
      portfolioWebsite: parsedUserDetails.portfolioWebsite || "",
      location: parsedUserDetails.location || "",
      bio: parsedUserDetails.bio || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // update the user
    try {
      await updateUser({
        clerkId: parsedUserDetails.clerkId,
        updateData: {
          name: values.fullName,
          username: values.username,
          portfolioWebsite: values.portfolioWebsite,
          location: values.location,
          bio: values.bio,
        },
        path: pathname,
      });

      toast.success("Details updated successfully");

      router.push(`/profile/${parsedUserDetails.clerkId}`);
    } catch (error) {
      console.log(error);
      toast.error("Error updating user");
    } finally {
      setIsSubmitting(false);
    }

    // redirect to the profile page
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 flex w-full flex-col gap-[36px]"
        >
          {/* Full name  */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Full Name <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="no-focus paragraph-regular background-light800_dark300 light-border-2 text-dark300_light700 min-h-[56px]"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Username <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="no-focus paragraph-regular background-light800_dark300 light-border-2 text-dark300_light700 min-h-[56px]"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Portfolio Link */}
          <FormField
            control={form.control}
            name="portfolioWebsite"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Portoflio Link
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="no-focus paragraph-regular background-light800_dark300 light-border-2 min-h-[56px] text-accent-blue"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Location
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="no-focus paragraph-regular background-light800_dark300 light-border-2 text-dark300_light700 min-h-[56px]"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Bio */}
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-3.5">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Bio <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="no-focus paragraph-regular background-light800_dark300 light-border-2 text-dark300_light700 min-h-[56px]"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* edit profile button */}
          <Button
            className="primary-gradient min-h-[46px] w-fit self-end px-4 py-3 text-light-900"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Editing..." : "Edit Profile"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EditProfile;
