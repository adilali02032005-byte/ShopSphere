const Product = require("../models/Product");

const updateProduct  = async (req, res) => {
  try{
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    );
    res.json(product);
  }catch(error){
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProduct = async(req, res) => {
  try{
    await Product.findByIdAndDelete(req.params.id);
    res.json({
      message: "Product deleted",
    });
  }catch(error){
    res.status(500).json({
      message: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
};

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

module.exports = {
  getProducts, getProductById, createProduct, updateProduct, deleteProduct,
}