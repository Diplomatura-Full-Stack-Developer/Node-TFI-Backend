


const validateMiddleware = (schema, source = "body", meta = {}) => (req, res, next) => {
  const result = schema.safeParse(req[source]);

  if (!result.success) {
    result.error.form = meta.form ?? null;
    return next(result.error);
  }

  req[source] = result.data;
  next();
};

module.exports = { validateMiddleware };