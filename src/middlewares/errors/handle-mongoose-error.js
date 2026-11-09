const mongoose = require("mongoose");

const handleMongooseError = (err, res) => {
  if (err instanceof mongoose.Error.ValidationError || err.name === "CastError") {
    return res.status(400).json({ message: "Datos inválidos" });
  }

  if (err.name === "MongoServerError" && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({ message: `El ${field} ya está registrado` });
  }

  return null;
};

module.exports = handleMongooseError;