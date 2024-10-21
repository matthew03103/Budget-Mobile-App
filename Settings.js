import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);

  const handleSignOut = () => {
    // Handle sign-out logic here 
    // After handling sign-out, navigate to the login or welcome screen
    navigation.navigate('Welcome'); // Replace 'Welcome' with your actual route name for the login screen
  };

  const toggleNotifications = () => {
    setIsNotificationsEnabled(previousState => !previousState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      {/* Button to change user information */}
      <Button 
        title="Change Information" 
        onPress={() => navigation.navigate('Update')} // Navigates to the ChangeInfoScreen
        color="#2196F3" 
      />

      {/* Toggle switch for enabling/disabling notifications */}
      <View style={styles.notificationContainer}>
        <Text style={styles.notificationText}>Notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isNotificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleNotifications}
          value={isNotificationsEnabled}
        />
      </View>

      {/* Sign-out button */}
      <Button 
        title="Sign Out" 
        onPress={handleSignOut} 
        color="#f44336" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 20,
  },
  notificationText: {
    fontSize: 18,
  },
});

export default Settings;
