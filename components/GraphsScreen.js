import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { PieChart, BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const GraphsScreen = ({ route }) => {
  // Provide default data if route.params or data is undefined
  const data = route?.params?.data || { incomes: [0], expenses: [0], categories: ['No Category'] };

  // Handle empty data arrays and default to 0 if there's no data
  const defaultIncome = data.incomes.length === 0 ? [0] : data.incomes;
  const defaultExpenses = data.expenses.length === 0 ? [0] : data.expenses;
  const defaultCategories = data.categories.length === 0 ? ['No Category'] : data.categories;

  // Calculate totals for each category
  const categoryTotals = defaultCategories.reduce((acc, category, index) => {
    acc[category] = acc[category] ? acc[category] + defaultExpenses[index] : defaultExpenses[index];
    return acc;
  }, {});

  // Pie Data for Spending by Category
  const pieData = Object.keys(categoryTotals).map(key => ({
    name: key,
    amount: categoryTotals[key],
    color: getRandomColor(),
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  }));

  // Calculate total income and total spending
  const totalIncome = defaultIncome.reduce((total, num) => total + num, 0);
  const totalSpending = defaultExpenses.reduce((total, num) => total + num, 0);
  const totalSavings = totalIncome - totalSpending;

  // Bar Data for Income, Spending, and Savings
  const barData = {
    labels: ['Income', 'Spending', 'Savings'],
    datasets: [
      {
        data: [totalIncome, totalSpending, totalSavings],
      },
    ],
  };

  // Pie Data for Wants (Entertainment) vs Needs (Transportation, Food, Housing, Utilities)
  const wantsTotal = categoryTotals['Entertainment'] || 0;
  const needsTotal =
    (categoryTotals['Transportation'] || 0) +
    (categoryTotals['Food'] || 0) +
    (categoryTotals['Housing'] || 0) +
    (categoryTotals['Utilities'] || 0);

  const wantsVsNeedsData = [
    {
      name: 'Wants (Entertainment)',
      amount: wantsTotal,
      color: '#FF6347', // Red for wants
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Needs (Transportation, Food, Housing, Utilities)',
      amount: needsTotal,
      color: '#32CD32', // Green for needs
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Spending by Category</Text>
      <PieChart
        data={pieData.length > 0 ? pieData : [{ name: 'No Data', amount: 0, color: '#ccc', legendFontColor: '#7F7F7F', legendFontSize: 15 }]}
        width={screenWidth - 16}
        height={220}
        chartConfig={chartConfig}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />

      <Text style={styles.header}>Income, Spending, and Savings</Text>
      <BarChart
        data={barData}
        width={screenWidth - 16}
        height={220}
        chartConfig={chartConfig}
      />

      <Text style={styles.header}>Wants vs Needs</Text>
      <PieChart
        data={wantsVsNeedsData.length > 0 ? wantsVsNeedsData : [{ name: 'No Data', amount: 0, color: '#ccc', legendFontColor: '#7F7F7F', legendFontSize: 15 }]}
        width={screenWidth - 16}
        height={220}
        chartConfig={chartConfig}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  decimalPlaces: 2,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default GraphsScreen;
