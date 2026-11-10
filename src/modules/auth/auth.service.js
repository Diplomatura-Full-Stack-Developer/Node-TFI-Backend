const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("./auth.model");
const AppError = require("../../utils/classes/app-error");

const createUser = async (user) => {
  try {
    const existingUser = await userModel.findOne({ email: user.email });
    if (existingUser) {
      throw new AppError("DUPLICATE_KEY", "El usuario ya existe", 409);
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
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    if (!(await bcryptjs.compare(password, user.password))) {
      throw new Error("Contraseña incorrecta");
    }
    const token = signToken(user);
    return { user, token };
  }
  catch (error) {
    throw new Error("Error al iniciar sesión: " + error.message);
  }
};

const signToken = (user) => {
  return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

module.exports = { createUser, loginUser };