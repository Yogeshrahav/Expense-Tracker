// components/ExpenseList.tsx
import React from 'react';
import { Entry } from '../types';

type ExpenseListProps = {
  entries: Entry[];
  onDelete: (id: string) => void;
  onEdit: (updatedEntry: Entry) => void;
};

const ExpenseList: React.FC<ExpenseListProps> = ({ entries, onDelete, onEdit }) => {
  return (
    <div>
      {entries.map((entry) => (
        <div key={entry.id} className="expense-item">
          <div className="expense-details">
            <span className="expense-date">{entry.date}</span>
            <span className="expense-description">{entry.description}</span>
            <span className="expense-type">{entry.type}</span> {/* Simple text for Income/Expense */}
            <div className="expense-actions">
              <button onClick={() => onDelete(entry.id)}>Delete</button>
              <button
                onClick={() => {
                  const newDescription = prompt('Enter new description', entry.description);
                  const newAmount = parseFloat(prompt('Enter new amount', entry.amount.toString()) || '0');
                  if (newDescription && newAmount) {
                    onEdit({
                      ...entry,
                      description: newDescription,
                      amount: newAmount,
                    });
                  }
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
