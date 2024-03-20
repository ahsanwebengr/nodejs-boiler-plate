import { Product } from '../../models/admin/product.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

const createProduct = async (req, res) => {
    console.log("🚀 ~ createProduct ~ req:", req.file.filename);
    
  try {
    const { name, unitPrice, description, category, imageUrl, size, discount } = req.body;

    if (!name || !unitPrice || !description || !category) {
      throw new ApiError(400, 'All fields are required');
    }

    const productData = {
      name,
      unitPrice,
      description,
      category,
      imageUrl,
      size,
      discount,
      
    };
    productData.imageUrl = req.file.filename || '';
    const newProduct = await Product.create(productData);
    res.status(201).json(new ApiResponse(201, newProduct, 'Product created successfully'));
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json(new ApiResponse(err.statusCode, null, err.message));
    } else {
      return res
        .status(500)
        .json(new ApiResponse(500, null, 'Some error occurred while creating product'));
    }
  }
};

const allProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(new ApiResponse(200, products, 'Product Data'));
  } catch (err) {
    console.log(err);
    throw new ApiError(500, 'Some error occurred while getting products');
  }
};

const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const product = await Product.findById(id);
    if (!product) {
      throw new ApiError(404, 'No such product found');
    }

    res.status(200).json(new ApiResponse(200, product, 'Product Data'));
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json(new ApiResponse(err.statusCode, null, err.message));
    } else {
      return res
        .status(500)
        .json(new ApiResponse(500, null, 'Some error occurred while fetching product'));
    }
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
    if (!product) {
      throw new ApiError(404, 'Product not found');
    }
    res.status(200).json(new ApiResponse(200, product, 'Product Updated Successfully'));
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json(new ApiResponse(err.statusCode, null, err.message));
    } else {
      return res
        .status(500)
        .json(new ApiResponse(500, null, 'Some error occurred while updating the product'));
    }
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new ApiError(404, 'Product not found');

    res.status(200).json(new ApiResponse(200, product, 'Product deleted successfully'));
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json(new ApiResponse(err.statusCode, null, err.message));
    } else {
      return res
        .status(500)
        .json(new ApiResponse(500, null, 'Error occurred while deleting product'));
    }
  }
};

export { createProduct, allProducts, singleProduct, updateProduct, deleteProduct };
