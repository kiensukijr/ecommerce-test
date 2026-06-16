import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = await Cart.create({ userId: req.user._id, items: [] });
    }

    // Populate product details
    const populatedCart = await Cart.findOne({ userId: req.user._id })
      .populate('items.productId', 'name price image category description');

    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add or update item in cart
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const qty = Number(quantity);

  if (qty <= 0) {
    return res.status(400).json({ message: 'Quantity must be greater than 0' });
  }

  try {
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    // Check if product is already in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // Product exists, update quantity
      cart.items[itemIndex].quantity = qty;
    } else {
      // Product does not exist, add new item
      cart.items.push({ productId, quantity: qty });
    }

    await cart.save();

    // Populate product details and return
    const populatedCart = await Cart.findOne({ userId: req.user._id })
      .populate('items.productId', 'name price image category description');

    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
export const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Filter out the item
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    // Populate product details and return
    const populatedCart = await Cart.findOne({ userId: req.user._id })
      .populate('items.productId', 'name price image category description');

    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = [];
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
