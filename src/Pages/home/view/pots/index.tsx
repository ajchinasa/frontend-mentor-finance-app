import { useEffect, useState } from "react";
import { MdArrowRight } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import PotItem from "../../../../components/overviewPage/potItem.tsx/index.tsx";
import { Link } from "react-router-dom";

interface Pot {
  category: string;
  color: string;
  target?: number;
  spent?: number;
}

const Pots = () => {
  const [recentPots, setRecentPots] = useState<Pot[]>([]);
  const [totalSaved, setTotalSaved] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("pots");
    if (saved) {
      const allPots = JSON.parse(saved) as Pot[];

      // ✅ Total saved from ALL pots
      const total = allPots.reduce((sum, pot) => sum + (pot.spent || 0), 0);
      setTotalSaved(total);

      // ✅ Show only 4 most recent pots
      setRecentPots(allPots.slice(0, 4));
    }
  }, []);

  return (
    <div className="w-full flex flex-col -[Public_Sans] gap-4 pb-4 mt-10 md:mt-8 lg:mt-0">
      <div className="bg-[#FFFFFF] rounded-xl p-4">
        <div className="flex justify-between mb-4">
          <h5 className="font-bold text-[#201F24] text-xl md:text-2xl lg:text-base">
            Pots
          </h5>
          <Link
            to="/pots"
            className="flex gap-2 items-center text-[#696868] hover:underline"
          >
            {" "}
            <p className="font-normal text-sm md:text-xl lg:text-xs">
              See Details
            </p>
            <MdArrowRight />
          </Link>
        </div>
        {/* POTS DATA */}
        <div className="flex flex-col md:flex-row gap-10 w-full font-[Public_Sans]">
          {/* LEFT SIDE: Total Saved */}
          <div className="flex items-center gap-4 p-4 bg-[#F8F4F0] rounded-xl mb-4 w-full md:w-1/2">
            <FaSackDollar className="text-[#277C78] w-8 h-8" />
            <div className="flex flex-col gap-2">
              <p className="text-base lg:text-xs text-[#696868] font-normal">
                Total Saved
              </p>
              <p className="text-4xl lg:text-2xl font-bold">
                ${totalSaved.toLocaleString()}
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: Most Recent Pots */}
          <div className="grid grid-cols-2 gap-4 w-full md:w-1/2">
            {recentPots.length > 0 ? (
              recentPots.map((pot, index) => (
                <PotItem
                  key={index}
                  label={pot.category}
                  amount={`$${(pot.spent || 0).toLocaleString()}`}
                  color={pot.color}
                />
              ))
            ) : (
              <p className="text-gray-400 text-sm col-span-2">
                No pots yet. Create one to see it here.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pots;
