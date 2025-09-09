import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const ProductCard = ({ product, onAddToWishlist, onAutoBuy }) => {
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: product.image }} style={styles.image} />
      <Card.Content>
        <Title>{product.name}</Title>
        <Paragraph>{product.retailer}</Paragraph>
        <Text style={styles.currentPrice}>${product.currentPrice}</Text>
        {product.originalPrice && (
          <Text style={styles.originalPrice}>${product.originalPrice}</Text>
        )}
        {product.discount && (
          <Text style={styles.discount}>{product.discount}% OFF</Text>
        )}
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button onPress={() => onAddToWishlist(product)}>Add to Wishlist</Button>
        <Button onPress={() => onAutoBuy(product)}>Auto-Buy</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    width: 300,
  },
  image: {
    height: 200,
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  discount: {
    color: 'green',
    fontWeight: 'bold',
  },
  actions: {
    justifyContent: 'space-around',
  },
});

export default ProductCard;