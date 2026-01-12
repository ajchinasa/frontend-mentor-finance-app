interface spendingSummaryCategoryProps {
  label: string;
  amount: number;
  limit: number;
  color: string;
}

const SpendingSummaryCategory = ({
  label,
  amount,
  limit,
  color,
}: spendingSummaryCategoryProps) => {
  return (
    <div className=" w-full flex text-sm gap-10 justify-between items-center border-b last:border-b-0 border-gray-200 pb-2 cursor-pointer">
      {/* Label + Color Bar */}
      <div className="flex items-center gap-2">
        <div
          className="w-[3px] h-12 md:h-4 rounded-full"
          style={{ backgroundColor: color }}
        />
        <p
          className="text-[#696868] text-lg md:text-lg lg:text-sm truncate max-w-[150px] "
          title={label}
        >
          {label}
        </p>
      </div>

      {/* Amount + Limit */}
      <div className="text-right">
        <p className="lg:text-xs text-[#696868]">
          <span className="text-black font-bold text-xl lg:text-sm">
            ${amount.toFixed(2)}
          </span>
          <span className="text-base lg:text-xs"> of ${limit.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

export default SpendingSummaryCategory;
