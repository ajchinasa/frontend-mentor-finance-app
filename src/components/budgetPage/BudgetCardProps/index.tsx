

import { MdCircle, MdArrowRight } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { useState, useRef, useEffect } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";

interface Spending {
  id: number;
  name: string;
  amount: number;
  date: string;
  avatar?: string;
}

interface BudgetCardProps {
  budgetName: string; 
  category: string;
  color: string;
  max: number;
  spent: number;
  spendingHistory: Spending[];
  allBudgetItems: { label: string; color: string }[];
  onUpdate?: (updated: {
    budgetName: string;
    category: string;
    max: number;
    color: string;
  }) => void;
  onDelete?: (category: string) => void;
    onAddSpending?: (amount: number) => void;

}

const BudgetCard = ({
  budgetName, 
  category,
  color,
  max,
  spent,
  spendingHistory,
  allBudgetItems,
  onUpdate,
  onDelete,
   onAddSpending,
}: BudgetCardProps) => {
  // See All modal state (used for Latest Spending "See All")
  const [isOpen, setIsOpen] = useState(false);

  // menu, edit, delete states
  const [menuOpen, setMenuOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // edit form state
  const [newMax, setNewMax] = useState(max);
  const [newColor, setNewColor] = useState(color);
  const [newColorName, setNewColorName] = useState("");
  const [themeOpen, setThemeOpen] = useState(false);
  const [newBudgetName, setNewBudgetName] = useState(budgetName);
  const [nameError, setNameError] = useState("");

   // plus icon modal state
const [addOpen, setAddOpen] = useState(false);
const [spendingName, setSpendingName] = useState("");
const [spendingDate, setSpendingDate] = useState("");
const [spendingAmount, setSpendingAmount] = useState("");

//Local State for Spending History
const [localSpendingHistory, setLocalSpendingHistory] =
  useState<Spending[]>(() => {
    const saved = localStorage.getItem(`spending-${category}`);
    return saved ? JSON.parse(saved) : spendingHistory;
  });
useEffect(() => {
  localStorage.setItem(
    `spending-${category}`,
    JSON.stringify(localSpendingHistory)
  );
}, [localSpendingHistory, category]);

//Total Spent Value State
const totalSpent = localSpendingHistory.reduce(
  (acc, item) => acc + Number(item.amount),
  0
);

//Budget Categories
  const categories = [
    "Entertainment",
    "Groceries",
    "Bills",
    "Transportation",
    "Education",
    "Other",
  ];

  
  
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [customCategory, setCustomCategory] = useState("");

  const menuRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const deleteFormRef = useRef<HTMLFormElement | null>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Enter key for Edit Modal (and avoid submitting while theme/color dropdown is open)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!editOpen) return;
      if (e.key === "Enter" && !themeOpen) {
        // Ignore Enter when dropdown open (so Enter can select color inside dropdown)
        e.preventDefault();
        formRef.current?.requestSubmit?.();
      }
      if (e.key === "Escape") {
        // close modal with Escape
        setEditOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editOpen, themeOpen]);

  // Enter & Escape To Delete Modal
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!deleteOpen) return;
      if (e.key === "Enter") {
        e.preventDefault();
        deleteFormRef.current?.requestSubmit?.();
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setDeleteOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [deleteOpen]);

  // Progress calculation
  const remaining = max - totalSpent;
