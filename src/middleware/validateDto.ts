import type { AnyZodObject } from "zod";

import ApiError from "../errors/ApiError";

export const validateDto = (schema: AnyZodObject) => {
  return (req: Req, _res: Res, next: NextFn) => {
    try {
      const validatedBody = schema.parse(req.body);
      // replace request body with validated schema object
      // so that no unknown value passes thru
      req.body = validatedBody;
      next();
    } catch (err: any) {
      next(ApiError.badRequest(err));
    }
  };
};
