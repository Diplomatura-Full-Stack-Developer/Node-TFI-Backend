const { z } = require("zod");

const emptyAsMissing = (value) => (value === "" || value === null ? undefined : value);

const productSchemaValidation = z.object({
  category: z.string().min(3, { message: "La categoría no puede estar vacía" }),
  brand: z.string().min(3, { message: "La marca no puede estar vacía" }),
  model: z.string().min(3, { message: "El modelo no puede estar vacío" }).max(100, { message: "El modelo no puede tener más de 100 caracteres" }),
  price: z.preprocess(
    emptyAsMissing,
    z.coerce.number({ error: "El precio debe ser un número" })
      .min(0, { message: "El precio no puede ser negativo" }),
  ),
  stock: z.preprocess(
    emptyAsMissing,
    z.coerce.int({ error: "El stock debe ser un número entero" })
      .min(0, { message: "El stock no puede ser negativo" }),
  ),
  discount: z.preprocess(
    emptyAsMissing,
    z.coerce.number({ error: "El descuento debe ser un número" })
      .min(0, { message: "El descuento no puede ser negativo" })
      .max(40, { message: "El descuento no puede ser mayor a 40" }),
  ),
  offer: z.boolean(),
  deleted: z.boolean(),
  imageUrl: z.string().min(3, { message: "La URL de la imagen no puede estar vacía" }).max(100, { message: "La URL de la imagen no puede tener más de 100 caracteres" }),
  features: z.array(z.string()).min(1, { message: "Las características no pueden estar vacías" }),
});

module.exports = { productSchemaValidation };



