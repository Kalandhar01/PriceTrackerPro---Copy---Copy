import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { Appbar, Avatar, Card, Title, Paragraph } from 'react-native-paper';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Profile" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Card style={styles.profileCard}>
          <Card.Content style={styles.profileContent}>
            <Avatar.Image size={80} source={{ uri: 'https://via.placeholder.com/150' }} />
            <View style={styles.userInfo}>
              <Title>John Doe</Title>
              <Paragraph>john.doe@example.com</Paragraph>
              <Paragraph>Member since: January 2023</Paragraph>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.settingsCard}>
          <Card.Content>
            <Title>Settings</Title>
            <View style={styles.settingItem}>
              <Text style={styles.settingText}>Enable Notifications</Text>
              {/* Toggle switch would go here */}
            </View>
            <View style={styles.settingItem}>
              <Text style={styles.settingText}>Dark Mode</Text>
              {/* Toggle switch would go here */}
            </View>
            <View style={styles.settingItem}>
              <Text style={styles.settingText}>Change Password</Text>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileCard: {
    width: '90%',
    marginBottom: 20,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInfo: {
    marginLeft: 20,
  },
  settingsCard: {
    width: '90%',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingText: {
    fontSize: 16,
  },
});

export default ProfileScreen;