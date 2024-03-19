import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name required'],
    },
    unitPrice: {
      type: Number,
      required: [true, 'Unit Price required'],
      min: [0, 'Unit Price must be a positive number'],
    },
    description: {
      type: String,
      required: [true, 'Description required'],
    },
    category: {
      type: String,
      enum: ['Burger', 'Pizza', 'Drink', 'Fries', 'Other'],
      required: [true, 'Category is required'],
      default: 'Other',
    },
    imageUrl: {
      type: String,
      //required: [true, 'Product Image required'],
    },
    size: {
      type: String,
      enum: ['sm', 'md', 'lg', 'xl'],
    },
    discount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = model('Product', productSchema);

export { Product };
