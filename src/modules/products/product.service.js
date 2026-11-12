const productModel = require("./product.model.js");
const productsData = require("../../../assets/data/products.json");
const AppError = require("../../utils/classes/app-error.js");

const getProducts = async () => {
  let products = await productModel.find();
  if (products.length === 0) {
    await seedProducts();
    products = await productModel.find();
  }
  return products;
}


const getProductById = async (id) => {
  const product = await productModel.findById(id);
  if (!product) {
    throw new AppError("PRODUCT_NOT_FOUND", "Producto no encontrado", 404);
  }
  return {
    message: "Producto obtenido correctamente",
    data: product,
  };
};

const createProduct = async (product) => {
  const newProduct = await productModel.create(product);
  return {
    message: "Producto creado correctamente",
    data: newProduct,
  };
};

const seedProducts = async () => {
  for (const product of productsData) {
    await createProduct(product);

  }
};

const changeStock = async (productId, amount) => {
  const product = await productModel.findById(productId);
  if (!product) {
    throw new AppError("PRODUCT_NOT_FOUND", "Producto no encontrado", 404);
  }
  if (product.stock + amount < 0) {
    throw new AppError("PRODUCT_OUT_OF_STOCK", "Sin stock", 409);
  }
  product.stock += amount;
  await product.save();
  return product;
};

module.exports = { getProducts, getProductById, createProduct, seedProducts, changeStock };