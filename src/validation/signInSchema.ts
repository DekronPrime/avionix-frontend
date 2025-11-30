import z from "zod";

const usernameRegex = /^[a-zA-Z0-9_]+$/;

export const signInSchema = z.object({
  login: z
    .string()
    .min(3, "Login must be at least 3 characters")
    .refine(
      (val) => {
        const isEmail = z.email().safeParse(val).success;
        const isUsername = usernameRegex.test(val);
        return isEmail || isUsername;
      },
      {
        message: "Enter a valid username or email",
      }
    ),

  password: z.string().min(8, "Password must contain at least 8 characters"),
});
