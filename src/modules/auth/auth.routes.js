

const express = require("express");
const { loginUser, registerUser } = require("./auth.controller");

const authRouter = express.Router();



authRouter.post("/auth/login", loginUser);

authRouter.post("/auth/register", registerUser);



module.exports = authRouter;