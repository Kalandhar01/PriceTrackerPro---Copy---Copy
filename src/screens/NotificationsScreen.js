import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import NotificationCard from '../components/NotificationCard';

const NotificationsScreen = ({ navigation, route }) => {
  // Accept notifications from navigation params or global state in future
  const [notifications, setNotifications] = useState(route?.params?.notifications || []);

  return (
    <View style={styles.container}>
      {/* Only one header retained, duplicate removed */}
      {/* Only one header retained, duplicate removed */}
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationCard notification={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 40 }}>No notifications yet.</Text>}
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