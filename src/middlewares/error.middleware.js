
const { z } = require("zod");
const handleMongooseError = require("./errors/handle-mongoose-error");
const handleZodError = require("./errors/handle-zod-error");

const errorMiddleware = (err, req, res, next) => {

  const zodResponse = handleZodError(err, res);
  if (zodResponse) {
    return zodResponse;
  }

  const mongooseResponse = handleMongooseError(err, res);
  if (mongooseResponse) {
    return mongooseResponse;
  }

  console.error(err);
  return res.status(500).json({ message: "Internal server error" });
};

module.exports = errorMiddleware;