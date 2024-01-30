import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import User from "models/user.model";

const isAuth = async (req: Req, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw Error();

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as {
      _id: string;
    };

    const user = await User.findOne({ where: { _id: decoded["_id"] } });
    if (!user) throw new Error();

    req.user = user.get({ plain: true });
    next();
  } catch (e) {
    res.status(401).send({
      code: 401,
      message: "You're not authenticated.",
    });
  }
};

export { isAuth };
