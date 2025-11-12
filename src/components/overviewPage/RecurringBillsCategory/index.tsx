interface RecurringBillsCategoryProps {
  label: string;
  amount: string;
  color: string;
}

const RecurringBillsCategory = ({
  label,
  amount,
  color,
}: RecurringBillsCategoryProps) => {
  return (
    <div className="relative flex items-center justify-between w-full bg-[#F8F4F0] rounded-xl pl-6 pr-4 py-4 overflow-hidden">
      {/* Colored curve background */}
      <div
        className="absolute left-0 top-0 h-full w-1 rounded-l-xl"
        style={{ backgroundColor: color }}
      />

      <div className="flex items-center gap-4 z-10">
        <p className="text-xs text-gray-500">{label}</p>
      </div>

      <p className="text-sm font-bold z-10">{amount}</p>
    </div>
  );
};

export default RecurringBillsCategory;
