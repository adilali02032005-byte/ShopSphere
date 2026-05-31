const Product = require("../models/Product");

// Create product
exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};

// Get all products
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Get single product
exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};