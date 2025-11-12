import PotsCard from "../../../../components/PotsPage/PotsCard";
import type { PotItem } from "../../../../components/PotsPage/PotsCard";

interface PotsPageProps {
  pots: PotItem[];
  setPots: React.Dispatch<React.SetStateAction<PotItem[]>>;
}

const PotsPage = ({ pots, setPots }: PotsPageProps) => {
  // Show newest pots first
  const sortedPots = [...pots].reverse();

  return (
    <div className="w-full font-[Public_Sans] py-8">
      {sortedPots.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sortedPots.map((pot) => (
            <PotsCard
              key={pot.category}
              category={pot.category}
              color={pot.color}
              target={pot.target}
              spent={pot.spent}
              allPots={pots}
              onUpdate={(updated) =>
                setPots((prev) =>
                  prev.map((p) =>
                    p.category === pot.category ? { ...p, ...updated } : p
                  )
                )
              }
              onDelete={(category) =>
                setPots((prev) => prev.filter((p) => p.category !== category))
              }
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          No pots yet. Add one to get started.
        </p>
      )}
    </div>
  );
};

export default PotsPage;



// import PotsCard from "../../../../components/PotsPage/PotsCard";
// import type { PotItem } from "../../../../components/PotsPage/PotsCard";
// import { useAppData } from "../../../../context/AppDataContext"; // ✅ only addition

// const PotsPage = ({
//   pots,
//   setPots,
// }: {
//   pots: PotItem[];
//   setPots: React.Dispatch<React.SetStateAction<PotItem[]>>;
// }) => {
//   const { addTransaction } = useAppData(); // ✅ access the transaction logger

//   // (keep your existing layout, grids, classes, etc.)
//   return (
//     <div className="your-existing-wrapper-classnames">
//       {pots.map((pot) => (
//         <PotsCard
//           key={pot.category}
//           {...pot}
//           allPots={pots}
//           onUpdate={(updated) => {
//             setPots((prev) =>
//               prev.map((p) =>
//                 p.category === pot.category ? { ...p, ...updated } : p
//               )
//             );

//             // ✅ record edit transaction
//             addTransaction({
//               name: updated.category,
//               category: "Pots",
//               amount: 0,
//               date: new Date().toISOString(),
//               type: "Edited",
//               note: `Edited pot "${updated.category}"`,
//             });
//           }}
//           onDelete={(category) => {
//             setPots((prev) => prev.filter((p) => p.category !== category));

//             // ✅ record delete transaction
//             addTransaction({
//               name: category,
//               category: "Pots",
//               amount: 0,
//               date: new Date().toISOString(),
//               type: "Deleted",
//               note: `Deleted pot "${category}"`,
//             });
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// export default PotsPage;
