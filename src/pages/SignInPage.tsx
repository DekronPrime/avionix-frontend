"use client";

import Link from "next/link";
import { AuthFormCard } from "../components/auth/AuthFormCard";
import { AuthHero } from "../components/auth/AuthHero";
import { AuthLayout } from "../components/auth/AuthLayout";
import InputField from "../components/modal/InputField";
import Button from "../components/common/Button";

import ImageBg from "@/public/images/auth-bg.webp";
import z from "zod";
import { signInSchema } from "../validation/signInSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type SignInSchema = z.infer<typeof signInSchema>;

export const SignInPage = () => {
  const auth = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: SignInSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log("SIGN IN DATA:", data);
    try {
      await auth.signIn(data);
      toast.success(`Welcome back!`);
      router.push("/flights");
    } catch (err: any) {
      console.log(err);
      toast.error("Invalid email or password");
    }
  };

  return (
    <AuthLayout
      left={
        <AuthHero imageSrc={ImageBg} slogan="Reaching the sky, efficiently" />
      }
      right={
        <AuthFormCard
          title="Sign In"
          switchText="Don't have an account?"
          switchHref="/auth/signup"
          switchLabel="Sign Up"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <InputField
              id="email"
              label="Enter Username or Email"
              required
              tooltip="In this field you can enter both: username or email"
              type="text"
              placeholder="Your login..."
              {...register("login")}
              error={errors.login?.message}
            />
            <div className="flex flex-col gap-2">
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
              <Link
                href="#"
                onClick={() => alert("Keep it up! 💪 You can do it 🤌")}
                className="text-sm w-fit ml-auto font-semibold font-inter text-foreground text-right hover:text-dark hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <div className="flex flex-col items-start gap-4">
              <p className="text-sm font-inter italic text-black">
                Fields marked with * are required.
              </p>
              <Button
                type="submit"
                variant="submit"
                size="md"
                className="w-full px-4"
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </div>
          </form>
        </AuthFormCard>
      }
    />
  );
};
