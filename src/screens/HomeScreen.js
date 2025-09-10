import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image } from 'react-native';
import ProductSearch from '../components/ProductSearch';
import StoreTags from '../components/StoreTags';
import ProductDisplayCard from '../components/ProductDisplayCard';
import { Appbar } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  const [notificationCount, setNotificationCount] = useState(2);
  const [wishlistCount, setWishlistCount] = useState(3);

  const [trackedProducts, setTrackedProducts] = useState([]);

  const handleTrackProduct = (productData) => {
    // Add the scraped product data to the trackedProducts state
    setTrackedProducts((prevProducts) => [{
      id: productData._id,
      name: productData.productName,
      image: productData.productImage || 'https://via.placeholder.com/150/CCCCCC/000000?text=No+Image',
      retailer: 'N/A', // You might want to extract this from the URL or product data
      currentPrice: productData.currentPrice,
      originalPrice: productData.originalPrice || productData.currentPrice,
      discount: productData.originalPrice ? Math.round(((productData.originalPrice - productData.currentPrice) / productData.originalPrice) * 100) : 0,
      description: productData.description,
    }, ...prevProducts]);
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
          data={trackedProducts}
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