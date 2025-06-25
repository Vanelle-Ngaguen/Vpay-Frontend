import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

// Dummy transaction data
const transactions = [
  { id: '1', name: 'added funds', amount: +5000.00, date: '2024-07-04', time: '10:30 AM' },
  { id: '2', name: 'removed money', amount: -2500.00, date: '2024-07-03', time: '07:00 PM' },
  { id: '3', name: 'removed money', amount: 4000.00, date: '2024-07-03', time: '08:00 AM' },
  { id: '4', name: 'added funds', amount: 7500.00, date: '2024-07-02', time: '09:00 PM' },
  { id: '5', name: 'added funds', amount: 3000.00, date: '2024-07-01', time: '02:00 PM' },
];

type Transaction = {
  id: string;
  name: string;
  amount: number;
  date: string;
  time: string;
};

const TransactionItem = ({ item }: { item: Transaction }) => {
  return (
    <View style={styles.transactionContainer}>
      <View style={styles.nameAmountContainer}>
        <Text style={styles.transactionName}>{item.name}</Text>
        <Text style={styles.transactionAmount}>FCFA  {item.amount.toFixed(2)}</Text>
      </View>
      <Text style={styles.transactionDateTime}>{item.date} - {item.time}</Text>
    </View>
  );
};

const TransactionScreen = () => {
  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TransactionItem item={item} />}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  transactionContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  nameAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  transactionName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  transactionAmount: {
    fontSize: 18,
  },
  transactionDateTime: {
    fontSize: 14,
    color: '#888',
  },
});

export default TransactionScreen;