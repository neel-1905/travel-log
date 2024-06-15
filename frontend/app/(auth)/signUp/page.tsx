import SignUpForm from "@/components/auth/SignUpForm";
import React from "react";

const page = () => {
  return (
    <div className="h-screen mx-auto flex flex-col max-w-md justify-center gap-10">
      <div>
        <h1 className="text-primary-900 text-4xl text-center">Sign Up</h1>
      </div>
      <SignUpForm />
    </div>
  );
};

export default page;
