"use client";

import { Spinner } from "@nextui-org/spinner";
import { useForm } from "react-hook-form";
import FormInput from "../inputs/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpValidations } from "@/validations/login.validations";
import PrimaryButton from "../inputs/PrimaryButton";
import Link from "next/link";
import { createUser } from "@/services/auth/authService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type SignUp_FORM = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SignUp_FORM>({
    mode: "all",
    resolver: zodResolver(signUpValidations),
  });

  const onSubmit = async (data: SignUp_FORM) => {
    const { confirmPassword, ...other } = data;

    const res = await createUser(other);
    if (!res.success) {
      toast.error(res.message);
    } else {
      toast.success(res.message);
      router.push("/login");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col gap-4">
          <FormInput
            label="Username"
            {...register("username")}
            isClearable
            errorMessage={errors.username?.message}
            isInvalid={!!errors.username?.message}
          />
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
          <FormInput
            label="Confirm Password"
            type="password"
            {...register("confirmPassword")}
            errorMessage={errors.confirmPassword?.message}
            isInvalid={!!errors.confirmPassword?.message}
          />

          <PrimaryButton type="submit">
            {isSubmitting ? <Spinner /> : "Submit"}
          </PrimaryButton>

          <p className="text-center text-primary-800">
            Already a member?{" "}
            <Link
              href={`/login`}
              className="text-primary hover:text-primary-600"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
