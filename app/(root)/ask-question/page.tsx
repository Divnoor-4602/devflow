import React from "react";
import Question from "@/components/forms/Question";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.action";

export default async function Page() {
  const { userId } = auth();

  // if user id does not exist in clerk redirect to login
  if (!userId) {
    redirect("/sign-in");
  }

  // if the userId exists get the user object from mongoDB
  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <div>
        <div className="h1-bold text-dark100_light900">Ask a Question</div>
        <div className="mt-9">
          {/* Question form */}
          <Question mongoUserId={JSON.stringify(mongoUser._id)} type="create" />
        </div>
      </div>
    </div>
  );
}
