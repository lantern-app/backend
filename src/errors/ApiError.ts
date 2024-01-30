class ApiError {
  message: string;
  code: number;

  constructor(code: number, message: string) {
    this.message = message;
    this.code = code;
  }

  static badRequest(msg: any) {
    return new ApiError(400, msg);
  }
}

export default ApiError;
