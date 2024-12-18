// types.ts
export type Entry = {
    id: string;
    date: string;
    type: 'Income' | 'Expense';
    description: string;
    amount: number;
  };
  