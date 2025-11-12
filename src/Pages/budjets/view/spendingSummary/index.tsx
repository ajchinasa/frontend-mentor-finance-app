import DonutChart from "../../../../components/DonutChart";
import SpendingSummaryCategory from "../../../../components/budgetPage/SpendingSummaryCategory";
import type { spendingSummaryItem } from "../../../../data/budgetPage/spendingSummary";

interface SpendingSummaryProps {
  budgetItems: spendingSummaryItem[];
}

const SpendingSummary = ({ budgetItems }: SpendingSummaryProps) => {
  const totalLimit = budgetItems.reduce((sum, item) => sum + item.limit, 0);
  const totalUsed = budgetItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="flex flex-col md:flex-row lg:flex-col w-full bg-white rounded-xl p-4 md:p-14 lg:p-6 md:justify-between lg:justify-start">
      {/* Chart Section */}
      <div className="flex flex-col justify-center items-center gap-8 md:gap-32 lg:gap-22 py-4">
        <DonutChart
          labels={budgetItems.map((item) => item.label)}
          data={budgetItems.map((item) => item.amount)}
          colors={budgetItems.map((item) => item.color)}
          centerValue={`$${totalUsed}`}
          centerLabel={`of $${totalLimit} limit`}
        />
      </div>

      {/* Summary Breakdown */}
      <div>
        <h6 className="text-[#201F24] text-2xl lg:text-base font-bold py-5">
          Spending Summary
        </h6>

        <div className="flex-1 grid grid-cols-1 gap-x-4 gap-y-3 md:gap-y-3">
          {budgetItems.map((item, index) => (
            <SpendingSummaryCategory
              key={index}
              label={item.label}
              amount={item.amount}
              limit={item.limit}
              color={item.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingSummary;
