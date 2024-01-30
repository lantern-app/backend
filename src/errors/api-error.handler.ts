import ApiError from "./ApiError";

export const apiErrorHandler = (err: any, _req: Req, res: Res) => {
  if (err instanceof ApiError) {
    return res.status(err.code).json(err.message);
  }
};
