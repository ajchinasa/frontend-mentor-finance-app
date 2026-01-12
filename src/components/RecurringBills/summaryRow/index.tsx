type SummaryRowProps = {
  label: string;
  count: number;
  amount: number;
  
};

const SummaryRow = ({
  label,
  count,
  amount,
 
}: SummaryRowProps) => {
  const isDueSoon = label === "Due Soon";

  return (
    <div className="flex justify-between items-center text-sm space-y-4 ">
      <span className={isDueSoon ? "text-red-600" : "text-gray-500"}>
        {label}
      </span>

      <span className={`flex items-center gap-1 ${ isDueSoon ? "text-red-600" : "text-gray-900" }`}>
        <span className="font-semibold">{count}</span>
<span className={`${isDueSoon ? "text-[#C94736]" : "text-[#201F24]"} font-semibold`}>          (
          {amount.toLocaleString(undefined, {
            style: "currency",
            currency: "USD",
          })}
          )
        </span>
      </span>
    </div>
  );
};

export default SummaryRow;