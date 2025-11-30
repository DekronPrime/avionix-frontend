"use client";

import { AuthFormCard } from "../components/auth/AuthFormCard";
import { AuthHero } from "../components/auth/AuthHero";
import { AuthLayout } from "../components/auth/AuthLayout";

import ImageBg from "@/public/images/auth-bg.webp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import Button from "../components/common/Button";
import InputField from "../components/modal/InputField";
import { useCheckField } from "../hooks/useCheckField";
import { signUpSchema } from "../validation/signUpSchema";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type SignUpSchema = z.infer<typeof signUpSchema>;

export const SignUpPage = () => {
  const auth = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const usernameStatus = useCheckField("username", watch("username"), 3);
  const emailStatus = useCheckField("email", watch("email"), 5);

  const onSubmit = async (data: SignUpSchema) => {
    if (usernameStatus === "taken") return;
    if (emailStatus === "taken") return;

    const { confirmPassword, ...payload } = data;
    await new Promise((resolve) => setTimeout(resolve, 800));

    console.log("SIGN UP DATA:", payload);
    try {
      await auth.signUp(data);
      toast.success("Successfully signed up!");
      router.push("/flights");
    } catch (err: any) {
      console.log(err);
      toast.error(
        err?.response?.data?.message || "Invalid data. Something went wrong!"
      );
    }
  };

  return (
    <AuthLayout
      left={
        <AuthHero
          imageSrc={ImageBg}
          slogan="The intelligence behind your airline"
        />
      }
      right={
        <AuthFormCard
          title="Sign Up"
          switchText="Already have an account?"
          switchHref="/auth/signin"
          switchLabel="Sign In"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <InputField
              id="username"
              label="Enter Username"
              required
              tooltip="Username must contain from 3 to 30 characters. Only letters, numbers and _ are allowed"
              type="text"
              placeholder="json_statham"
              {...register("username")}
              error={errors.username?.message}
              note={"This username"}
              noteStatus={usernameStatus}
            />
            <InputField
              id="firstName"
              label="Enter First Name"
              required
              type="text"
              placeholder="Jason"
              {...register("firstName")}
              error={errors.firstName?.message}
            />
            <InputField
              id="lastName"
              label="Enter Last Name"
              required
              type="text"
              placeholder="Statham"
              {...register("lastName")}
              error={errors.lastName?.message}
            />
            <InputField
              id="email"
              label="Enter Email"
              required
              tooltip="Email must include '@' character"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              error={errors.email?.message}
              note={"This email"}
              noteStatus={emailStatus}
            />
            <InputField
              id="password"
              label="Enter Password"
              required
              tooltip="Password must include at least 8 characters"
              type="password"
              placeholder="Your password..."
              {...register("password")}
              error={errors.password?.message}
            />
            <InputField
              id="confirmPassword"
              label="Confirm Password"
              required
              type="password"
              placeholder="Confirm your password..."
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />

            <div className="flex flex-col items-start gap-4">
              <p className="text-xs font-inter italic text-black">
                Fields marked with * are required.
              </p>
              <Button
                type="submit"
                variant="submit"
                size="md"
                className="w-full px-4"
              >
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </Button>
            </div>
          </form>
        </AuthFormCard>
      }
    />
  );
};
