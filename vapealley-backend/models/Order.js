const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  paymentMethod: { type: String, required: true, default: 'COD' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    quantity: Number,
    price: Number
  }],
  total: { type: Number, required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Processing', 'Delivered', 'Cancelled'] },
}, { timestamps: true });

orderSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    ret.date = ret.createdAt.toISOString().split('T')[0];
    ret.itemsCount = ret.items ? ret.items.length : 0;
  }
});

module.exports = mongoose.model('Order', orderSchema);