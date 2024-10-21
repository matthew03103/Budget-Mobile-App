import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CategoryDropdown from './CategoryDropdown';

const HomeScreen = () => {
  // Initialize with default empty arrays to prevent errors
  const [income, setIncome] = useState('');
  const [expense, setExpense] = useState('');
  const [category, setCategory] = useState(null);
  const [data, setData] = useState({ incomes: [0], expenses: [0], categories: [] });

  const navigation = useNavigation();

  const handleAddIncome = () => {
    if (income) {
      setData(prevData => ({
        ...prevData,
        incomes: [...prevData.incomes, parseFloat(income)],
      }));
      setIncome('');
    }
  };

  const handleAddExpense = () => {
    if (expense && category) {
      setData(prevData => ({
        ...prevData,
        expenses: [...prevData.expenses, parseFloat(expense)],
        categories: [...prevData.categories, category],
      }));
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
  graphButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  graphButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HomeScreen;
