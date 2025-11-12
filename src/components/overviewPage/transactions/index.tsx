interface TransactionsProps {
  image: string;
  name: string;
  amount: string | number;
  date: string;
  category?: string;
  compact?: boolean;
}

const Transactions = ({
  image,
  name,
  amount,
  date,
  category,
  compact = false,
}: TransactionsProps) => {
  const isPositive = typeof amount === "string" && amount.startsWith("+");

  if (compact) {
    // Compact version for Home page
    return (
      <div className="flex justify-between items-center py-3 border-b border-[#F2F2F2] text-sm">
        <div className="flex items-center gap-3">
          <img src={image} alt={name} className="w-8 h-8 rounded-full" />
          <div>
            <p className="font-medium">{name}</p>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <p
            className={`text-sm md:text-xl lg:text-sm font-bold ${
              isPositive ? "text-[#099463]" : "text-black"
            }`}
          >
            {amount}
          </p>
          <p className="text-sm md:text-xl lg:text-xs text-gray-500">{date}</p>
        </div>
      </div>
    );
  }

  // Full Transactions page layout
  return (
    <div className="grid grid-cols-2 md:grid-cols-3  items-center py-2 border-b border-[#F2F2F2] last:border-b-0 text-sm  font-[Public_Sans]">
      {/* visible on small screens */}
      {/* Recipient / Sender */}
      <div className="md:hidden flex items-center gap-3">
        <img src={image} alt={name} className="w-8 h-8 rounded-full" />
        <div className=" flex flex-col">
          <p className="font-medium text-[#201F24]">{name}</p>
          <p className="text-[#5F5F5F]">{category}</p>
        </div>
      </div>

      <div className="flex flex-col md:hidden items-end">
        {/* Amount */}
        <p
          className={`font-semibold text-right ${
            isPositive ? "text-[#099463]" : "text-black"
          }`}
        >
          {amount}
        </p>
        {/* Date */}
        <p className="text-[#5F5F5F]">{date}</p>
      </div>

      {/* visible on medium and large screens */}
      <div className="hidden md:flex items-center gap-3">
        <img src={image} alt={name} className="w-8 h-8 rounded-full" />
        <p className="font-medium text-[#201F24]">{name}</p>
      </div>

      {/* Category */}
      <div className="hidden md:flex gap-6 lg:gap-14 ml-16 lg:ml-24">
        <p className=" text-[#5F5F5F]">{category}</p>

        {/* Date */}
        <p className="text-[#5F5F5F]">{date}</p>
      </div>
      {/* Amount */}
      <p
        className={`hidden md:block font-semibold text-right ${
          isPositive ? "text-[#099463]" : "text-black"
        }`}
      >
        {amount}
      </p>
    </div>
  );
};

export default Transactions;
