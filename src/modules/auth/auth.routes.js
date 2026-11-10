

const express = require("express");
const authRouter = express.Router();
const { loginUser, registerUser } = require("./auth.controller");
const { validateMiddleware } = require("../../middlewares/validate.middleware");
const { loginSchemaValidation, userSchemaValidation } = require("../../validations/user.validation");



authRouter.post("/auth/login", validateMiddleware(loginSchemaValidation), loginUser);

authRouter.post("/auth/register", validateMiddleware(userSchemaValidation), registerUser);



module.exports = authRouter;