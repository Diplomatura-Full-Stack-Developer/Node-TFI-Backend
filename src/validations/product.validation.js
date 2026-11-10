const { z } = require("zod");

const productSchema = z.object({
  category: z.string().min(3, { message: "La categoría no puede estar vacía" }),
  brand: z.string().min(3, { message: "La marca no puede estar vacía" }),
  model: z.string().min(3, { message: "El modelo no puede estar vacía" }).max(100, { message: "El modelo no puede tener más de 100 caracteres" }),
  price: z.number().min(0, { message: "El precio no puede ser negativo" }),
  stock: z.number().min(0, { message: "El stock no puede ser negativo" }),
  offer: z.boolean(),
  discount: z.number().min(0, { message: "El descuento no puede ser negativo" }).max(40, { message: "El descuento no puede ser mayor a 40" }),
  deleted: z.boolean(),
  imageUrl: z.string().min(3, { message: "La URL de la imagen no puede estar vacía" }).max(100, { message: "La URL de la imagen no puede tener más de 100 caracteres" }),
  features: z.array(z.string()).min(1, { message: "Las características no pueden estar vacías" }),
});

module.exports = { productSchema };