const mongoose = require('mongoose');

const carouselSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String },
  subtitle: { type: String },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

carouselSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

module.exports = mongoose.model('Carousel', carouselSchema);