import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import WishlistItem from '../components/WishlistItem';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WishlistScreen = ({ navigation }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const fetchWishlistItems = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/wishlist', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlistItems(response.data);
    } catch (err) {
      console.error('Error fetching wishlist items:', err);
      setError('Failed to load wishlist. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (wishlistItemId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/wishlist/${wishlistItemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert('Success', 'Product removed from wishlist!');
      fetchWishlistItems(); // Refresh the list
    } catch (err) {
      console.error('Error deleting item from wishlist:', err);
      Alert.alert('Error', 'Failed to remove item from wishlist.');
    }
  };

  const handleToggleNotifications = (id) => {
    // This functionality is not yet implemented in the backend
    console.log(`Toggle notifications for item ${id}`);
  };

  const handleToggleAutoBuy = (id) => {
    // This functionality is not yet implemented in the backend
    console.log(`Toggle auto-buy for item ${id}`);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#4285F4" />
        <Text>Loading wishlist...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
        <Button mode="contained" onPress={fetchWishlistItems} style={styles.retryButton}>
          Retry
        </Button>
      </View>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="My Wishlist" />
        </Appbar.Header>
        <Text style={styles.emptyWishlistText}>Your wishlist is empty.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="My Wishlist" />
      </Appbar.Header>
      <FlatList
        data={wishlistItems}
        renderItem={({ item }) => (
          <WishlistItem
            item={item.productId}
            wishlistItemId={item._id}
            onDelete={() => handleDeleteItem(item._id)}
            onToggleNotifications={handleToggleNotifications}
            onToggleAutoBuy={handleToggleAutoBuy}
          />
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 10,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
  retryButton: {
    marginTop: 10,
  },
  emptyWishlistText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default WishlistScreen;