type Req<TReqBody = any, TParams = any, TQuery = any, TResBody = any> = import("express").Request<TParams, TResBody, TReqBody, TQuery> & {
  user?: { _id: string };
};

type Res<TBody = any> = import("express").Response<TBody>;

type NextFn = import("express").NextFunction;
