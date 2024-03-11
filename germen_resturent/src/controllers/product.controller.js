import { Product } from '../models/product.model.js';

const createProduct = async (req, res) => {
  try {
    const { name, unitPrice, description, category, imageUrl, size } = req.body;

    if ([name, unitPrice, description, category, , size].some((field = field.trim()))) {
      res.status(400).json({ error: 'All Field are required', success: false });
    }

    const productData = { name, unitPrice, description, category, imageUrl, size };
    const newProduct = await Product.create(productData);
    res.status(201).json({
      product: newProduct,
      status: 'Success',
      message: 'Product created successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', success: false });
  }
};

const allProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products, status: 'Success' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', success: false });
  }
};

const singleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: 'No such product found', success: false });
    res.status(200).json({ product, Success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', success: false });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, unitPrice, description, imageUrl, category, size } = req.body;

    const updateData = {
      name,
      unitPrice,
      category,
      imageUrl,
      description,
      size,
    };

    const product = await Product.findByIdAndUpdate(id, updateData);
    if (!product)
      return res.status(404).json({ message: 'No such product found', success: false });
    res
      .status(200)
      .json({ product, status: 'Success', message: 'Product Updated Successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', success: false });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product)
      return res.status(404).json({ message: 'No such product found', success: false });
    res.status(200).json({ status: 'Success', message: 'Product deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error', success: false });
  }
};

export { createProduct, allProducts, singleProduct, updateProduct, deleteProduct };
