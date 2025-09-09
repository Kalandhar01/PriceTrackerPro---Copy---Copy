import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';

const ProductList = ({ products, onAddToWishlist, onAutoBuy }) => {
  const renderItem = ({ item }) => (
    <ProductCard
      product={item}
      onAddToWishlist={onAddToWishlist}
      onAutoBuy={onAutoBuy}
    />
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
  },
});

export default ProductList;