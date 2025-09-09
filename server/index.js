require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Price Tracker Backend API');
});

// API endpoint to get product details by ID
app.get('/api/products/:productId', (req, res) => {
  const productId = req.params.productId;
  // Dummy data for now
  const productDetails = {
    productId: productId,
    title: `Product ${productId} Title`,
    description: `This is a detailed description for product ${productId}.`,
    pricing: {
      currentPrice: 99.99,
      targetPrice: 80.00,
      currency: 'USD'
    },
    availability: 'In Stock',
    imageUrls: [
      `https://example.com/images/product${productId}_1.jpg`,
      `https://example.com/images/product${productId}_2.jpg`
    ]
  };
  res.json(productDetails);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});