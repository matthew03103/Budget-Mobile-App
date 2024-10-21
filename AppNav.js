// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import GraphsScreen from './GraphsScreen';
import Settings from './Settings';
import Login from './Login';
import SignUp from './SignUp';
import FaceId from './FaceId';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="FaceId" component={FaceId} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Graphs" component={GraphsScreen} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
