import { Router } from "express";
import { User as UserInterface } from "interfaces/user";
import { UserValidation, User } from "models/user.model";
import bcrypt from "bcrypt";

const router = Router();

router.post("/register", async (req, res) => {
    console.log(req.body);
    const data = req.body as UserInterface;
    const errors = UserValidation(data);

    if (errors) return res.status(400).json(errors);

    const user = await User.findOne({ where: { username: data.username } });
    if (user)
        return res.status(400).json({ message: "username already exists" });

    const newUser = await User.create({ ...data });
    //@ts-ignore
    return res.status(201).json({ token: newUser.token });
});

router.post("/login", async (req, res) => {
    const data = req.body as UserInterface;

    const user = await User.findOne({ where: { username: data.username } });
    if (!user) return res.status(400).json([{ message: "username not found" }]);

    // @ts-ignore
    const isMatch = await bcrypt.compare(data["password"], user.password);
    if (!isMatch) {
        return res.status(403).json({
            code: 400,
            message:
                "Password is incorrect, please double check your information and try again.",
        });
    }

    return res.status(200).json({
        message: "User signed in",
        //@ts-ignore
        token: user.token,
    });
});

export default router;
