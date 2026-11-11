const { z } = require("zod");

const handleZodError = (err, res) => {
  if (!(err instanceof z.ZodError)) {
    return null;
  }

  return res.status(400).json({
    code: "VALIDATION_ERROR",
    form: err.form ?? null,
    message: "Datos inválidos",
    errors: err.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    })),
  });
};

module.exports = handleZodError;