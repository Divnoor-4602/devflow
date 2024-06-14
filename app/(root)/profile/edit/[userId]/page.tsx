import React from "react";
import EditProfile from "@/components/forms/EditProfile";
import { getUserById } from "@/lib/actions/user.action";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { userId: string };
}): Promise<Metadata> {
  const user = await getUserById({ userId: params.userId });

  return {
    title: `Edit ${user.name}'s Profile`,
    description: `Edit the profile of ${user.name}`,
  };
}

export default async function Page({ params }: { params: { userId: string } }) {
  const user = await getUserById({ userId: params.userId });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 mt-9">Edit Profile</h1>
      <EditProfile userDetails={JSON.stringify(user)} />
    </>
  );
}
