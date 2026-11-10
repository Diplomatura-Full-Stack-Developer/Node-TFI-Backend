const productService = require("./product.service");

const welcomeProductAPI = (req, res) => {
  res.status(200).json({ message: "Bienvenido a la API de productos" });
};

const getProducts = async (req, res) => {
  const products = await productService.getProducts();
  res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.getProductById(id);
  res.status(200).json(product);
};


const createProduct = async (req, res) => {
  const product = req.body;
  const newProduct = await productService.createProduct(product);
  res.status(200).json(newProduct);
};


module.exports = { welcomeProductAPI, getProducts, getProductById, createProduct };