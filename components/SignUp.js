import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { ref, set, getDatabase, get } from 'firebase/database';

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const database = getDatabase();

  const handleSignUp = async () => {
    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return;
      }

      // Ensure password length
      if (password.length < 7) {
        alert('Password must be at least 7 characters long.');
        return;
      }

      // Fetch the last user ID from the database
      const usersRef = ref(database, 'users');
      const snapshot = await get(usersRef);
      let newUserId = 1;

      if (snapshot.exists()) {
        const usersData = snapshot.val();
        // Find the max existing user ID and increment it for the new user
        const userIds = Object.keys(usersData).map(id => parseInt(id));
        newUserId = Math.max(...userIds) + 1;
      }

      // Create a new user object
      const newUser = {
        id: newUserId,
        username: username,
        email: email,
        password: password // In a real app, hash the password before saving
      };

      // Save the new user in the database
      await set(ref(database, 'users/' + newUserId), newUser);

      alert('User registered successfully!');
      navigation.navigate('Login');  // Navigate to Login after successful signup

    } catch (error) {
      console.error('Error signing up:', error);
      alert(error.message);  // Display error message
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign Up Page</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default SignUp;
