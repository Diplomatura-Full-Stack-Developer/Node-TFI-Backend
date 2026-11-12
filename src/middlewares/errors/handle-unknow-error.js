const handleUnknowError = (err, res) => {
  console.error(err);

  return res.status(500).json({
    code: "INTERNAL_ERROR",
    message: "Internal server error",
  });
};

module.exports = handleUnknowError;