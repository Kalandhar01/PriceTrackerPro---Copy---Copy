import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';

const NotificationCard = ({ notification }) => {
  const getCardStyle = (type) => {
    switch (type) {
      case 'price_drop':
        return styles.priceDrop;
      case 'new_product':
        return styles.newProduct;
      case 'auto_buy_failed':
        return styles.autoBuyFailed;
      default:
        return {};
    }
  };

  return (
    <Card style={[styles.card, getCardStyle(notification.type)]}>
      <Card.Content>
        <Paragraph style={styles.message}>{notification.message}</Paragraph>
        <Text style={styles.timestamp}>{notification.timestamp}</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
  },
  priceDrop: {
    backgroundColor: '#e6ffe6', // Light green
  },
  newProduct: {
    backgroundColor: '#e6f7ff', // Light blue
  },
  autoBuyFailed: {
    backgroundColor: '#fff7e6', // Light orange
  },
  message: {
    fontSize: 16,
    marginBottom: 5,
  },
  timestamp: {
    fontSize: 12,
    color: 'gray',
  },
});

export default NotificationCard;