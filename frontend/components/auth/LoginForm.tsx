"use client";

import { Spinner } from "@nextui-org/spinner";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormInput from "../inputs/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidations } from "@/validations/login.validations";
import PrimaryButton from "../inputs/PrimaryButton";
import Link from "next/link";

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
    resolver: zodResolver(loginValidations),
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
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col gap-4">
          <FormInput
            label="Email"
            {...register("email")}
            isClearable
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email?.message}
          />
          <FormInput
            label="Password"
            type="password"
            {...register("password")}
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password?.message}
          />

          <PrimaryButton type="submit">
            {isSubmitting ? <Spinner /> : "Submit"}
          </PrimaryButton>

          <p className="text-center text-primary-800">
            Not a member?{" "}
            <Link href={`/signUp`} className="hover:text-primary-600">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
