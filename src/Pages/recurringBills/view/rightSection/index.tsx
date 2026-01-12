import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { bills } from "../../../../data/recurringBills/billsData";
import BillRow from "../../../../components/RecurringBills/BillsRow";

const RightSection = () => {
  // state variable for the search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filter bills based on the search query
  // convert case-sensitive
  const filteredBills = bills.filter((bill) =>
    bill.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto min-h-screen rounded-xl">
      {/* Search and Filter */}
      <div className="flex justify-between items-center mb-10">
        <div className="relative w-80">
          <input
            type="text"
            placeholder="Search bills"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-200 rounded-xl py-2.5 px-4 pr-10 focus:outline-none focus:ring-1 focus:ring-gray-300 text-gray-600"
          />
          <Search className="absolute right-3 top-3 text-gray-400" size={20} />
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Sort by</span>
          <button className="flex items-center gap-2 border border-gray-200 rounded-xl py-2.5 px-5 font-semibold text-gray-700 hover:bg-gray-50">
            Latest <ChevronDown size={18} />
          </button>
        </div>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-12 px-4 mb-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
        <div className="col-span-6">Bill Title</div>
        <div className="col-span-4">Due Date</div>
        <div className="col-span-2 text-right">Amount</div>
      </div>

      {/* Content */}
      <div className="bg-white">
        {filteredBills.length > 0 ? (
          filteredBills.map((bill) => <BillRow key={bill.id} bill={bill} />)
        ) : (
          <div className="py-10 text-center text-gray-400">
            No bills found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSection;
