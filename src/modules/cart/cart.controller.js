const cartService = require("./cart.service");
const productService = require("../products/product.service");

const getCartByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await cartService.getCartByUserId(userId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message, data: null });
  }
};

const createCart = async (req, res) => {
  const { productId, userId } = req.body;
  try {
    const newCart = await cartService.createCart(userId, productId);
    await productService.changeStock(productId, -1);
    res.status(200).json(newCart);
  } catch (error) {
    res.status(500).json({ message: error.message, data: null });
  }
};

const addProductToCart = async (req, res) => {
  const { id } = req.params;
  const { productId } = req.body;
  try {
    const cart = await cartService.addProductToCart(id, productId);
    await productService.changeStock(productId, -1);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message, data: null });
  }
};

const removeProductFromCart = async (req, res) => {
  const { id, productId } = req.params;
  try {
    const cart = await cartService.removeProductFromCart(id, productId);
    await productService.changeStock(productId, cart.quantity);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message, data: null });
  }
};

module.exports = { getCartByUserId, createCart, addProductToCart, removeProductFromCart };