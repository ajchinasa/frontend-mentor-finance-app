import { MdCircle } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useState, useRef, useEffect } from "react";

export interface PotItem {
  category: string;
  color: string;
  target?: number;
  spent?: number;
}

interface PotsCardProps {
  category: string;
  color: string;
  target?: number;
  spent?: number;
  allPots: PotItem[];
  onUpdate?: (updated: {
    category: string;
    color: string;
    target?: number;
    spent?: number;
  }) => void;
  onDelete?: (category: string) => void;
}

const PotsCard = ({
  category,
  color,
  target: initialTarget,
  spent: initialSpent = 0,
  allPots,
  onUpdate,
  onDelete,
}: PotsCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [addMoneyOpen, setAddMoneyOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [newColor, setNewColor] = useState(color);
  const [newColorName, setNewColorName] = useState("");
  const [themeOpen, setThemeOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [target, setTarget] = useState<number>(() => initialTarget || 0);
  const [spent, setSpent] = useState<number>(initialSpent);
  const [amount, setAmount] = useState<number>(0);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const deleteFormRef = useRef<HTMLFormElement | null>(null);

  // Progress calculation
// const progress = target ? Math.min((spent / target) * 100, 100) : 0;

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

  // Keyboard shortcuts for edit/delete
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (editOpen && e.key === "Enter" && !themeOpen) {
        e.preventDefault();
        formRef.current?.requestSubmit?.();
      }
      if (editOpen && e.key === "Escape") setEditOpen(false);

      if (deleteOpen && e.key === "Enter") {
        e.preventDefault();
        deleteFormRef.current?.requestSubmit?.();
      }
      if (deleteOpen && e.key === "Escape") setDeleteOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [editOpen, deleteOpen, themeOpen]);

  return (
    <div className="bg-white rounded-xl p-4 w-full font-[Public_Sans] shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 relative">
        <div className="flex items-center gap-2">
          <MdCircle className="text-lg" style={{ color }} />
          <p
            className="font-bold text-[#201F24] text-2xl lg:text-base truncate max-w-[150px] cursor-pointer hover:underline"
            title={category}
          >
            {category}
          </p>
        </div>

        {/* 3 dots menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-[#B3B3B3] hover:text-black cursor-pointer"
            aria-label="Open pots menu"
          >
            <BsThreeDots size={20} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setEditOpen(true);
                  setNewColor(color);
                  setNewColorName("");
                  setSelectedCategory(category);
                  setTarget(initialTarget || 0);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-[#201F24] hover:bg-gray-100"
              >
                Edit Pot
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setDeleteOpen(true);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Delete Pot
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
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
              Edit {category} Pot
            </h3>

            <form
              ref={formRef}
              onSubmit={(e) => {
                e.preventDefault();
                if (onUpdate) {
                  onUpdate({
                    category: selectedCategory,
                    color: newColor,
                    target,
                    spent,
                  });
                }
                setEditOpen(false);
              }}
            >
              <p className="text-xs text-[#696868] pb-4">
                If your saving targets change, feel free to update your pots.
              </p>

              {/* Category */}
              <label className="block text-sm text-[#696868] mb-2">
                Pot Name
              </label>
              <input
                type="text"
                placeholder="Enter pot category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#201F24]"
              />

              {/* Target */}
              <label className="block text-sm text-[#696868] mb-2">
                Target
              </label>
              <div className="relative mb-4">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="text"
                  value={target || ""}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    setTarget(Number(val));
                  }}
                  className="w-full border border-gray-300 rounded-lg p-2 pl-7 focus:outline-none focus:ring-2 focus:ring-[#201F24]"
                />
              </div>

              {/* Theme Selector */}
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
                      const isUsed = allPots.some(
                        (item) =>
                          item.color === option.value &&
                          item.category !== category
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

              <button
                type="submit"
                className="w-full px-4 py-2 text-sm bg-[#201F24] text-white rounded-lg hover:bg-black mt-5"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
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
              Delete Pot
            </h3>
            <p className="text-sm text-[#696868] mb-5">
              Are you sure you want to delete the <b>{category}</b> pot? This
              action cannot be undone.
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

      {/* Progress Section */}
      <div className="mt-4">
        <div className="flex justify-between items-center text-sm mb-4">
          <span className="text-[#696868] text-base">Total saved</span>
          <span className="font-bold text-3xl text-[#201F24]">
            ${spent.toFixed(2)}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-[#F8F4F0] rounded-lg overflow-hidden">
          <div
            className="h-4 rounded-lg transition-all duration-300"
            style={{
              width: target
                ? `${Math.min((spent / target) * 100, 100)}%`
                : "0%",
              backgroundColor: spent > target! ? "#018f01ff" : color,
            }}
          />
        </div>

        {/* Percentage + Target */}
        <div className="flex justify-between items-center text-sm mt-3">
          <span className="font-bold text-[#696868]">
            {target && target > 0
              ? `${((spent / target) * 100).toFixed(2)}%`
              : "0%"}
          </span>
          <span className="text-[#696868]">
            Target of ${target?.toLocaleString() || 0}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex w-full gap-4 pt-6">
        <button
          onClick={() => {
            setAmount(0);
            setAddMoneyOpen(true);
          }}
          className="flex-1 bg-[#F8F4F0] text-[#201F24] rounded-xl py-3 px-6 hover:bg-[#E1D9CE] transition cursor-pointer"
        >
          + Add Money
        </button>
        <button
          onClick={() => {
            setAmount(0);
            setWithdrawOpen(true);
          }}
          className="flex-1 bg-[#F8F4F0] text-[#201F24] rounded-xl py-3 px-6 hover:bg-[#E1D9CE] transition cursor-pointer"
        >
          Withdraw
        </button>
      </div>

      {/* === Add Money Modal === */}
      {addMoneyOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setAddMoneyOpen(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-96 shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setAddMoneyOpen(false)}
              className="text-lg absolute top-6 right-6 text-gray-400 hover:text-black"
            >
              <IoIosCloseCircleOutline />
            </button>

            <h3 className="text-lg font-bold text-[#201F24] mb-2">
              Add to ‘{category}’
            </h3>
            <p className="text-xs text-[#696868] mb-4 leading-snug">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi
              neque, aliquet.
            </p>

            {/* New Amount */}
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="text-[#696868]">New Amount</span>
              <span className="font-bold text-[#201F24] text-lg">
                ${(spent + (amount || 0)).toFixed(2)}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
              <div
                className="h-2 bg-emerald-600 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    target
                      ? Math.min(((spent + (amount || 0)) / target) * 100, 100)
                      : 0
                  }%`,
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-[#696868] mb-4">
              <span>
                {target
                  ? `${(((spent + (amount || 0)) / target) * 100).toFixed(2)}%`
                  : "0%"}
              </span>
              <span>Target of ${target?.toLocaleString()}</span>
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!amount) return;
                const newSpent = spent + amount;
                setSpent(newSpent);
                if (onUpdate) {
                  onUpdate({ category, color, target, spent: newSpent });
                }
                setAddMoneyOpen(false);
              }}
            >
              <label className="block text-sm text-[#696868] mb-1">
                Amount to Add
              </label>
              <div className="relative mb-4">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  placeholder="0"
                  value={amount || ""}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg p-2 pl-6 focus:outline-none focus:ring-2 focus:ring-[#201F24]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#201F24] text-white py-2 rounded-lg hover:bg-black"
              >
                Confirm Addition
              </button>
            </form>
          </div>
        </div>
      )}

      {/* === Withdraw Modal === */}
      {withdrawOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setWithdrawOpen(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-96 shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setWithdrawOpen(false)}
              className="text-lg absolute top-6 right-6 text-gray-400 hover:text-black"
            >
              <IoIosCloseCircleOutline />
            </button>

            <h3 className="text-lg font-bold text-[#201F24] mb-2">
              Withdraw from ‘{category}’
            </h3>
            <p className="text-xs text-[#696868] mb-4 leading-snug">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi
              neque, aliquet.
            </p>

            {/* New Amount */}
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="text-[#696868]">New Amount</span>
              <span className="font-bold text-[#201F24] text-lg">
                ${Math.max(spent - (amount || 0), 0).toFixed(2)}
              </span>
            </div>

            {/*Modal Progress Bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
              <div
                className="h-2 bg-red-500 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    target
                      ? Math.min(
                          (Math.max(spent - (amount || 0), 0) / target) * 100,
                          100
                        )
                      : 0
                  }%`,
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-[#696868] mb-4">
              <span>
                {target
                  ? `${(
                      (Math.max(spent - (amount || 0), 0) / target) *
                      100
                    ).toFixed(2)}%`
                  : "0%"}
              </span>
              <span>Target of ${target?.toLocaleString()}</span>
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!amount) return;
                const newSpent = Math.max(0, spent - amount);
                setSpent(newSpent);
                if (onUpdate) {
                  onUpdate({ category, color, target, spent: newSpent });
                }
                setWithdrawOpen(false);
              }}
            >
              <label className="block text-sm text-[#696868] mb-1">
                Amount to Withdraw
              </label>
              <div className="relative mb-4">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  placeholder="0"
                  value={amount || ""}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg p-2 pl-6 focus:outline-none focus:ring-2 focus:ring-[#201F24]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#201F24] text-white py-2 rounded-lg hover:bg-black"
              >
                Confirm Withdrawal
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PotsCard;

