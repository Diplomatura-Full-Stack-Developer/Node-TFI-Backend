const { z } = require("zod");

const objectIdSchema = z
  .string()
  .regex(/^[a-fA-F0-9]{24}$/, { message: "El id no tiene un formato válido" });

const cartItemSchema = z.object({
  productId: objectIdSchema,
  quantity: z.coerce
    .int({ error: "La cantidad debe ser un número entero" })
    .min(1, { message: "La cantidad mínima es 1" }),
});

const cartSchemaValidation = z.object({
  userId: objectIdSchema,
  products: z
    .array(cartItemSchema)
    .min(1, { message: "El carrito debe tener al menos un producto" }),
});

const createCartSchemaValidation = z.object({
  userId: objectIdSchema,
  productId: objectIdSchema,
});

const addProductToCartSchemaValidation = z.object({
  productId: objectIdSchema,
});

const cartUserParamsSchemaValidation = z.object({
  userId: objectIdSchema,
});

const cartParamsSchemaValidation = z.object({
  id: objectIdSchema,
});

const removeProductParamsSchemaValidation = z.object({
  id: objectIdSchema,
  productId: objectIdSchema,
});

module.exports = {
  cartSchemaValidation,
  createCartSchemaValidation,
  addProductToCartSchemaValidation,
  cartUserParamsSchemaValidation,
  cartParamsSchemaValidation,
  removeProductParamsSchemaValidation,
};