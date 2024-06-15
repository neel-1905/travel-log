import { labelPlacement } from "@/constants/inputs";
import { Input, InputProps } from "@nextui-org/input";
import React, { forwardRef } from "react";

type FormInputProps = InputProps;

const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  const { errorMessage, ...other } = props;

  return (
    <Input
      {...other}
      ref={ref}
      labelPlacement={labelPlacement}
      classNames={{
        inputWrapper:
          "bg-transparent border border-primary-900 focus-within:border focus-within:border-primary-400 focus:bg-primary-500",
      }}
      errorMessage={errorMessage}
      isInvalid={!!errorMessage}
    />
  );
});

FormInput.displayName = "FormInput";

export default FormInput;
