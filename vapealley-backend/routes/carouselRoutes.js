const express = require('express');
const router = express.Router();
const Carousel = require('../models/Carousel');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
  try {
    const slides = await Carousel.find().sort({ createdAt: -1 });
    res.json(slides);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', protect, admin, async (req, res) => {
  const slide = new Carousel(req.body);
  try {
    const newSlide = await slide.save();
    res.status(201).json(newSlide);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', protect, admin, async (req, res) => {
  try {
    const updatedSlide = await Carousel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSlide);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    await Carousel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Slide deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;