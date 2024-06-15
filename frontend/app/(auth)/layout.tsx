import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <div className="px-3">{children}</div>
    </main>
  );
};

export default AuthLayout;
