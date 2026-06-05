const Order = require("../models/Order");

const getAnalytics = async (req, res) => {
  const orders = await Order.find();

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  res.json({
    totalOrders,
    totalRevenue,
  });
};

module.exports = { getAnalytics };