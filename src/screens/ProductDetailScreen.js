import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Appbar, Card, Title, Paragraph, Button, TextInput } from 'react-native-paper';
import PriceHistoryChart from '../components/PriceHistoryChart';

const ProductDetailScreen = ({ navigation, route }) => {
  const { productId } = route.params || { productId: '1' }; // Default to product 1 for now

  // Dummy product data - in a real app, this would come from an API call
  const [product, setProduct] = useState({
    id: '1',
    name: 'Sony WH-1000XM4 Wireless Noise Canceling Headphones',
    image: 'https://via.placeholder.com/300/FFFF00/000000?text=Sony+Headphones',
    retailer: 'Amazon',
    currentPrice: 299.99,
    originalPrice: 349.99,
    discount: 14,
    description: 'Premium wireless headphones with industry-leading noise cancellation.',
    priceHistory: [
      { date: 'Jan', price: 350 },
      { date: 'Feb', price: 340 },
      { date: 'Mar', price: 320 },
      { date: 'Apr', price: 300 },
      { date: 'May', price: 299.99 },
    ],
  });

  const [targetPrice, setTargetPrice] = useState('');

  const handleSetTargetPrice = () => {
    console.log(`Setting target price for ${product.name} to $${targetPrice}`);
    // Logic to save target price
  };

  const handleAddToWishlist = () => {
    console.log(`Adding ${product.name} to wishlist`);
    // Logic to add to wishlist
  };

  const handleAutoBuy = () => {
    console.log(`Enabling auto-buy for ${product.name}`);
    // Logic to enable auto-buy
  };

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Product Details" />
      </Appbar.Header>
      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Card.Cover source={{ uri: product.image }} style={styles.productImage} />
          <Card.Content>
            <Title>{product.name}</Title>
            <Paragraph>{product.retailer}</Paragraph>
            <Text style={styles.currentPrice}>Current Price: ${product.currentPrice}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>Original Price: ${product.originalPrice}</Text>
            )}
            {product.discount && (
              <Text style={styles.discount}>{product.discount}% OFF</Text>
            )}
            <Paragraph style={styles.description}>{product.description}</Paragraph>

            <View style={styles.priceTrackingSection}>
              <TextInput
                label="Target Price"
                value={targetPrice}
                onChangeText={setTargetPrice}
                keyboardType="numeric"
                mode="outlined"
                style={styles.targetPriceInput}
              />
              <Button mode="contained" onPress={handleSetTargetPrice} style={styles.actionButton}>
                Set Target
              </Button>
            </View>

            <View style={styles.actionButtons}>
              <Button mode="outlined" onPress={handleAddToWishlist} style={styles.actionButton}>
                Add to Wishlist
              </Button>
              <Button mode="contained" onPress={handleAutoBuy} style={styles.actionButton}>
                Auto-Buy
              </Button>
            </View>
          </Card.Content>
        </Card>

        <PriceHistoryChart data={product.priceHistory} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 10,
    padding: 10,
  },
  productImage: {
    height: 250,
    resizeMode: 'contain',
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: 'gray',
    fontSize: 16,
  },
  discount: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    marginTop: 10,
    lineHeight: 20,
  },
  priceTrackingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  targetPriceInput: {
    flex: 1,
    marginRight: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default ProductDetailScreen;