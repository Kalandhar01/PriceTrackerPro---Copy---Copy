import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const stores = [
  { id: '1', name: 'Amazon' },
  { id: '2', name: 'Best Buy' },
  { id: '3', name: 'Walmart' },
  { id: '4', name: 'Target' },
  { id: '5', name: 'eBay' },
  { id: '6', name: 'Newegg' },
  { id: '7', name: 'Costco' },
  { id: '8', name: 'Macy\'s' },
];

const StoreTags = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.tag}>
      <Text style={styles.tagName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular stores</Text>
      <FlatList
        data={stores}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tagList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tagList: {
    paddingVertical: 5,
  },
  tag: {
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  tagName: {
    fontSize: 14,
    color: '#333',
  },
});

export default StoreTags;