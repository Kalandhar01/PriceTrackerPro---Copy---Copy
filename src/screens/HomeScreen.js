import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Alert, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import ProductDisplayCard from '../components/ProductDisplayCard';
import ProductSearch from '../components/ProductSearch';
import TrackedProductCard from '../components/TrackedProductCard';

const HomeScreen = ({ navigation }) => {
  const nav = useNavigation();
  const [notificationCount, setNotificationCount] = useState(2);
  const [wishlistCount, setWishlistCount] = useState(3);

  const [searchResults, setSearchResults] = useState([]);
  const [trackedProducts, setTrackedProducts] = useState([]);
  const [trackedLoading, setTrackedLoading] = useState(true);

  // Called when a product is scraped from ProductSearch
  const handleTrackProduct = (productData) => {
    setSearchResults((prev) => [{
      id: productData._id,
      _id: productData._id,
      name: productData.productName,
      image: productData.productImage || 'https://via.placeholder.com/150/CCCCCC/000000?text=No+Image',
      retailer: 'N/A',
      currentPrice: productData.currentPrice,
      originalPrice: productData.originalPrice || productData.currentPrice,
      discount: productData.originalPrice ? Math.round(((productData.originalPrice - productData.currentPrice) / productData.originalPrice) * 100) : 0,
      description: productData.description,
    }, ...prev]);
  };

  // Called when user sets target price in ProductDisplayCard
  const [notifications, setNotifications] = useState([]);

  const handleAddTrackedProduct = async (product, targetPrice) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/tracked-products', {
        productId: product._id || product.id,
        targetPrice,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTrackedProducts();
      setSearchResults((prev) => prev.filter((p) => p.id !== product.id));
      Alert.alert('Success', `${product.name} is now being tracked!`);
      setNotifications((prev) => [
        {
          id: Date.now().toString(),
          type: 'tracking',
          message: `${product.name} was added to tracking.`,
          timestamp: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);
    } catch (err) {
      Alert.alert('Error', 'Failed to track product.');
    }
  };

  const fetchTrackedProducts = async () => {
    setTrackedLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/tracked-products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Map backend data to expected format for TrackedProductCard
      setTrackedProducts(res.data.map(tp => ({
        ...tp.productId,
        targetPrice: tp.targetPrice,
        id: tp.productId._id || tp.productId.id,
      })));
    } catch (err) {
      setTrackedProducts([]);
    }
    setTrackedLoading(false);
  };

  useEffect(() => {
    fetchTrackedProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBarHeader}>
        <View style={styles.appBarContent}>
          <Image source={require('../../assets/logo.svg')} style={styles.logo} />
          <Appbar.Content title="PriceTracker Pro" titleStyle={styles.appBarTitle} />
        </View>
        <View style={styles.appBarActions}>
          <View style={styles.iconContainer}>
            <Appbar.Action icon="bell" color="#000" onPress={() => nav.navigate('Notifications', { notifications })} />
            {notifications.length > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{notifications.length}</Text>
              </View>
            )}
          </View>
            {/* Wishlist icon removed as requested */}
          <Appbar.Action icon="account" color="#000" onPress={() => navigation.navigate('Profile')} />
        </View>
      </Appbar.Header>
      <ScrollView style={styles.scrollView}>
          {/* Move search UI a bit down */}
          <View style={{ marginTop: 20 }}>
            <ProductSearch onTrackProduct={handleTrackProduct} />
          </View>

          <Text style={styles.sectionTitle}>Search Results</Text>
          <FlatList
            data={searchResults}
            renderItem={({ item }) => (
              <View style={styles.wellKnownCard}>
                <ProductDisplayCard product={item} onTrack={handleAddTrackedProduct} />
              </View>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.productList}
          />
            {/* Tracked Products Section */}
            <View style={styles.trackedSection}>
              <Text style={styles.trackedTitle}>Tracked Products</Text>
              {trackedLoading ? (
                <Text>Loading...</Text>
              ) : trackedProducts.length > 0 ? (
                <FlatList
                  data={trackedProducts}
                  renderItem={({ item }) => (
                    <TrackedProductCard product={item} />
                  )}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={styles.trackedList}
                />
              ) : (
                <Text style={{ textAlign: 'center', color: '#888', marginTop: 20 }}>Tracking Product Empty</Text>
              )}
            </View>
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
  wellKnownCard: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
    trackedSection: {
      marginTop: 20,
      paddingHorizontal: 10,
    },
    trackedTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    trackedList: {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
    trackedCard: {
      backgroundColor: '#fff',
      borderRadius: 12,
      elevation: 2,
      marginRight: 12,
      padding: 10,
      alignItems: 'center',
      width: 140,
    },
    trackedImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginBottom: 8,
      backgroundColor: '#f0f0f0',
    },
    trackedName: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 4,
      textAlign: 'center',
    },
    trackedTarget: {
      fontSize: 13,
      color: '#4285F4',
      marginBottom: 2,
    },
    trackedPrice: {
      fontSize: 13,
      color: '#222',
    },
  productList: {
    paddingHorizontal: 5,
  },
});

export default HomeScreen;