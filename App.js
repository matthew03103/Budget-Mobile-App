import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // Import Firebase Auth
import { getDatabase } from "firebase/database";  // Import Firebase Database
import FaceId from './components/FaceId';
import Login from './components/Login';
import SignUp from './components/SignUp';

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
// Home Screen component
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Better Budgeting</Text>
      
      {/* Login Button */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
      {/* Sign Up Button */}
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Face ID Button as Image */}
      <TouchableOpacity onPress={() => navigation.navigate('FaceId')} style={styles.imageButton}>
        <Image
          source={require('./assets/FaceID.png')}  // Ensure the path is correct
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-Cy1jd5fPTXxZcjqtP4BgmVFr-EdDYko",
  authDomain: "budgetapp-ed5e4.firebaseapp.com",
  projectId: "budgetapp-ed5e4",
  storageBucket: "budgetapp-ed5e4.appspot.com",
  messagingSenderId: "52506892548",
  appId: "1:52506892548:web:bb282708aec850c3121851",
  measurementId: "G-MD8MWXVL0F"
};

// Initialize Firebase (prevent re-initialization if already initialized)
const app = initializeApp(firebaseConfig);  // Initialize app
  // Use the already initialized app
const database = getDatabase(app);

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
    width: 100,  // Adjust size based on your design
    height: 100, // Adjust size based on your design
  },
});
