// components/ExpenseChart.tsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Entry } from '../types';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type ExpenseChartProps = {
  entries: Entry[];
};

const ExpenseChart: React.FC<ExpenseChartProps> = ({ entries }) => {
  // Group entries by date
  const groupedData: { [date: string]: { income: number; expense: number } } = {};

  entries.forEach((entry) => {
    const date = entry.date;
    if (!groupedData[date]) {
      groupedData[date] = { income: 0, expense: 0 };
    }

    if (entry.type === 'Income') {
      groupedData[date].income += entry.amount;
    } else {
      groupedData[date].expense += entry.amount;
    }
  });

  // Sort dates in chronological order
  const sortedDates = Object.keys(groupedData).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  // Prepare data for the chart
  const incomeData = sortedDates.map((date) => groupedData[date].income);
  const expenseData = sortedDates.map((date) => groupedData[date].expense);

  const data = {
    labels: sortedDates, // Sorted dates
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue for Income
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        stack: 'stack1', // Grouping for stacked bar
      },
      {
        label: 'Expense',
        data: expenseData,
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red for Expense
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        stack: 'stack1', // Grouping for stacked bar
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        stacked: true, // Stack the bars for each day
      },
      x: {
        stacked: true, // Stack the bars for each day
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || '';
            const value = context.raw;
            return `${label}: $${value.toFixed(2)}`;
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ExpenseChart;
