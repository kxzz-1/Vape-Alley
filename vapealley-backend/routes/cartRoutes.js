const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const { protect } = require('../middleware/authMiddleware');

// Get User Cart
router.get('/', protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    // Transform to match frontend structure
    const formattedItems = cart.items.map(item => {
      if (!item.product) return null; // Handle deleted products
      return {
        id: item.product._id,
        name: item.product.name,
        price: item.product.price,
        salePrice: item.product.salePrice,
        image: item.product.image,
        quantity: item.quantity,
        selectedColor: item.selectedColor
      };
    }).filter(Boolean);

    res.json(formattedItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Item to Cart
router.post('/', protect, async (req, res) => {
  const { productId, quantity, selectedColor } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, selectedColor });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update Item Quantity
router.put('/:productId', protect, async (req, res) => {
  const { quantity } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.product.toString() === req.params.productId);
      if (itemIndex > -1) {
        if (quantity > 0) {
          cart.items[itemIndex].quantity = quantity;
        } else {
          cart.items.splice(itemIndex, 1);
        }
        await cart.save();
      }
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Remove Item
router.delete('/:productId', protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
      await cart.save();
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Clear Cart (Optional, for checkout)
router.delete('/', protect, async (req, res) => {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.json({ message: 'Cart cleared' });
});

module.exports = router;