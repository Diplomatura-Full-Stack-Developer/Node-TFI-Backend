

const express = require("express");
const authRouter = express.Router();
const { loginUser, registerUser } = require("./auth.controller");
const { validateMiddleware } = require("../../middlewares/validate.middleware");
const { loginSchemaValidation, userSchemaValidation } = require("../../validations/user.validation");



authRouter.post("/auth/login", validateMiddleware(loginSchemaValidation, "body", { form: "login" }), loginUser);

authRouter.post("/auth/register", validateMiddleware(userSchemaValidation, "body", { form: "register" }), registerUser);



module.exports = authRouter;