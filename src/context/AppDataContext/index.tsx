// import React, { createContext, useContext, useEffect, useState } from "react";

// export interface PotItem {
//   category: string;
//   color: string;
//   target?: number;
//   spent?: number;
// }

// export type TransactionType =
//   | "Deposit"
//   | "Withdrawal"
//   | "Created"
//   | "Deleted"
//   | "Edited";

// export interface TransactionItem {
//   name: string;
//   category: string;
//   amount: number;
//   date: string;
//   type: TransactionType;
//   note?: string;
// }

// interface AppDataContextType {
//   pots: PotItem[];
//   setPots: React.Dispatch<React.SetStateAction<PotItem[]>>;
//   transactions: TransactionItem[];
//   addTransaction: (tx: TransactionItem) => void;
// }

// const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

// export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [pots, setPots] = useState<PotItem[]>(() => {
//     const saved = localStorage.getItem("pots");
//     return saved ? JSON.parse(saved) : [];
//   });

//   const [transactions, setTransactions] = useState<TransactionItem[]>(() => {
//     const saved = localStorage.getItem("transactions");
//     return saved ? JSON.parse(saved) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("pots", JSON.stringify(pots));
//   }, [pots]);

//   useEffect(() => {
//     localStorage.setItem("transactions", JSON.stringify(transactions));
//   }, [transactions]);

//   const addTransaction = (tx: TransactionItem) => {
//     setTransactions((prev) => [tx, ...prev]);
//   };

//   return (
//     <AppDataContext.Provider value={{ pots, setPots, transactions, addTransaction }}>
//       {children}
//     </AppDataContext.Provider>
//   );
// };

// export const useAppData = (): AppDataContextType => {
//   const ctx = useContext(AppDataContext);
//   if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
//   return ctx;
// };







// import React, { createContext, useContext, useEffect, useState } from "react";

// export interface PotItem {
//   category: string;
//   color: string;
//   target?: number;
//   spent?: number;
// }

// export type TransactionType =
//   | "Deposit"
//   | "Withdrawal"
//   | "Created"
//   | "Deleted"
//   | "Edited";

// export interface TransactionItem {
//   name: string;
//   category: string;
//   amount: number;
//   date: string;
//   type: TransactionType;
//   note?: string;
// }

// interface AppDataContextType {
//   pots: PotItem[];
//   setPots: React.Dispatch<React.SetStateAction<PotItem[]>>;
//   transactions: TransactionItem[];
//   addTransaction: (tx: TransactionItem) => void;
// }

// const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

// export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [pots, setPots] = useState<PotItem[]>(() => {
//     const saved = localStorage.getItem("pots");
//     return saved ? JSON.parse(saved) : [];
//   });

//   const [transactions, setTransactions] = useState<TransactionItem[]>(() => {
//     const saved = localStorage.getItem("transactions");
//     return saved ? JSON.parse(saved) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("pots", JSON.stringify(pots));
//   }, [pots]);

//   useEffect(() => {
//     localStorage.setItem("transactions", JSON.stringify(transactions));
//   }, [transactions]);

//   const addTransaction = (tx: TransactionItem) => {
//     setTransactions((prev) => [tx, ...prev]);
//   };

//   return (
//     <AppDataContext.Provider
//       value={{ pots, setPots, transactions, addTransaction }}
//     >
//       {children}
//     </AppDataContext.Provider>
//   );
// };

// export const useAppData = (): AppDataContextType => {
//   const ctx = useContext(AppDataContext);
//   if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
//   return ctx;
// };


















import React, { createContext, useContext, useEffect, useState } from "react";

export interface PotItem {
  category: string;
  color: string;
  target?: number;
  spent?: number;
}

export type TransactionType =
  | "Deposit"
  | "Withdrawal"
  | "Created"
  | "Deleted"
  | "Edited";

export interface TransactionItem {
  name: string;
  category: string;
  amount: number;
  date: string;
  type: TransactionType;
  note?: string;
}

interface AppDataContextType {
  pots: PotItem[];
  setPots: React.Dispatch<React.SetStateAction<PotItem[]>>;
  transactions: TransactionItem[];
  addTransaction: (tx: TransactionItem) => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pots, setPots] = useState<PotItem[]>(() => {
    const saved = localStorage.getItem("pots");
    return saved ? JSON.parse(saved) : [];
  });

  const [transactions, setTransactions] = useState<TransactionItem[]>(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("pots", JSON.stringify(pots));
  }, [pots]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (tx: TransactionItem) => {
    setTransactions((prev) => [tx, ...prev]);
  };

  return (
    <AppDataContext.Provider
      value={{ pots, setPots, transactions, addTransaction }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = (): AppDataContextType => {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
  return ctx;
};
