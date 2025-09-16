import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProductDisplayCard from './ProductDisplayCard';

const TrackedProductCard = ({ product }) => {
  return (
    <View style={styles.cardWrapper}>
      <ProductDisplayCard product={product} targetColor="green" showTrackingText />
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginVertical: 8,
    marginHorizontal: 4,
  },
});

export default TrackedProductCard;
