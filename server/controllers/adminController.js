const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");

const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const totalUsers = await User.countDocuments();

    const orders = await Order.find();

    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalAmount,
      0,
    );

    res.json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

const deleteUser = async (req, res) => {
  if (req.user.id === req.params.id) {
    return res.status(400).json({
      message: "You cannot delete your own account",
    });
  }

  await User.findByIdAndDelete(req.params.id);

  res.json({
    message: "User deleted",
  });
};

module.exports = {
  getDashboardStats,
  getUsers,
  deleteUser,
};
