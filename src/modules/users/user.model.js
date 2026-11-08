const mongoose = require("mongoose");
const { Schema } = mongoose;


const userSchema = new Schema({

  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    message: "El nombre debe tener al menos 3 caracteres y menos de 50 caracteres",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "El email no es válido",
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message: "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);