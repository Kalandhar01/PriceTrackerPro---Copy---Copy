import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const WishlistItem = ({ item, onDelete, onToggleNotifications, onToggleAutoBuy }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.details}>
          <Title>{item.name}</Title>
          <Paragraph>Current: ${item.currentPrice}</Paragraph>
          <Paragraph>Target: ${item.targetPrice}</Paragraph>
          <Text style={item.status === 'Tracking' ? styles.tracking : styles.priceHit}>
            {item.status}
          </Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteButton}>
            <Icon name="delete" size={24} color="red" />
          </TouchableOpacity>
          <Button onPress={() => onToggleNotifications(item.id)}>
            {item.notificationsOn ? 'Notifications On' : 'Notifications Off'}
          </Button>
          <Button onPress={() => onToggleAutoBuy(item.id)}>
            {item.autoBuyOn ? 'Auto-Buy On' : 'Auto-Buy Off'}
          </Button>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  details: {
    flex: 1,
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  deleteButton: {
    marginBottom: 10,
  },
  tracking: {
    color: 'orange',
    fontWeight: 'bold',
  },
  priceHit: {
    color: 'green',
    fontWeight: 'bold',
  },
});

export default WishlistItem;