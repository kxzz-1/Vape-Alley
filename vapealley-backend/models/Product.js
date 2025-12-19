const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String },
  price: { type: Number, required: true },
  salePrice: { type: Number },
  discountPercentage: { type: Number, default: 0 },
  stock: { type: Number, required: true },
  description: { type: String },
  images: [String],
  colors: [String],
  image: { type: String }, // Main image
  specifications: [{ name: String, value: String }]
}, { timestamps: true });

productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

module.exports = mongoose.model('Product', productSchema);