const isOverspent = totalSpent > max;
const progress = Math.min((totalSpent / max) * 100, 100);


  return (
    <div className="bg-white rounded-xl p-4 w-full font-[Public_Sans] shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 relative">
        <div className="flex items-center gap-2">
          <MdCircle className="text-lg" style={{ color }} />
          <p className="font-bold text-[#201F24] text-2xl lg:text-base truncate max-w-[150px] cursor-pointer">
            {budgetName}
          </p>
        </div>

        {/* 3 dots menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-[#B3B3B3] hover:text-black cursor-pointer"
            aria-label="Open budget menu"
          >
            <BsThreeDots size={20} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setEditOpen(true);
                  setNewMax(max);
                  setNewColor(color);
                  setNewColorName("");
                  setSelectedCategory(category);
                  setCustomCategory("");
                  setNewBudgetName(budgetName);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-[#201F24] hover:bg-gray-100"
              >
                Edit Budget
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setDeleteOpen(true);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Delete Budget
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Max */}
      <p className="text-base md:text-lg lg:text-xs text-[#696868] mb-4">
        Maximum of ${max.toFixed(2)}
      </p>

      {/* Progress Bar */}
      <div className="w-full h-4 bg-[#F8F4F0] rounded-lg mb-4 overflow-hidden">
        <div
          className="h-4 rounded-lg transition-all duration-300"
          style={{
            width: `${progress}%`,
            backgroundColor: isOverspent ? "#DC2626" : color,
          }}
        ></div>
      </div>

      {/* Spent vs Remaining */}
      <div className="flex justify-start text-sm mb-4">
        <div className="flex gap-2 items-center">
          <span
            className="inline-block w-[3px] h-10 rounded"
            style={{ backgroundColor: color }}
            aria-hidden="true"
          />
          <div className="flex flex-col gap-1 lg:gap-2">
            <p className="text-[#696868] text-sm md:text-lg lg:text-xs">
              Spent
            </p>
            <p className="font-bold text-[#201F24] text-base md:text-xl lg:text-sm">
               ${totalSpent.toFixed(2)}
            </p>
          </div>
        </div>

        

        <div className="flex items-center gap-2 mx-auto">
          <span
            className="inline-block w-[3px] h-10 rounded bg-[#F8F4F0]"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-1 lg:gap-2">
            <p className="text-[#696868] text-sm md:text-lg lg:text-xs">
              Remaining
            </p>
            <p className="font-bold text-[#201F24] text-base md:text-xl lg:text-sm">
              ${remaining.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Latest Spending */}
      <div className="bg-[#F8F4F0] rounded-xl p-4">
        <div className="flex justify-between items-center mb-5">
          <p className="font-bold text-sm md:text-lg lg:text-sm text-[#201F24]">
            Latest Spending
          </p>
          <div className="flex gap-6">
             {/* add latest spending list*/}
              {/* plus icon*/}
            <CiCirclePlus
  className="text-xl cursor-pointer hover:text-black"
  onClick={() => setAddOpen(true)}
  aria-label="Add spending"
/>

{/* plus icon modal*/}

{addOpen && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
  onClick={() => setAddOpen(false)}>
    <div className="bg-white rounded-xl p-6 w-[90%] max-w-md relative"
     onClick={(e) => e.stopPropagation()}>
      {/* Close */}
      <button
        onClick={() => setAddOpen(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-black"
        aria-label="Close"
      >
        <IoIosCloseCircleOutline size={22} />
      </button>

      <h3 className="text-lg font-bold text-[#201F24] mb-4">
        Add A Spending
      </h3>

    <form
  className="flex flex-col gap-4"
  onSubmit={(e) => {
    e.preventDefault();

    const newSpending: Spending = {
      id: Date.now(), 
      name: spendingName,
      amount: Number(spendingAmount),
      date: spendingDate,
    };

    setLocalSpendingHistory((prev) => [
      newSpending,
      ...prev, // newest budget first
    ]);

  onAddSpending?.(Number(spendingAmount));
  
    // reset & close
    setSpendingName("");
    setSpendingDate("");
    setSpendingAmount("");
    setAddOpen(false);
  }}
>

        <label className="text-sm text-[#696868]">
          Spending Name
          <input
            type="text"
            value={spendingName}
            onChange={(e) => setSpendingName(e.target.value)}
            placeholder="Enter spending name"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            required
          />
        </label>

        <label className="text-sm text-[#696868]">
          Date
          <input
            type="date"
            value={spendingDate}
            onChange={(e) => setSpendingDate(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            required
          />
        </label>

        <label className="text-sm text-[#696868]">
          Amount
          <input
            type="number"
            step="0.01"
            value={spendingAmount}
            onChange={(e) => setSpendingAmount(e.target.value)}
            placeholder="0.00"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            required
          />
        </label>

        <button
          type="submit"
          className="mt-2 bg-[#201F24] text-white rounded-lg py-2 text-sm font-semibold hover:opacity-90"
        >
          Add Spending
        </button>
      </form>
    </div>
  </div>
)}

               {/* see all button*/}
            <button
              onClick={() => setIsOpen(true)}
              className="flex gap-2 items-center text-[#696868] hover:underline "
            >
              <p className="font-normal text-sm md:text-xl lg:text-xs cursor-pointer">
                See All
              </p>
              <MdArrowRight />
            </button>
          </div>
        </div>

        {/* Spending list - show top 3 (or customize) */}
        <ul className="space-y-3">
          {localSpendingHistory.slice(0, 3).map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border-b last:border-b-0 border-gray-200 pb-2"
            >
              <div className="flex items-center gap-4">
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="hidden md:block w-6 h-6 rounded-full"
                  />
                ) : (
                  <div className="hidden md:block w-6 h-6 rounded-full bg-gray-200" />
                )}
                <div>
                  <p className="text-sm md:text-xl lg:text-base font-medium text-[#201F24]">
                    {item.name}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-right">
                <p className="text-lg font-bold text-[#DC2626]">
                  -${item.amount.toFixed(2)}
                </p>
                <p className="text-base lg:text-xs text-[#696868]">
                  {item.date}
                </p>
              </div>
            </li>
          ))}

       {localSpendingHistory.length === 0 && (
  <li className="text-sm text-[#696868]">No spending yet.</li>
)}
        </ul>
      </div>

      {/* Spending Modal (See All) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-96 max-h-[80vh] overflow-y-auto shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#201F24]">
                All Spending - {budgetName}
              </h3>
              
              <button
                onClick={() => setIsOpen(false)}
                className="text-lg font-bold text-gray-500 hover:text-black"
                aria-label="Close spending modal"
              >
                ✕
              </button>
            </div>
            <ul className="space-y-3">
            {localSpendingHistory.map((item) => (

                <li
                  key={item.id}
                  className="flex justify-between items-center border-b last:border-b-0 border-gray-200 pb-2"
                >
                  <div className="flex items-center gap-4">
                    {item.avatar ? (
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="hidden sm:block w-6 h-6 rounded-full"
                      />
                    ) : (
                      <div className="hidden sm:block w-6 h-6 rounded-full bg-gray-200" />
                    )}
                    <p className="text-sm font-medium text-[#201F24]">
                      {item.name}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-bold text-[#DC2626]">
                      -${item.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-[#696868]">{item.date}</p>
                  </div>
                </li>
              ))}

              {localSpendingHistory.length === 0 && (
  <li className="text-sm text-[#696868]">No spending yet.</li>
)}

            </ul>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setDeleteOpen(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-96 shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setDeleteOpen(false)}
              className="text-lg absolute top-6 right-6 text-gray-400 hover:text-black"
            >
              <IoIosCloseCircleOutline />
            </button>

            <h3 className="text-lg font-bold text-[#201F24] mb-3">
              Delete Budget
            </h3>
            <p className="text-sm text-[#696868] mb-5">
              Are you sure you want to delete the <b>{budgetName}</b> budget?
              This action cannot be undone.
            </p>

            <form
              ref={deleteFormRef}
              onSubmit={(e) => {
                e.preventDefault();
                if (onDelete) onDelete(category);
                setDeleteOpen(false);
              }}
            >
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteOpen(false)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-[#201F24] hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Budget Modal */}
      {editOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setEditOpen(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-96 shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setEditOpen(false)}
              className="text-lg absolute top-7 right-8 text-gray-400 hover:text-black"
            >
              <IoIosCloseCircleOutline />
            </button>

            <h3 className="text-lg font-bold text-[#201F24] mb-4">
              Edit {budgetName} Budget
            </h3>

            <p className="mb-4 text-sm text-[#696868]">
              As your budgets change, feel free to update your spending limits.
            </p>

            <form
              ref={formRef}
              onSubmit={(e) => {
                e.preventDefault();
                // block submit
                if (nameError) return; 

                const finalCategory =
                  selectedCategory === "Other"
                    ? customCategory
                    : selectedCategory;

                onUpdate?.({
                  budgetName: newBudgetName.trim(),
                  category: finalCategory,
                  max: newMax,
                  color: newColor,
                });

                setEditOpen(false);
              }}
            >
              <label className="block text-sm text-[#696868] mb-2">
                Budget Name
                <input
                  type="text"
                  placeholder="Enter budget name"
                  value={newBudgetName}
                  onChange={(e) => {
                    const value = e.target.value;
                    setNewBudgetName(value);

                    const isDuplicate = allBudgetItems.some(
                      (item) =>
                        item.label.toLowerCase() === value.toLowerCase() &&
                        item.label !== budgetName 
                    );

                    if (isDuplicate) {
                      setNameError("This budget name already exists");
                    } else {
                      setNameError("");
                    }
                  }}
                  className={`w-full border border-gray-300 rounded-lg p-2 mt-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#201F24] ${
                    nameError
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#201F24]"
                  }`}
                />
              </label>

              {nameError && (
                <p className="text-xs text-red-600 mb-3">{nameError}</p>
              )}

              <label className="block text-sm text-[#696868] mb-2">
                Budget Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full cursor-pointer border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#201F24]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {selectedCategory === "Other" && (
                <input
                  type="text"
                  placeholder="Enter custom category"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#201F24]"
                />
              )}

              <label className="block text-sm text-[#696868] mb-2">
                Maximum Spend
              </label>
              <div className="relative mb-4">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="text"
                  value={newMax}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    setNewMax(Number(val));
                  }}
                  className="w-full border border-gray-300 rounded-lg p-2 pl-7 focus:outline-none focus:ring-2 focus:ring-[#201F24]"
                />
              </div>

              {/* Theme Selector */}
              <label className="block text-sm text-[#696868] mb-2">Theme</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setThemeOpen((prev) => !prev)}
                  className="w-full cursor-pointer flex justify-between items-center px-3 py-2 border rounded-lg text-sm text-[#201F24] focus:outline-none"
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
                      const isUsed = allBudgetItems.some(
                        (item) =>
                          item.color === option.value && item.label !== category
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
                            ${newColor === option.value ? "bg-gray-100" : ""}
                          `}
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

              <button
                type="submit"
                disabled={!!nameError || !newBudgetName.trim()}
                className={`w-full px-4 py-2 text-sm rounded-lg mt-5 transition
    ${
      nameError || !newBudgetName.trim()
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-[#201F24] text-white hover:bg-black"
    }
  `}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetCard;
