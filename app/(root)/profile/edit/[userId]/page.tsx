import React from "react";
import EditProfile from "@/components/forms/EditProfile";
import { getUserById } from "@/lib/actions/user.action";

const Page = async ({ params }: { params: { userId: string } }) => {
  const user = await getUserById({ userId: params.userId });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900 mt-9">Edit Profile</h1>
      <EditProfile userDetails={JSON.stringify(user)} />
    </>
  );
};

export default Page;
