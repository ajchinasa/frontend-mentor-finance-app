import { MdArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import BudgetCategory from "../../../../components/overviewPage/BudgetCategory";
import DonutChart from "../../../../components/DonutChart";
import { useEffect, useState } from "react";

interface BudgetItem {
  label: string;
  amount: number;
  limit: number;
  color: string;
}

const Budgets = () => {
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("budgets");
    if (saved) setBudgets(JSON.parse(saved));
  }, []);

  const visibleBudgets = budgets.slice(0, 4);
  const totalUsed = budgets.reduce((sum, b) => sum + b.amount, 0);
  const totalLimit = budgets.reduce((sum, b) => sum + b.limit, 0);

  return (
    <div className="bg-white rounded-2xl p-4 w-full font-[Public_Sans]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h5 className="font-bold text-[#201F24] text-xl md:text-2xl lg:text-base">
          Budgets
        </h5>
        <Link
          to="/budgets"
          className="flex gap-2 items-center text-[#696868] hover:underline"
        >
          <p className="font-normal text-sm md:text-xl lg:text-xs">See All</p>
          <MdArrowRight />
        </Link>
      </div>

      {visibleBudgets.length > 0 ? (
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-32 lg:gap-22">
          <DonutChart
            labels={visibleBudgets.map((b) => b.label)}
            data={visibleBudgets.map((b) => b.amount)}
            colors={visibleBudgets.map((b) => b.color)}
            centerValue={`$${totalUsed}`}
            centerLabel={`of $${totalLimit} limit`}
          />

          <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-1 md:gap-y-3">
            {visibleBudgets.map((item, index) => (
              <BudgetCategory
                key={index}
                label={item.label}
                amount={item.amount}
                color={item.color}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-[#696868]">No budgets created yet.</p>
      )}
    </div>
  );
};

export default Budgets;

