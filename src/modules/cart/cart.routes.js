const express = require("express");
const { authenticateJWT } = require("../../middlewares/auth.middleware");
const { getCartByUserId, createCart, addProductToCart, removeProductFromCart } = require("./cart.controller");
const { validateMiddleware } = require("../../middlewares/validate.middleware");
const { cartUserParamsSchemaValidation, createCartSchemaValidation, cartParamsSchemaValidation, addProductToCartSchemaValidation, removeProductParamsSchemaValidation } = require("../../validations/cart.validation");


const cartRouter = express.Router();


cartRouter.get(
  "/cart/:userId",
  authenticateJWT,
  validateMiddleware(cartUserParamsSchemaValidation, "params", { form: "cart" }),
  getCartByUserId,
);

cartRouter.post(
  "/cart",
  authenticateJWT,
  validateMiddleware(createCartSchemaValidation, "body", { form: "cart" }),
  createCart,
);

cartRouter.post(
  "/cart/:id/products",
  authenticateJWT,
  validateMiddleware(cartParamsSchemaValidation, "params", { form: "cart" }),
  validateMiddleware(addProductToCartSchemaValidation, "body", { form: "cart" }),
  addProductToCart,
);

cartRouter.delete(
  "/cart/:id/products/:productId",
  authenticateJWT,
  validateMiddleware(removeProductParamsSchemaValidation, "params", { form: "cart" }),
  removeProductFromCart,
);

module.exports = cartRouter;