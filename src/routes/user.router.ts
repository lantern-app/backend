import bcrypt from "bcrypt";
import { Router } from "express";

import { TUser } from "interfaces/user";
import { validateDto } from "middleware/validateDto";
import User from "models/user.model";
import { loginSchema, registerSchema } from "validators/auth.validators";

const router = Router();

router.post("/register", validateDto(registerSchema), async (req: Req<TUser>, res) => {
  const data = req.body;

  const user = await User.findOne({ where: { username: data.username } });
  if (user) return res.status(400).json({ message: "Username already exists" });

  const newUser = await User.create({ ...data });
  return res.status(201).json({ token: newUser.token, user: newUser });
});

router.post("/login", validateDto(loginSchema), async (req: Req<TUser>, res) => {
  const data = req.body;

  const user = await User.findOne({ where: { username: data.username } });
  if (!user) return res.status(400).json({ message: "username not found" });

  const isMatch = await bcrypt.compare(data["password"], user.password);
  if (!isMatch) {
    return res.status(403).json({
      code: 400,
      message: "Password is incorrect, please double check your information and try again.",
    });
  }

  return res.status(200).json({
    message: "User signed in",
    token: user.token,
    user,
  });
});

export default router;
