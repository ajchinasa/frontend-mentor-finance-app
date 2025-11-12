interface HeaderProps {
  onAddBudgetClick: () => void;
}

const Header = ({ onAddBudgetClick }: HeaderProps) => {
  return (
    <div className="w-full flex justify-between font-[Public_Sans] font-bold">
      <h4 className="text-2xl">Budgets</h4>
      <button
        onClick={onAddBudgetClick}
        className="text-xs text-white border border-gray-300 rounded-lg px-3 py-1 bg-[#201F24] hover:bg-[#F9FAFB] hover:text-[#201F24] transition-colors duration-200"
      >
        + Add New Budget
      </button>
    </div>
  );
};

export default Header;
