import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import FaceId from './components/FaceId';
import Login from './components/Login';
import SignUp from './components/SignUp';
import HomeScreen from './components/HomeScreen'; // Adjusted the import to match your component
import GraphsScreen from './components/GraphsScreen'; // Adjusted the import to match your component
import Settings from './components/Settings';
import ManualInput from './components/ManualInput';
import UpdateInfo from './components/UpdateInfo';

const Stack = createStackNavigator();

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Better Budgeting</Text>
      
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('FaceId')} style={styles.imageButton}>
        <Image
          source={require('./assets/FaceID.png')}  // Ensure the path is correct
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="FaceId" component={FaceId} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Graphs" component={GraphsScreen} />
        <Stack.Screen name="Manual" component={ManualInput} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="Update" component={UpdateInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  imageButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 20,
    height: 20,
  },
});
