// components/ExpenseTracker.tsx
import React, { useState } from 'react';
import { Entry } from '../types';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import ExpenseChart from './ExpenseChart';

const ExpenseTracker: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  const addEntry = (entry: Entry) => {
    setEntries([...entries, entry]);
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const editEntry = (updatedEntry: Entry) => {
    setEntries(entries.map((entry) => (entry.id === updatedEntry.id ? updatedEntry : entry)));
  };

  const totalIncome = entries
    .filter((entry) => entry.type === 'Income')
    .reduce((sum, entry) => sum + entry.amount, 0);

  const totalExpense = entries
    .filter((entry) => entry.type === 'Expense')
    .reduce((sum, entry) => sum + entry.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div>
      <h1> Monthly Expense Tracker </h1>
      <ExpenseForm onAddEntry={addEntry} />
      <h2>Total Income: ${totalIncome}</h2>
      <h2>Total Expense: ${totalExpense}</h2>
      <h2>Balance: ${balance}</h2>
      <ExpenseList entries={entries} onDelete={deleteEntry} onEdit={editEntry} />
      <ExpenseChart entries={entries} />
    </div>
  );
};

export default ExpenseTracker;
