import { Button, ButtonProps } from "@nextui-org/button";
import React, { FC } from "react";

type PrimaryButton = {} & ButtonProps;

const PrimaryButton: FC<PrimaryButton> = (props) => {
  const { children, ...other } = props;

  return (
    <Button
      {...other}
      variant="solid"
      className="text-primary-50 bg-primary-900 border border-primary-900"
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
