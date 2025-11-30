import z from "zod";

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must contain at least 3 characters")
      .max(30, "Username is too long")
      .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers and _ are allowed"),
    firstName: z.string().min(2, "First name is too short"),
    lastName: z.string().min(2, "Last name is too short"),

    email: z.email("Invalid email format"),

    password: z.string().min(8, "Password must contain at least 8 characters"),

    confirmPassword: z
      .string()
      .min(8, "Confirm password must contain at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
