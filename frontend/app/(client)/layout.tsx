import NavbarComponent from "@/components/layout/Navbar";
import { ReactNode } from "react";

const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavbarComponent />
      <main>
        <div className="px-2 ma">{children}</div>
      </main>
    </>
  );
};

export default ClientLayout;
