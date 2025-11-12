import { IoIosCloseCircleOutline } from "react-icons/io";
import { useState, useRef, useEffect } from "react";

interface AddPotModalProps {
  onClose: () => void;
  onCreate: (pot: { category: string; target: number; color: string }) => void;
  existingColors: string[];
}

const AddPotModal = ({
  onClose,
  onCreate,
  existingColors,
}: AddPotModalProps) => {
  const [category, setCategory] = useState("");
  const [target, setTarget] = useState<number | "">("");
  const [themeOpen, setThemeOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedName, setSelectedName] = useState("");

  const formRef = useRef<HTMLFormElement | null>(null);

  const themes = [
    { name: "Green", value: "#10B981" },
    { name: "Yellow", value: "#FACC15" },
    { name: "Cyan", value: "#06B6D4" },
    { name: "Navy", value: "#1E3A8A" },
    { name: "Red", value: "#EF4444" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Turquoise", value: "#14B8A6" },
  ];

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      // Submit on Enter, but only if theme dropdown is closed
      if (e.key === "Enter" && !themeOpen) {
        // Avoid submitting when focus is on a button
        const active = document.activeElement;
        if (active && active.tagName.toLowerCase() === "button") return;

        e.preventDefault();
        // requestSubmit to trigger form submit handler (will behave like a normal submit)
        formRef.current?.requestSubmit?.();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [themeOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category.trim() || !target || !selectedColor) return;
    onCreate({
      category: category.trim(),
      target: Number(target),
      color: selectedColor,
    });
    onClose();
  };

  // Placeholder for circle when no color is selected
  const placeholderColor = "#000000";

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        className="bg-white rounded-xl p-6 w-[400px] shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Add new pot"
      >
        <button
          onClick={onClose}
          className="text-lg absolute top-6 right-6 text-gray-400 hover:text-black"
          aria-label="Close add pot modal"
        >
          <IoIosCloseCircleOutline />
        </button>

        <h3 className="text-lg font-bold text-[#201F24] mb-2">Add New Pot</h3>
        <p className="text-xs text-[#696868] mb-6 leading-snug">
          Create a pot to set savings targets. These can help keep you on track
          as you save for special purchases.
        </p>

        <form ref={formRef} onSubmit={handleSubmit}>
          {/* Category */}
          <label className="block text-sm text-[#696868] mb-2">Pot Name</label>
          <input
            type="text"
            placeholder="Enter category name"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#201F24]"
            aria-label="Pot category"
          />

          {/* Target */}
          <label className="block text-sm text-[#696868] mb-2">Target</label>
          <div className="relative mb-4">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              placeholder="Enter amount"
              value={target}
              onChange={(e) =>
                setTarget(e.target.value ? Number(e.target.value) : "")
              }
              className="w-full border border-gray-300 rounded-lg p-2 pl-6 focus:outline-none focus:ring-2 focus:ring-[#201F24]"
              aria-label="Target amount"
            />
          </div>

          {/* Theme */}
          <label className="block text-sm text-[#696868] mb-2">Theme</label>
          <div className="relative mb-6">
            {/* Button showing circle + label */}
            <button
              type="button"
              onClick={() => setThemeOpen((prev) => !prev)}
              className="w-full flex justify-between items-center px-3 py-2 border rounded-lg text-sm text-black focus:outline-none"
              aria-haspopup="listbox"
              aria-expanded={themeOpen}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full border"
                  style={{ backgroundColor: selectedColor || placeholderColor }}
                  aria-hidden
                />
                <span>{selectedName || "Select a theme"}</span>
              </div>

              <svg
                className={`w-4 h-4 transition-transform ${
                  themeOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown with theme options */}
            {themeOpen && (
              <div
                className="absolute mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-60 overflow-y-auto"
                role="listbox"
                aria-label="Theme options"
              >
                {themes.map((option) => {
                  const isUsed = existingColors.includes(option.value);
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        if (!isUsed) {
                          setSelectedColor(option.value);
                          setSelectedName(option.name);
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
                        ${selectedColor === option.value ? "bg-gray-100" : ""}`}
                      role="option"
                      aria-selected={selectedColor === option.value}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full border"
                          style={{
                            backgroundColor: isUsed ? "#e5e7eb" : option.value,
                          }}
                          aria-hidden
                        />
                        <span className="text-black">{option.name}</span>
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
            className="w-full bg-[#201F24] text-white py-2 rounded-lg hover:bg-black transition-colors duration-200"
            aria-label="Create pot"
          >
            Create Pot
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPotModal;
