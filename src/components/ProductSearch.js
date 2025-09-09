import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const ProductSearch = ({ onTrackProduct }) => {
  const [productUrl, setProductUrl] = useState('');

  const handleTrack = () => {
    if (productUrl.trim()) {
      onTrackProduct(productUrl);
      setProductUrl('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track Any Product Price</Text>
      <Text style={styles.subtitle}>Paste any e-commerce product URL and get instant price tracking with smart notifications</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={productUrl}
          onChangeText={setProductUrl}
          mode="outlined"
          style={styles.input}
          placeholder="https://www.amazon.com/product-link or a..."
        />
        <Button
          mode="contained"
          onPress={handleTrack}
          icon="magnify"
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Track Product
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#4285F4',
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
  },
});

export default ProductSearch;