import { object, string, enum as zEnum } from "zod";

export const loginSchema = object({
  username: string().min(3),
  password: string().min(8),
});

export const registerSchema = object({
  username: string().min(3),
  name: string(),
  password: string().min(8),
  gender: zEnum(["male", "female"]),
});
