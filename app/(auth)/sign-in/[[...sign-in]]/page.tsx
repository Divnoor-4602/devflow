import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-auth-light bg-cover bg-center bg-no-repeat dark:bg-auth-dark">
        <SignIn path="/sign-in" />
      </div>
    </>
  );
}
