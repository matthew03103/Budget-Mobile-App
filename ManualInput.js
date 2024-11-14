import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ref, set, get, child, getDatabase, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import CategoryDropdown from './CategoryDropdown';

const HomeScreen = () => {
  const [income, setIncome] = useState('');
  const [expense, setExpense] = useState('');
  const [category, setCategory] = useState(null);
  const [data, setData] = useState({ incomes: [0], expenses: [0], categories: [] });
  const navigation = useNavigation();
  const database = getDatabase();
  const auth = getAuth();

  // Fetch current user from Firebase Authentication
  const user = auth.currentUser;
  
  useEffect(() => {
    if (user) {
      // Fetch saved data from the database on component mount
      const userRef = ref(database, 'users/' + user.uid);
      onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          setData(userData);
        }
      });
    } else {
      // If no user is logged in, redirect to login screen
      navigation.navigate('Login');
    }
  }, [user, database, navigation]);

  // Save data to Firebase Realtime Database for the logged-in user
  const saveDataToFirebase = () => {
    if (user) {
      const userRef = ref(database, 'users/' + user.uid);
      set(userRef, {
        incomes: data.incomes,
        expenses: data.expenses,
        categories: data.categories,
      })
      .then(() => {
        Alert.alert('Data saved successfully!');
      })
      .catch((error) => {
        console.error('Error saving data:', error);
        Alert.alert('Failed to save data!');
      });
    }
  };

  const handleAddIncome = () => {
    if (income) {
      setData(prevData => {
        const updatedData = {
          ...prevData,
          incomes: [...prevData.incomes, parseFloat(income)],
        };
        saveDataToFirebase(); // Save to Firebase whenever data changes
        return updatedData;
      });
      setIncome('');
    }
  };

  const handleAddExpense = () => {
    if (expense && category) {
      setData(prevData => {
        const updatedData = {
          ...prevData,
          expenses: [...prevData.expenses, parseFloat(expense)],
          categories: [...prevData.categories, category],
        };
        saveDataToFirebase(); // Save to Firebase whenever data changes
        return updatedData;
      });
      setExpense('');
      setCategory(null);
    }
  };

  const getTotal = (arr) => arr.reduce((total, num) => total + num, 0);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Home Screen</Text>
      </View>

      <TextInput
        placeholder="Enter Income"
        keyboardType="numeric"
        value={income}
        onChangeText={setIncome}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleAddIncome} style={styles.button}>
        <Text style={styles.buttonText}>Add Income</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Enter Expense"
        keyboardType="numeric"
        value={expense}
        onChangeText={setExpense}
        style={styles.input}
      />

      <CategoryDropdown category={category} setCategory={setCategory} />

      <TouchableOpacity onPress={handleAddExpense} style={styles.button}>
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>

      <Text style={styles.summary}>Total Income: ${getTotal(data.incomes)}</Text>
      <Text style={styles.summary}>Total Expenses: ${getTotal(data.expenses)}</Text>
      <Text style={styles.summary}>Savings: ${getTotal(data.incomes) - getTotal(data.expenses)}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 20,
    borderRadius: 5,
  },
  summary: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
