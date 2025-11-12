interface PotItemProps {
  label: string;
  amount: string;
  color: string;
}

const PotItem = ({ label, amount, color }: PotItemProps) => {
  return (
    <div className="flex items-start gap-2 min-w-[120px]">
      <div className="w-1 h-10 rounded" style={{ backgroundColor: color }} />
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-bold">{amount}</p>
      </div>
    </div>
  );
};

export default PotItem;
