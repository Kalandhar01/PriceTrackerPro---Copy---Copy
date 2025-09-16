const Product = require('../models/Product');
const Wishlist = require('../models/Wishlist');
const User = require('../models/User');
const { sendPriceAlert } = require('../utils/mailer');

// Call this function after product price update
exports.checkAndNotifyTargetPrice = async (product) => {
  if (!product.targetPrice || !product.currentPrice) return;
  if (product.currentPrice <= product.targetPrice) {
    // Find all users tracking this product
    const wishlists = await Wishlist.find({ productId: product._id });
    for (const wishlist of wishlists) {
      const user = await User.findById(wishlist.userId);
      if (user && user.email) {
        await sendPriceAlert(
          user.email,
          product.title,
          product.currentPrice,
          product.targetPrice
        );
      }
    }
  }
};
