const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, admin, async (req, res) => {
  let { percentage, productIds } = req.body;
  percentage = Number(percentage) || 0;
  
  try {
    const filter = (productIds && productIds.length > 0) 
      ? { _id: { $in: productIds } } 
      : {};

    if (percentage > 0) {
      // Fetch and update individually to ensure compatibility and avoid pipeline errors
      const products = await Product.find(filter);
      
      const updates = products.map(product => {
        product.discountPercentage = percentage;
        product.salePrice = Math.round(product.price * (1 - percentage / 100));
        return product.save();
      });
      
      await Promise.all(updates);
    } else {
      // Remove discount: set discountPercentage to 0 and unset salePrice
      await Product.updateMany(filter, {
        $set: { discountPercentage: 0 },
        $unset: { salePrice: 1 }
      });
    }

    res.json({ message: 'Discounts updated successfully' });
  } catch (err) {
    console.error("Error updating discounts:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;