import axios from 'axios';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { BASE_URL } from '../utils/api';

const ProductSearch = ({ onTrackProduct }) => {
  const [productUrl, setProductUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleTrack = async () => {
    if (!productUrl.trim()) {
      setErrorMessage('Please enter a product URL.');
      return;
    }
    setErrorMessage(''); // Clear any previous error messages

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/scrape`, { productUrl });
      // Alert.alert('Success', 'Product tracked successfully!'); // Replaced with a more subtle notification if needed later
      console.log('Scraped product data:', response.data);
      onTrackProduct(response.data); // Pass the scraped data back to HomeScreen
      setProductUrl('');
    } catch (error) {
      console.error('Error tracking product:', error.response ? error.response.data : error.message);
      setErrorMessage(error.response ? error.response.data.message : 'Failed to track product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track Any Product Price</Text>
      <Text style={styles.subtitle}>Paste any e-commerce product URL and get instant price tracking with smart notifications</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={productUrl}
          onChangeText={(text) => {
            setProductUrl(text);
            if (errorMessage && text.trim()) {
              setErrorMessage(''); // Clear error message when user starts typing
            }
          }}
          mode="outlined"
          style={styles.input}
          placeholder="https://www.amazon.com/product-link or a..."
        />
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        <Button
          mode="contained"
          onPress={handleTrack}
          icon="magnify"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          loading={loading}
          disabled={loading}
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
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default ProductSearch;