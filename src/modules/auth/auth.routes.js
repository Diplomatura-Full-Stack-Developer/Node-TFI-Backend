

const express = require("express");
const authRouter = express.Router();
const { loginUser, registerUser, refreshToken } = require("./auth.controller");
const { authenticateRefreshToken } = require("../../middlewares/auth.middleware");
const { validateMiddleware } = require("../../middlewares/validate.middleware");
const { loginSchemaValidation, userSchemaValidation } = require("../../validations/user.validation");

authRouter.post("/auth/login", validateMiddleware(loginSchemaValidation, "body", { form: "login" }), loginUser);

authRouter.post("/auth/register", validateMiddleware(userSchemaValidation, "body", { form: "register" }), registerUser);

authRouter.post("/auth/refresh-token", authenticateRefreshToken, refreshToken);

module.exports = authRouter;