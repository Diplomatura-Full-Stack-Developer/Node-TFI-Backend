const authService = require("./auth.service");


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await authService.loginUser(email, password);
    return res.status(200).json({ message: 'Inicio de sesión exitoso', user, token });
  } catch (error) {
    return res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
  }
};


const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await authService.createUser({ username: name, email, password });
    if (!newUser) {
      return res.status(401).json({ message: 'Error al registrar usuario' });
    }
    return res.status(200).json({ message: 'Usuario registrado exitoso', newUser });
  } catch (error) {
    return res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
};



module.exports = { loginUser, registerUser };