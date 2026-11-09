const AppError = require("../../utils/classes/app-error");


const handleAppError = (err, res) => {
  if (!(err instanceof AppError)) {
    return null;
  }

  return res.status(err.statusCode).json({ message: err.message });
};


module.exports = handleAppError;