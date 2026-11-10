const cartService = require("./cart.service");


const getCartByUserId = async (req, res) => {
  const { userId } = req.params;
  const cart = await cartService.getCartByUserId(userId);
  res.status(200).json(cart);
};

const createCart = async (req, res) => {
  const { productId, userId } = (req.body);
  const newCart = await cartService.createCart(userId, productId);
  res.status(200).json(newCart);
};

const addProductToCart = async (req, res) => {
  const { id } = req.params;
  const { productId } = req.body;
  const cart = await cartService.addProductToCart(id, productId);
  res.status(200).json(cart);
};

const removeProductFromCart = async (req, res) => {
  const { id } = req.params;
  const { productId } = req.body;
  const cart = await cartService.removeProductFromCart(id, productId);
  res.status(200).json(cart);
};

module.exports = { getCartByUserId, createCart, addProductToCart, removeProductFromCart };
