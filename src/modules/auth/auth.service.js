const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("./auth.model");
const AppError = require("../../utils/classes/app-error");

const createUser = async (user) => {
  try {
    const existingUser = await userModel.findOne({ email: user.email });
    if (existingUser) {
      throw new AppError("DUPLICATE_KEY", "Ya existe un usuario con este email", 409);
    }
    user.password = await bcryptjs.hash(user.password, 10);
    const newUser = await userModel.create(user);
    const token = signToken(newUser);
    return { user: newUser, token };
  } catch (error) {
    throw error;
  }
};

const loginUser = async (email, password) => {
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new AppError("INVALID_CREDENTIALS", "Ingresar un email y contraseña válidos", 401);
  }
  if (!(await bcryptjs.compare(password, user.password))) {
    throw new AppError("INVALID_CREDENTIALS", "Ingresar un email y contraseña válidos", 401);
  }
  const token = signToken(user);
  return { user, token };
};


const refreshToken = async (payload) => {
  const user = await userModel.findById(payload.userId);
  if (!user) {
    throw new AppError("USER_NOT_FOUND", "Usuario no encontrado", 401);
  }
  const token = signToken(user);
  if (!token) {
    throw new AppError("TOKEN_REFRESH_ERROR", "Error al refrescar el token", 500);
  }
  return { user, newToken: token };
};

const signToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '60s' });
}

module.exports = { createUser, loginUser, refreshToken };