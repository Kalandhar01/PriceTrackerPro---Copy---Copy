import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Appbar } from 'react-native-paper';
import WishlistItem from '../components/WishlistItem';

const WishlistScreen = ({ navigation }) => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: '1',
      name: 'Mechanical Gaming Keyboard RGB',
      image: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Gaming+Keyboard',
      currentPrice: 99.00,
      targetPrice: 75.00,
      status: 'Tracking',
      notificationsOn: true,
      autoBuyOn: false,
    },
    {
      id: '2',
      name: 'iPhone 15 Pro 128GB',
      image: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=iPhone+15',
      currentPrice: 850.00,
      targetPrice: 850.00,
      status: 'Price Hit',
      notificationsOn: true,
      autoBuyOn: true,
    },
    {
      id: '3',
      name: 'ASUS ROG Gaming Laptop',
      image: 'https://via.placeholder.com/150/00FF00/000000?text=Gaming+Laptop',
      currentPrice: 1299.99,
      targetPrice: 1100.00,
      status: 'Tracking',
      notificationsOn: false,
      autoBuyOn: true,
    },
  ]);

  const handleDeleteItem = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const handleToggleNotifications = (id) => {
    setWishlistItems(wishlistItems.map(item =>
      item.id === id ? { ...item, notificationsOn: !item.notificationsOn } : item
    ));
  };

  const handleToggleAutoBuy = (id) => {
    setWishlistItems(wishlistItems.map(item =>
      item.id === id ? { ...item, autoBuyOn: !item.autoBuyOn } : item
    ));
  };

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
            item={item}
            onDelete={handleDeleteItem}
            onToggleNotifications={handleToggleNotifications}
            onToggleAutoBuy={handleToggleAutoBuy}
          />
        )}
        keyExtractor={(item) => item.id}
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
});

export default WishlistScreen;