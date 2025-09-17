import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { BASE_URL } from '../utils/api';

const ProfileScreen = () => {
  const [username, setUsername] = useState('');
  const [trackedProducts, setTrackedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        // Get user info
        const userRes = await axios.get(`${BASE_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(userRes.data.username);
        // Get tracked products
        const trackedRes = await axios.get(`${BASE_URL}/api/tracked-products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTrackedProducts(trackedRes.data.map(tp => ({
          ...tp.productId,
          targetPrice: tp.targetPrice,
          id: tp.productId._id || tp.productId.id,
        })));
      } catch (err) {
        setError('Failed to load profile');
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Avatar.Text size={64} label={username ? username[0].toUpperCase() : '?'} style={styles.avatar} /> */}
        <Text style={styles.username}>{username || 'User'}</Text>
        <Text style={styles.trackedCount}>Tracked Products: {trackedProducts.length}</Text>
      </View>
      <Card style={styles.card}>
        <Card.Title title="Tracked Products" titleStyle={styles.cardTitle} />
        {loading ? (
          <Text style={styles.loading}>Loading...</Text>
        ) : trackedProducts.length > 0 ? (
          <FlatList
            data={trackedProducts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.productRow}>
                <Avatar.Image size={40} source={{ uri: Array.isArray(item.imageUrls) && item.imageUrls.length > 0 ? item.imageUrls[0] : item.image }} style={styles.productAvatar} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.productName}>{item.name && item.name.length > 30 ? item.name.slice(0, 30) + '...' : item.name}</Text>
                  <Text style={styles.productPrice}>Target: ₹{item.targetPrice}</Text>
                </View>
              </View>
            )}
          />
        ) : (
          <Text style={styles.empty}>No tracked products yet.</Text>
        )}
      </Card>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    backgroundColor: '#1976D2',
    marginBottom: 8,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  card: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  loading: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 16,
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 16,
    fontSize: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 12,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  productAvatar: {
    marginRight: 12,
    backgroundColor: '#eee',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  productPrice: {
    fontSize: 14,
    color: '#1976D2',
  },
  trackedCount: {
    fontSize: 16,
    color: '#43A047',
    marginBottom: 8,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;