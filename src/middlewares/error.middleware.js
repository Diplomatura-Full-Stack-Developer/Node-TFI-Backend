
const { z } = require("zod");
const handleMongooseError = require("./errors/handle-mongoose-error");
const handleZodError = require("./errors/handle-zod-error");
const handleAppError = require("./errors/handle-app-error");
const handleUnknownError = require("./errors/handle-unknow-error");

const errorMiddleware = (err, req, res, next) => {

  const zodResponse = handleZodError(err, res);
  if (zodResponse) {
    return zodResponse;
  }

  const mongooseResponse = handleMongooseError(err, res);
  if (mongooseResponse) {
    return mongooseResponse;
  }

  const appResponse = handleAppError(err, res);
  if (appResponse) {
    return appResponse;
  }

  return handleUnknownError(err, res);
};

module.exports = errorMiddleware;