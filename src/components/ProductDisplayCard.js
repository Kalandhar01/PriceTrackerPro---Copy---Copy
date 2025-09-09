import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button, TextInput } from 'react-native-paper';

const ProductDisplayCard = ({ product }) => {
  return (
    <Card style={styles.card}>
      <View></View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#fff',
  },
  cardContent: {
    flexDirection: 'row',
    padding: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  productDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4285F4',
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 14,
    color: 'gray',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  discountBadge: {
    backgroundColor: '#e6ffe6',
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  discountText: {
    color: '#00cc00',
    fontSize: 12,
    fontWeight: 'bold',
  },
  targetPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  targetPriceInput: {
    flex: 1,
    height: 40,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
  },
  wishlistButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  wishlistButtonLabel: {
    color: '#333',
    fontSize: 12,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  autoBuyButton: {
    backgroundColor: '#4285F4',
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  autoBuyButtonLabel: {
    color: '#fff',
    fontSize: 14,
  },
  trackButton: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  trackIcon: {
    width: 20,
    height: 20,
  },
});

export default ProductDisplayCard;