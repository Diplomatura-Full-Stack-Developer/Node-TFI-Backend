const express = require("express");
const productRouter = express.Router();
const { welcomeProductAPI, getProducts, getProductById, createProduct } = require("./product.controller");
const { validateMiddleware } = require("../../middlewares/validate.middleware");
const { productSchemaValidation } = require("../../validations/product.validation");



productRouter.get("/", welcomeProductAPI);

productRouter.get("/products", getProducts);

productRouter.get("/products/:id", getProductById);

productRouter.post("/product", validateMiddleware(productSchemaValidation), createProduct);


module.exports = productRouter;