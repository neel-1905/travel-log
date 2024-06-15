import LoginForm from "@/components/auth/LoginForm";
import React from "react";

const page = () => {
  return (
    <>
      <div className="h-screen mx-auto flex flex-col max-w-md justify-center gap-10">
        <div>
          <h1 className="text-primary-900 text-4xl text-center">LOGIN</h1>
        </div>
        <LoginForm />
      </div>
    </>
  );
};

export default page;
