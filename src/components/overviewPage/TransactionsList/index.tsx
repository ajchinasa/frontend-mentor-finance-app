import React from "react";
import Transactions from "./../../overviewPage/transactions";
import type { TransactionItem } from "../../../context/AppDataContext";

const potIcon = "https://cdn-icons-png.flaticon.com/512/727/727606.png";

interface TransactionsListProps {
  transactions: TransactionItem[];
}

const TransactionsList: React.FC<TransactionsListProps> = ({
  transactions,
}) => {
  return (
    <div className="flex flex-col divide-y divide-[#F2F2F2]">
      {transactions.length > 0 ? (
        transactions.map((tx, i) => (
          <Transactions
            key={i}
            image={potIcon}
            name={tx.name}
            amount={
              tx.type === "Withdrawal" || tx.type === "Deleted"
                ? `-${tx.amount}`
                : `+${tx.amount}`
            }
            date={new Date(tx.date).toLocaleDateString()}
            category={tx.type}
          />
        ))
      ) : (
        <p className="text-center text-gray-400 py-8">No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionsList;
