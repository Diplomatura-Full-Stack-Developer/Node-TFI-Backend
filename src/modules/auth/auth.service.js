const userModel = require("../users/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");




const createUser = async (user) => {
  try {
    const existingUser = await userModel.findOne({ email: user.email });
    if (existingUser) {
      throw new Error("El usuario ya existe");
    }
    user.password = await bcryptjs.hash(user.password, 10);
    const newUser = await userModel.create(user);
    return newUser;
  } catch (error) {
    throw new Error("Error al crear el usuario: " + error.message);
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
    return { user, token };
  }
  catch (error) {
    throw new Error("Error al iniciar sesión: " + error.message);
  }
};


module.exports = { createUser, loginUser };