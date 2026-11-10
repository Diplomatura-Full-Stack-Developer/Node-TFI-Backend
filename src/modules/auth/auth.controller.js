const authService = require("./auth.service");


const toPublicUser = (user) => {
  return {
    userId: user.id,
    name: user.name,
    email: user.email,
  }
}


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.loginUser(email, password);
  return res.status(200).json({
    message: "Inicio de sesión exitoso",
    user: toPublicUser(user),
    token,
  });
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await authService.createUser({ name, email, password });
  return res.status(200).json({
    message: "Usuario registrado exitoso",
    user: toPublicUser(newUser.user),
    token: newUser.token,
  });
};
module.exports = { loginUser, registerUser };