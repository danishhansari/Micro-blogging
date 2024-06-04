import { z } from "zod";

export const emailSchema = z.string().email().min(1).max(255);
const passwordSchema = z.string().min(6).max(255);

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  userAgent: z.string().optional(),
});

const registerSchema = loginSchema
  .extend({
    confirmPassword: z.string().min(6).max(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

const verificationCodeSchema = z.string().min(1).max(24);

const resetPasswordSchema = z.object({
  password: passwordSchema,
  verificationCode: verificationCodeSchema,
});

export {
  registerSchema,
  loginSchema,
  verificationCodeSchema,
  resetPasswordSchema,
};
