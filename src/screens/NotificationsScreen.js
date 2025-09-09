import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Appbar } from 'react-native-paper';
import NotificationCard from '../components/NotificationCard';

const NotificationsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'price_drop',
      message: 'Price Drop Alert: iPhone 15 Pro. The price dropped to $850.00 - your target price! Auto-buy is enabled.',
      timestamp: '2 minutes ago',
    },
    {
      id: '2',
      type: 'new_product',
      message: 'New Product Added to Tracking. Sony WH-1000XM4 Headphones is now being tracked for price changes.',
      timestamp: '1 hour ago',
    },
    {
      id: '3',
      type: 'auto_buy_failed',
      message: 'Auto-Buy Failed. Could not complete auto-purchase for Gaming Laptop. Please check your payment method.',
      timestamp: '3 hours ago',
    },
  ]);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Notifications" />
      </Appbar.Header>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationCard notification={item} />}
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

export default NotificationsScreen;