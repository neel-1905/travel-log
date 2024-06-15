"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type LOGIN_FORM = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (session?.user) {
        router.push("/");
      }
    })();
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LOGIN_FORM>({
    mode: "all",
  });

  const onSubmit = async (data: LOGIN_FORM) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/");
    }

    if (!res?.ok) {
      // console.log(res);
      alert(res?.error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <Input
            label="Email"
            labelPlacement="outside"
            className="border border-gray-400"
            {...register("email", {
              required: "Email is required!",
            })}
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email?.message}
          />
          <Input
            label="Password"
            type="password"
            labelPlacement="outside"
            className="border border-gray-400"
            {...register("password", {
              required: "Password is required!",
            })}
            errorMessage={errors.password?.message}
          />

          <Button type="submit">{isSubmitting ? <Spinner /> : "Submit"}</Button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
