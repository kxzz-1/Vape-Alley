const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { sendWhatsAppConfirmation } = require('../middleware/whatsapp');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, admin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const order = new Order(req.body);
  try {
    // Update stock
    for (const item of order.items) {
      const product = await Product.findById(item.productId);
      if (!product) throw new Error(`Product not found: ${item.name}`);
      if (product.stock < item.quantity) throw new Error(`Insufficient stock for ${item.name}`);
      
      product.stock -= item.quantity;
      await product.save();
    }

    const newOrder = await order.save();
    await sendWhatsAppConfirmation(newOrder);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', protect, admin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;