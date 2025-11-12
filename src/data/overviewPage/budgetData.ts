export interface BudgetItem {
  label: string;
  amount: number;
  color: string;
}

export const budgetLimit = 975;

export const budgetUsed = 338;

export const budgetItems: BudgetItem[] = [
  { label: "Entertainment", amount: 50, color: "#208378" },
  { label: "Bills", amount: 750, color: "#63C8CE" },
  { label: "Dining Out", amount: 75, color: "#F3C8A3" },
  { label: "Personal Care", amount: 100, color: "#4A4A69" },
];
