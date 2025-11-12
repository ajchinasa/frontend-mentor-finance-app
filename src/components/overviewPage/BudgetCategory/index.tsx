interface BudgetCategoryProps {
  label: string;
  amount: number;
  color: string;
}

const BudgetCategory = ({ label, amount, color }: BudgetCategoryProps) => {
  return (
    <div className="w-full flex text-sm">
      <div className="flex items-center gap-4">
        <div
          className="w-[3px] h-12 md:h-8 rounded-full"
          style={{ backgroundColor: color }}
        />
        <div>
          <p className="text-[#696868] text-sm md:text-lg lg:text-sm truncate max-w-[100px]">
            {label}
          </p>

          <p className="font-bold text-sm md:text-lg lg:text-sm text-[#201F24]">
            ${amount.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BudgetCategory;
