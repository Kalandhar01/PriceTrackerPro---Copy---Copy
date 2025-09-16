import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Image, StyleSheet, Text, View } from 'react-native';
import { Button, Card, Paragraph, TextInput, Title } from 'react-native-paper';

const ProductDisplayCard = ({ product, onTrack, targetColor }) => {
  const [isInWishlist, setIsInWishlist] = useState(false); // State to manage wishlist status
  const [imageError, setImageError] = useState(false);
  const [showNotificationInput, setShowNotificationInput] = useState(false);
  const [isNotified, setIsNotified] = useState(false);
  const [fetchedTargetPrice, setFetchedTargetPrice] = useState(null);
  const [targetPrice, setTargetPrice] = useState('');
  const inputWidth = useRef(new Animated.Value(0)).current;
  const [loadingWishlist, setLoadingWishlist] = useState(true);

  const handleNotifyMeClick = async () => {
    setShowNotificationInput(true);
    Animated.timing(inputWidth, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const fetchTargetPrice = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/products/${product._id}/targetPrice`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.targetPrice) {
        setFetchedTargetPrice(response.data.targetPrice);
        setIsNotified(true);
      }
    } catch (error) {
      console.error('Error fetching target price:', error);
    }
  };

  const handleSubmitPrice = async () => {
    const currentPrice = product.currentPrice;
    const enteredPrice = parseFloat(targetPrice);

    if (isNaN(enteredPrice) || enteredPrice <= 0) {
      alert('Please enter a valid target price.');
      return;
    }

    if (enteredPrice >= currentPrice) {
      alert(`Target price must be lower than the current price (₹${currentPrice.toFixed(2)}).`);
      return;
    }

    // Only add to tracked products if onTrack is provided
    if (onTrack) {
      onTrack(product, enteredPrice);
    }

    setShowNotificationInput(false);
    setTargetPrice('');
    Animated.timing(inputWidth, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleImageError = () => {
    setImageError(true);
  };

  useEffect(() => {
    checkWishlistStatus();
    fetchTargetPrice();
  }, []);

  const checkWishlistStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/wishlist', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const wishlistItems = response.data;
      const inWishlist = wishlistItems.some(item => item.productId._id === product._id);
      setIsInWishlist(inWishlist);
    } catch (error) {
      console.error('Error checking wishlist status:', error);
    } finally {
      setLoadingWishlist(false);
    }
  };

  const handleWishlistToggle = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (isInWishlist) {
        // Remove from wishlist
        await axios.delete(`http://localhost:5000/api/wishlist/${product._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Alert.alert('Success', 'Product removed from wishlist!');
      } else {
        // Add to wishlist
        await axios.post('http://localhost:5000/api/wishlist', {
          productId: product._id,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Alert.alert('Success', 'Product added to wishlist!');
      }
      setIsInWishlist(!isInWishlist);
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      Alert.alert('Error', 'Failed to update wishlist.');
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.gradientBg}>
        <View style={styles.cardContent}>
          {imageError ? (
            <View style={styles.imageErrorContainer}>
              <Text style={styles.imageErrorText}>Image Not Available</Text>
            </View>
          ) : (
            <Image
              source={{ uri: Array.isArray(product.imageUrls) && product.imageUrls.length > 0 ? product.imageUrls[0] : product.image }}
              style={styles.productImage}
              onError={handleImageError}
            />
          )}
          <View style={styles.productDetails}>
            <Title style={styles.productName}>
              {product.name && product.name.length > 30 ? product.name.slice(0, 30) + '...' : product.name}
            </Title>
            <Paragraph style={styles.productDescription}>{product.description}</Paragraph>
            <View style={styles.priceRow}>
              <Text style={styles.currentPrice}>Actual Price: ₹{product.currentPrice.toFixed(2)}</Text>
              {product.targetPrice !== undefined && (
                <Text style={[styles.targetPrice, targetColor === 'green' && { color: 'green', fontWeight: 'bold' }]}>Target: ₹{product.targetPrice}</Text>
              )}
              {product.originalPrice && product.originalPrice > product.currentPrice && (
                <Text style={styles.originalPrice}>₹{product.originalPrice.toFixed(2)}</Text>
              )}
              {product.discount > 0 && (
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{product.discount}% OFF</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
      <Card.Content>

        <View style={styles.actionButtonsContainer}>
          {onTrack ? (
            showNotificationInput ? (
              <Animated.View style={[styles.notificationInputContainer, { width: inputWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '70%'],
              }) }]}> 
                <TextInput
                  label="Target Price"
                  value={targetPrice}
                  onChangeText={setTargetPrice}
                  keyboardType="numeric"
                  style={styles.targetPriceInput}
                  dense
                />
                <Button mode="contained" onPress={handleSubmitPrice} style={styles.submitPriceButton} labelStyle={styles.submitPriceButtonLabel}>
                  Submit
                </Button>
              </Animated.View>
            ) : (
              <Button
                mode="contained"
                onPress={handleNotifyMeClick}
                style={[styles.notifyMeButton, isNotified && styles.notifiedButton]}
                labelStyle={styles.notifyMeButtonLabel}
              >
                Track Me
              </Button>
            )
          ) : (
            <Text style={styles.trackingText}>This product is under tracking</Text>
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  trackingText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center'
  },
  card: {
    margin: 10,
    borderRadius: 16,
    elevation: 4,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  gradientBg: {
    backgroundColor: 'linear-gradient(90deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: 0,
  },
  cardContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginRight: 16,
    backgroundColor: '#f0f0f0',
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#222',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  targetPrice: {
    fontSize: 16,
    marginLeft: 8,
  },
  currentPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4285F4',
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 16,
    color: 'gray',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  discountBadge: {
    backgroundColor: '#e6ffe6',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginLeft: 8,
  },
  discountText: {
    color: '#00cc00',
    fontSize: 14,
    fontWeight: 'bold',
  },

  targetPriceInput: {
    flex: 1,
    height: 40,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
  },
  wishlistLoadingIndicator: {
    marginVertical: 10,
  },
  wishlistButtonContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  inWishlistContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0ffe0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  checkIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  inWishlistText: {
    color: '#28a745',
    fontWeight: 'bold',
    fontSize: 14,
  },
  removeButton: {
    marginLeft: 10,
    padding: 5,
  },
  trashIcon: {
    width: 16,
    height: 16,
    tintColor: '#dc3545',
  },
  wishlistButton: {
    backgroundColor: '#4285F4',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  wishlistButtonLabel: {
    color: '#fff',
    fontSize: 14,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  notifyMeButton: {
    backgroundColor: '#4285F4',
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  notifyMeButtonLabel: {
    color: '#fff',
    fontSize: 14,
  },
  notifiedButton: {
    backgroundColor: '#00008B', // Dark blue color
  },
  notificationInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
    overflow: 'hidden',
  },
  submitPriceButton: {
    backgroundColor: '#4285F4',
    borderRadius: 5,
    marginLeft: 5,
    height: 40,
    justifyContent: 'center',
  },
  submitPriceButtonLabel: {
    color: '#fff',
    fontSize: 12,
  },
  trackButton: {
    marginLeft: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  trackIcon: {
    width: 20,
    height: 20,
  },
  imageErrorContainer: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageErrorText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 10,
  },
});

export default ProductDisplayCard;