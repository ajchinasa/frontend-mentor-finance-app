interface OverviewBalanceCardProps {
  label: string;
  value: string;
}

const OverviewBalanceCard = ({ label, value }: OverviewBalanceCardProps) => {
  return (
    <div
      className={`flex flex-col bg-[#FFFFFF] py-4 px-8 rounded-xl text-black gap-2 min-w-[200px] transition-colors duration-300 hover:bg-[#201F24] hover:text-white cursor-pointer`}
    >
      <p className="text-sm md:text-base lg:text-xs font-normal">{label}</p>
      <p className="text-4xl md:text-3xl lg:text-2xl font-bold">{value}</p>
    </div>
  );
};

export default OverviewBalanceCard;
