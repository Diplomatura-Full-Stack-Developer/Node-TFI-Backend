const express = require("express");
const { authenticateJWT } = require("../auth/auth.middleware");
const { getCartByUserId, createCart, addProductToCart, removeProductFromCart } = require("./cart.controller");


const cartRouter = express.Router();


cartRouter.get("/cart/:userId", authenticateJWT, getCartByUserId);

cartRouter.post("/cart", authenticateJWT, createCart);

cartRouter.post("/cart/:id/products", authenticateJWT, addProductToCart);

cartRouter.delete("/cart/:id/products/:productId", authenticateJWT, removeProductFromCart);


module.exports = cartRouter;