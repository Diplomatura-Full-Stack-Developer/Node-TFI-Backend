const { z } = require("zod");


const userSchemaValidation = z.object({
  name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  email: z.email({ pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "El email no tiene un formato válido." }).min(3),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo."),
});

const loginSchemaValidation = z.object({
  email: z.email({ pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "El email no tiene un formato válido." }),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo."),
});

module.exports = { userSchemaValidation, loginSchemaValidation };