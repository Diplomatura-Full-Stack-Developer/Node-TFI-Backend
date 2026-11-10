class AppError extends Error {
  constructor(code, message, statusCode) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;