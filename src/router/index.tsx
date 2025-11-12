// src/router/index.tsx
import { createHashRouter } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Home from "../Pages/home";
import Transactions from "../Pages/transactions";
import NotFound from "../Pages/not-found";
import Budgets from "../Pages/budjets";
import Pots from "../Pages/pots";

const router = createHashRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "transactions", element: <Transactions /> },
      { path: "budgets", element: <Budgets /> },
      { path: "pots", element: <Pots /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export { router };
