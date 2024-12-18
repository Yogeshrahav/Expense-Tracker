// components/ExpenseForm.tsx
import React, { useState } from 'react';
import { Entry } from '../types';

type ExpenseFormProps = {
  onAddEntry: (entry: Entry) => void;
};

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddEntry }) => {
  const [type, setType] = useState<'Income' | 'Expense'>('Income');
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !date) return;

    const newEntry: Entry = {
      id: Date.now().toString(),
      type,
      description,
      amount,
      date,
    };

    onAddEntry(newEntry);
    setDescription('');
    setAmount(0);
    setDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value as 'Income' | 'Expense')}>
        <option value=" Income"> Income </option>
        <option value="  Expense"> Expense </option>
      </select>
      <button type="submit"> Add Entry </button>
    </form>
  );
};

export default ExpenseForm;
