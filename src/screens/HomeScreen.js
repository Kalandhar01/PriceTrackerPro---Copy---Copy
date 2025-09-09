import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image } from 'react-native';
import ProductSearch from '../components/ProductSearch';
import StoreTags from '../components/StoreTags';
import ProductDisplayCard from '../components/ProductDisplayCard';
import { Appbar } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  const [notificationCount, setNotificationCount] = useState(2);
  const [wishlistCount, setWishlistCount] = useState(3);

  const [trackedProducts, setTrackedProducts] = useState([
    {
      id: '1',
      name: 'Sony WH-1000XM4 Wireless Noise Canceling Headphones',
      image: 'https://via.placeholder.com/150/FFFF00/000000?text=Sony+Headphones',
      retailer: 'Amazon',
      currentPrice: 299.99,
      originalPrice: 349.99,
      discount: 14,
    },
    {
      id: '2',
      name: 'Apple Watch Series 9 GPS 45mm',
      image: 'https://via.placeholder.com/150/000000/FFFFFF?text=Apple+Watch',
      retailer: 'Best Buy',
      currentPrice: 429.00,
      originalPrice: 459.00,
      discount: 7,
    },
    {
      id: '3',
      name: 'Mechanical Gaming Keyboard RGB',
      image: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Gaming+Keyboard',
      retailer: 'Walmart',
      currentPrice: 99.00,
      originalPrice: 120.00,
      discount: 17,
    },
    {
      id: '4',
      name: 'iPhone 15 Pro 128GB',
      image: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=iPhone+15',
      retailer: 'Target',
      currentPrice: 850.00,
      originalPrice: 999.00,
      discount: 15,
    },
  ]);

  const handleTrackProduct = (url) => {
    // In a real application, this would trigger a scraping process
    console.log('Tracking product:', url);
    // For now, let's just add a dummy product
    const newProduct = {
      id: String(trackedProducts.length + 1),
      name: `New Product from ${url.substring(0, 20)}...`,
      image: 'https://via.placeholder.com/150/CCCCCC/000000?text=New+Product',
      retailer: 'Various',
      currentPrice: Math.floor(Math.random() * 500) + 50,
      originalPrice: Math.floor(Math.random() * 600) + 100,
      discount: Math.floor(Math.random() * 20),
    };
    setTrackedProducts((prevProducts) => [newProduct, ...prevProducts]);
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBarHeader}>
        <View style={styles.appBarContent}>
          <Image source={require('../../assets/logo.svg')} style={styles.logo} />
          <Appbar.Content title="PriceTracker Pro" titleStyle={styles.appBarTitle} />
        </View>
        <View style={styles.appBarActions}>
          <View style={styles.iconContainer}>
            <Appbar.Action icon="bell" color="#000" onPress={() => navigation.navigate('Notifications')} />
            {notificationCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{notificationCount}</Text>
              </View>
            )}
          </View>
          <View style={styles.iconContainer}>
            <Appbar.Action icon="heart" color="#000" onPress={() => navigation.navigate('Wishlist')} />
            {wishlistCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{wishlistCount}</Text>
              </View>
            )}
          </View>
        </View>
      </Appbar.Header>
      <ScrollView style={styles.scrollView}>
        <ProductSearch onTrackProduct={handleTrackProduct} />

        <Text style={styles.sectionTitle}>Search Results</Text>
        <FlatList
          data={trackedProducts.slice(0, 1)}
          renderItem={({ item }) => <ProductDisplayCard product={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.productList}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  appBarHeader: {
    backgroundColor: '#fff',
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  appBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  appBarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  appBarActions: {
    flexDirection: 'row',
  },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    borderRadius: 9,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  productList: {
    paddingHorizontal: 5,
  },
});

export default HomeScreen;