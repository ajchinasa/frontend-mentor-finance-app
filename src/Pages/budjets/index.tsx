import { useState, useEffect } from "react";
import SpendingSummary from "../budjets/view/spendingSummary";
import Header from "./view/header";
import BudgetCard from "../../components/budgetPage/BudgetCardProps";
import type { spendingSummaryItem } from "../../data/budgetPage/spendingSummary";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Budgets = () => {
  // Load budgets from localStorage on mount
  const [budgetItemsState, setBudgetItemsState] = useState<
    spendingSummaryItem[]
  >(() => {
    const saved = localStorage.getItem("budgets");
    return saved ? JSON.parse(saved) : [];
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newLimit, setNewLimit] = useState<number>(0);
  const [newColor, setNewColor] = useState("#201F24");
  const [newColorName, setNewColorName] = useState("");
  const [themeOpen, setThemeOpen] = useState(false);

  //Save to localStorage whenever budgets change (for overview page)
  useEffect(() => {
    localStorage.setItem("budgets", JSON.stringify(budgetItemsState));
  }, [budgetItemsState]);

  //Handle Enter key globally (for modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && isAddModalOpen) {
        e.preventDefault();
        handleAddBudgetSubmit(e as any);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAddModalOpen, newCategory, newLimit, newColor]);

  // Update budget
  const handleUpdate = (
    index: number,
    updated: { category: string; max: number; color: string }
  ) => {
    setBudgetItemsState((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              label: updated.category,
              limit: updated.max,
              color: updated.color,
            }
          : item
      )
    );
  };

  // Delete budget
  const handleDeleteBudget = (category: string) => {
    setBudgetItemsState((prev) =>
      prev.filter((item) => item.label !== category)
    );
  };

  // Add new budget
  const handleAddBudgetSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCategory.trim()) return alert("Please enter a category name");
    if (newLimit <= 0) return alert("Please enter a valid limit");

    const newBudget: spendingSummaryItem = {
      label: newCategory,
      amount: 0,
      limit: newLimit,
      color: newColor,
    };

    // Add new budget to top
    setBudgetItemsState((prev) => [newBudget, ...prev]);
    setIsAddModalOpen(false);

    // Reset form
    setNewCategory("");
    setNewLimit(0);
    setNewColor("#201F24");
    setNewColorName("");
  };

  return (
    <div className="flex flex-col w-full md:p-4 lg:px-8 lg:py-2 gap-8">
      {/* Header */}
      <Header onAddBudgetClick={() => setIsAddModalOpen(true)} />

      <div className="flex flex-col lg:flex-row w-full gap-5 font">
        {/* Spending Summary updates live */}
        <div className="w-full lg:w-1/3">
          <SpendingSummary budgetItems={budgetItemsState} />
        </div>

        {/* Budget Cards */}
        <div className="flex flex-col w-full lg:w-2/3 pb-18 gap-5">
          {budgetItemsState.map((budget, i) => (
            <BudgetCard
              key={i}
              category={budget.label}
              color={budget.color}
              max={budget.limit}
              spent={budget.amount}
              spendingHistory={[]}
              allBudgetItems={budgetItemsState}
              onUpdate={(updated) => handleUpdate(i, updated)}
              onDelete={handleDeleteBudget}
            />
          ))}
        </div>
      </div>

      {/*  Add New Budget Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setIsAddModalOpen(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-96 shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="text-lg absolute top-6 right-6 text-gray-400 hover:text-black"
            >
              <IoIosCloseCircleOutline />
            </button>

            <h3 className="text-lg font-bold text-[#201F24] mb-2">
              Add New Budget
            </h3>
            <p className="font-normal text-xs text-[#696868] mb-3">
              Choose a category to set a spending budget. These categories can
              help you monitor spending.
            </p>

            <form onSubmit={handleAddBudgetSubmit}>
              {/* Category */}
              <label className="block text-sm text-[#696868] mb-2">
                Budget Category
              </label>
              <input
                type="text"
                placeholder="Enter category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#201F24]"
              />

              {/* Limit */}
              <label className="block text-sm text-[#696868] mb-2">
                Maximum Spend
              </label>
              <div className="relative mb-4">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="text"
                  placeholder="Enter limit"
                  value={newLimit || ""}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    setNewLimit(Number(val));
                  }}
                  className="w-full border border-gray-300 rounded-lg p-2 pl-7 focus:outline-none focus:ring-2 focus:ring-[#201F24]"
                />
              </div>

              {/* Theme */}
              <label className="block text-sm text-[#696868] mb-2">Theme</label>
              <div className="relative mb-4">
                <button
                  type="button"
                  onClick={() => setThemeOpen((prev) => !prev)}
                  className="w-full flex justify-between items-center px-3 py-2 border rounded-lg text-sm text-[#201F24] focus:outline-none"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full border"
                      style={{ backgroundColor: newColor }}
                    />
                    <span>{newColorName || "Select a theme"}</span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      themeOpen ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {themeOpen && (
                  <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-60 overflow-y-auto">
                    {[
                      { name: "Green", value: "#10B981" },
                      { name: "Yellow", value: "#FACC15" },
                      { name: "Cyan", value: "#06B6D4" },
                      { name: "Navy", value: "#1E3A8A" },
                      { name: "Red", value: "#EF4444" },
                      { name: "Purple", value: "#8B5CF6" },
                      { name: "Turquoise", value: "#14B8A6" },
                    ].map((option) => {
                      const isUsed = budgetItemsState.some(
                        (item) => item.color === option.value
                      );

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            if (!isUsed) {
                              setNewColor(option.value);
                              setNewColorName(option.name);
                              setThemeOpen(false);
                            }
                          }}
                          disabled={isUsed}
                          className={`flex justify-between items-center w-full px-3 py-2 text-left text-sm rounded-md transition
                            ${
                              isUsed
                                ? "opacity-50 cursor-not-allowed bg-gray-50"
                                : "hover:bg-gray-50"
                            }
                            ${newColor === option.value ? "bg-gray-100" : ""}`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="w-3 h-3 rounded-full border"
                              style={{
                                backgroundColor: isUsed
                                  ? "#e5e7eb"
                                  : option.value,
                              }}
                            />
                            <span className="text-[#201F24]">
                              {option.name}
                            </span>
                          </div>
                          {isUsed && (
                            <span className="text-xs text-gray-400">
                              Already used
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm bg-[#201F24] text-white rounded-lg hover:bg-black"
              >
                Create Budget
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Budgets;
