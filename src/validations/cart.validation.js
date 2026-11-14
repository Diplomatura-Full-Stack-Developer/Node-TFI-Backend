const { z } = require("zod");

const emptyAsMissing = (value) => (value === "" || value === null ? undefined : value);

const objectIdSchema = z
  .string()
  .regex(/^[a-fA-F0-9]{24}$/, { message: "El id no tiene un formato válido" });

const cartItemSchema = z.object({
  productId: objectIdSchema,
  quantity: z.preprocess(
    emptyAsMissing,
    z.coerce.number({ error: "El stock debe ser un número entero" })
      .int({ error: "El stock debe ser un número entero" })
      .min(0, { message: "El stock no puede ser negativo" }),
  )
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