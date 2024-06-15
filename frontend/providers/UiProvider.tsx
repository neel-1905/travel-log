import { NextUIProvider } from "@nextui-org/system";
import { ReactNode } from "react";

const UiProvider = ({ children }: { children: ReactNode }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default UiProvider;
