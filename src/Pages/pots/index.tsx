import Header from "./view/header";
import PotsPage from "./view/main";
import AddPotModal from "../../components/PotsPage/AddPotModal";
import { useState, useEffect } from "react";
import type { PotItem } from "../../components/PotsPage/PotsCard";

const Pots = () => {
  // Load pots from localStorage on first render
  const [pots, setPots] = useState<PotItem[]>(() => {
    const saved = localStorage.getItem("pots");
    return saved ? JSON.parse(saved) : [];
  });

  const [showModal, setShowModal] = useState(false);

  const handleAddPot = () => setShowModal(true);

  const handleCreatePot = (newPot: PotItem) => {
    setPots((prev) => {
      const updated = [newPot, ...prev];
      localStorage.setItem("pots", JSON.stringify(updated));
      return updated;
    });
    setShowModal(false);
  };

  // Save pots whenever they change
  useEffect(() => {
    localStorage.setItem("pots", JSON.stringify(pots));
  }, [pots]);

  return (
    <div className="flex flex-col w-full overflow-x-hidden bg-[#F8F4F0] md:px-8 lg:px-10 pb-26 lg:pb-6 lg:py-2">
      <Header onAddBudgetClick={handleAddPot} />

      {/* Blank until pots exist */}
      <div>{pots.length > 0 && <PotsPage pots={pots} setPots={setPots} />}</div>

      {showModal && (
        <AddPotModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreatePot}
          existingColors={pots.map((p) => p.color)}
        />
      )}
    </div>
  );
};

export default Pots;





// import Header from "./view/header";
// import PotsPage from "./view/main";
// import AddPotModal from "../../components/PotsPage/AddPotModal";
// import { useState, useEffect } from "react";
// import type { PotItem } from "../../components/PotsPage/PotsCard";
// import { useAppData } from "../../context/AppDataContext"; // ✅ for transaction logging

// const Pots = () => {
//   const { addTransaction } = useAppData(); // ✅ global transaction logger

//   // ✅ Load pots safely from localStorage and normalize missing fields
//   const [pots, setPots] = useState<PotItem[]>(() => {
//     const saved = localStorage.getItem("pots");
//     if (!saved) return [];
//     const parsed = JSON.parse(saved);
//     // normalize data to prevent undefined values
//     return parsed.map((p: any) => ({
//       category: p.category ?? "Unnamed Pot",
//       target: p.target ?? 0,
//       color: p.color ?? "#CCCCCC",
//       spent: p.spent ?? 0, // ✅ default missing 'spent' values
//     }));
//   });

//   const [showModal, setShowModal] = useState(false);

//   const handleAddPot = () => setShowModal(true);

//   // ✅ Ensure created pots have spent: 0 and log the transaction
//   const handleCreatePot = (newPot: { category: string; target: number; color: string }) => {
//     const fullPot: PotItem = { ...newPot, spent: 0 };

//     setPots((prev) => {
//       const updated = [fullPot, ...prev];
//       localStorage.setItem("pots", JSON.stringify(updated));
//       return updated;
//     });

//     // ✅ Record "Created" transaction
//     addTransaction({
//       name: newPot.category,
//       category: "Pots",
//       amount: 0,
//       date: new Date().toISOString(),
//       type: "Created",
//       note: `Created new pot "${newPot.category}"`,
//     });

//     setShowModal(false);
//   };

//   // ✅ Persist pots whenever they change
//   useEffect(() => {
//     localStorage.setItem("pots", JSON.stringify(pots));
//   }, [pots]);

//   return (
//     <div className="flex flex-col w-full overflow-x-hidden bg-[#F8F4F0] md:px-8 lg:px-10 pb-26 lg:pb-6 lg:py-2">
//       {/* Header (Add Pot Button) */}
//       <Header onAddBudgetClick={handleAddPot} />

//       {/* Display pots or empty state */}
//       {pots.length > 0 ? (
//         <PotsPage pots={pots} setPots={setPots} />
//       ) : (
//         <div className="text-gray-500 text-center py-16">
//           No pots yet. Add one to get started.
//         </div>
//       )}

//       {/* Add Pot Modal */}
//       {showModal && (
//         <AddPotModal
//           onClose={() => setShowModal(false)}
//           onCreate={handleCreatePot} // ✅ type-safe and fixed
//           existingColors={pots.map((p) => p.color)}
//         />
//       )}
//     </div>
//   );
// };

// export default Pots;
