const authService = require("./auth.service");
const { userSchema } = require("../../validations/user.validation");


const toPublicUser = (user) => {
  return {
    userId: user.id,
    name: user.name,
    email: user.email,
  }
}


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await authService.loginUser(email, password);
    return res.status(200).json({ message: 'Inicio de sesión exitoso', user: toPublicUser(user), token: token });
  } catch (error) {
    return res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};


const registerUser = async (req, res) => {

  const validation = userSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ message: 'Datos inválidos', error: validation.error.message });
  }
  const { name, email, password } = validation.data;
  try {
    const newUser = await authService.createUser({ name, email, password });
    return res.status(200).json({ message: 'Usuario registrado exitoso', user: toPublicUser(newUser.user), token: newUser.token });
  } catch (error) {
    return res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
};



module.exports = { loginUser, registerUser };