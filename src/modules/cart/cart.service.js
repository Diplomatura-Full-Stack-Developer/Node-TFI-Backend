const Cart = require("./cart.model");
const AppError = require("../../utils/classes/app-error.js");
const { changeStock } = require("../products/product.service");


const getCartByUserId = async (userId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) {
    return { cartId: '', products: [], total: 0, userId };
  }
  return {
    cartId: cart._id,
    products: cart.products,
    total: 0,
    userId: cart.userId,
  };
};

const createCart = async (userId, productId) => {
  const cart = await Cart.findOne({ userId });
  if (cart) {
    return addProductToCart(cart._id, productId);
  }
  await changeStock(productId, -1);
  const newCart = await Cart.create({ userId, products: [{ productId, quantity: 1 }] });
  return {
    cartId: newCart._id,
    products: newCart.products,
    total: 0,
    userId: newCart.userId,
  };
};

const addProductToCart = async (cartId, productId) => {
  const cart = await Cart.findById(cartId);
  if (!cart) {
    throw new AppError("CART_NOT_FOUND", "Carrito no encontrado", 404);
  }
  await changeStock(productId, -1);
  const cartItem = cart.products.find((item) => String(item.productId) === String(productId));
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.products.push({ productId, quantity: 1 });
  }
  await cart.save();
  return {
    cartId: cart._id,
    products: cart.products,
    total: 0,
    userId: cart.userId,
  };
};

const removeProductFromCart = async (cartId, productId) => {
  const cart = await Cart.findById(cartId);
  if (!cart) {
    throw new AppError("CART_NOT_FOUND", "Carrito no encontrado", 404);
  }
  const cartItem = cart.products.find((item) => String(item.productId) === String(productId));
  if (!cartItem) {
    throw new AppError("PRODUCT_NOT_FOUND", "Producto no encontrado", 404);
  }
  const quantity = cartItem.quantity;
  await changeStock(productId, quantity);
  cart.products = cart.products.filter((item) => String(item.productId) !== String(productId));
  await cart.save();
  return {
    cartId: cart._id,
    products: cart.products,
    total: 0,
    userId: cart.userId,
    quantity,
  };
};


module.exports = { getCartByUserId, createCart, addProductToCart, removeProductFromCart };