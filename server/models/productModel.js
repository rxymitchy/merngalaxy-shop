
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Please provide a product price'],
      min: [0, 'Price must be positive'],
    },
    oldPrice: {
      type: Number,
      min: [0, 'Old price must be positive'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a product category'],
      enum: ['electronics', 'fashion', 'home', 'new', 'featured'],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    images: {
      type: [String],
      required: [true, 'Please provide at least one product image'],
      validate: {
        validator: function (array) {
          return array.length > 0;
        },
        message: 'Please provide at least one product image',
      },
    },
    features: {
      type: [String],
    },
    countInStock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
