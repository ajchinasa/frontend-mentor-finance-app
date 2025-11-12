
import { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { PiSortAscendingFill } from "react-icons/pi";
import { TiFilter } from "react-icons/ti";
import {
  MdArrowLeft,
  MdArrowRight,
  MdOutlineArrowDropDown,
} from "react-icons/md";
import transactionsData from "../../data/overviewPage/transactionsData";
import Transactions from "../../components/overviewPage/transactions";

const ITEMS_PER_PAGE = 10;

const TransactionsPage = () => {
  const [query, setQuery] = useState("");
  const [sortOption, setSortOption] = useState("Latest");
  const [filterOption, setFilterOption] = useState("All Transactions");

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const sortRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortRef.current &&
        !sortRef.current.contains(event.target as Node)
      ) {
        setIsSortOpen(false);
      }
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  };

  const toggleSortDropdown = () => setIsSortOpen(!isSortOpen);
  const toggleFilterDropdown = () => setIsFilterOpen(!isFilterOpen);

  const selectSortOption = (option: string) => {
    setSortOption(option);
    setIsSortOpen(false);
  };

  const selectFilterOption = (option: string) => {
    setFilterOption(option);
    setIsFilterOpen(false);
  };

  // Filter by search and category
  const filteredData = transactionsData.filter((item) => {
    const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      filterOption === "All Transactions" ||
      item.category === filterOption;
    return matchesQuery && matchesCategory;
  });

  // Sort logic
  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortOption) {
      case "Latest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "Oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "A to Z":
        return a.name.localeCompare(b.name);
      case "Z to A":
        return b.name.localeCompare(a.name);
      case "Highest":
        return parseFloat(b.amount) - parseFloat(a.amount);
      case "Lowest":
        return parseFloat(a.amount) - parseFloat(b.amount);
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="flex flex-col w-full min-h-screen md:px-4 pb-6 ">
      <h3 className="text-2xl font-semibold mb-4">Transactions</h3>

      <div className="flex flex-col gap-4 bg-white rounded-2xl mb-14">
        {/* Search and Filters */}
        <div className="flex p-4 rounded-xl justify-between flex-wrap gap-4">
          <div className="flex justify-between items-center w-full max-w-48 md:max-w-3xs lg:max-w-xs border border-gray-300 rounded-md px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#277C78]">
            <input
              type="text"
              placeholder="Search transactions..."
              value={query}
              onChange={handleInputChange}
              className="w-full bg-transparent focus:outline-none text-sm text-gray-800"
            />
            <FiSearch className="text-gray-500 mr-2" />
          </div>

          {/* Mobile Dropdowns */}
          <div className="md:hidden flex items-center gap-4 relative">
            {/* Sort */}
            <div ref={sortRef}>
              <button onClick={toggleSortDropdown}>
                <PiSortAscendingFill className="w-5 h-5 text-gray-700" />
              </button>
              {isSortOpen && (
                <div className="absolute top-8 left-0 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                  <div className="py-1 text-sm text-[#201F24]">
                    {["Latest", "Oldest", "A to Z", "Z to A", "Highest", "Lowest"].map((option) => (
                      <button
                        key={option}
                        onClick={() => selectSortOption(option)}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Filter */}
            <div ref={filterRef}>
              <button onClick={toggleFilterDropdown}>
                <TiFilter className="w-6 h-6 text-gray-700" />
              </button>
              {isFilterOpen && (
                <div className="absolute top-8 right-0 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
                  <div className="py-1 text-sm text-gray-700">
                    {["All Transactions", "Deposits", "Withdrawals", "Transfers"].map(
                      (option) => (
                        <button
                          key={option}
                          onClick={() => selectFilterOption(option)}
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          {option}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Sort & Filter */}
          <div className="flex gap-4 hidden md:flex">
            {/* Sort */}
            <div ref={sortRef} className="relative flex items-center gap-2">
              <p className="text-[#696868] text-xs">Sort by</p>
              <div>
                <button
                  onClick={toggleSortDropdown}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  {sortOption}
                  <MdOutlineArrowDropDown className="ml-2 w-6 h-6" />
                </button>
                {isSortOpen && (
                  <div className="absolute mt-2 w-24 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1 text-gray-700 text-sm">
                      {["Latest", "Oldest", "A to Z", "Z to A", "Highest", "Lowest"].map(
                        (option) => (
                          <button
                            key={option}
                            onClick={() => selectSortOption(option)}
                            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                          >
                            {option}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Filter */}
            <div ref={filterRef} className="relative flex items-center gap-2">
              <p className="text-[#696868] text-xs">Category</p>
              <button
                onClick={toggleFilterDropdown}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {filterOption}
                <MdOutlineArrowDropDown className="ml-2 w-6 h-6" />
              </button>
              {isFilterOpen && (
                <div className="absolute mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <div className="py-1 text-sm text-gray-700">
                    {["All Transactions", "Deposits", "Withdrawals", "Transfers"].map(
                      (option) => (
                        <button
                          key={option}
                          onClick={() => selectFilterOption(option)}
                          className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          {option}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-3 px-10 pb-3 text-sm font-semibold text-[#8B8B8B] border-b border-[#F2F2F2]">
          <span>Recipient / Sender</span>
          <div className="flex gap-6 lg:gap-12 ml-16 lg:ml-24">
            <span>Category</span>
            <span>Transaction Date</span>
          </div>
          <span className="text-right">Amount</span>
        </div>

        {/* Transactions */}
        <div className="px-2 md:px-10 rounded-xl space-y-2">
          {paginatedData.map((item, index) => (
            <Transactions
              key={index}
              image={item.image}
              name={item.name}
              category={item.category}
              amount={item.amount}
              date={item.date}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center gap-2 p-4 mt-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center px-3 py-1 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 gap-2"
          >
            <MdArrowLeft className="w-6 h-6" />
            Prev
          </button>

          <div className="flex flex-row gap-1">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 text-sm rounded-md border ${
                  currentPage === i + 1
                    ? "bg-[#201F24] text-white"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-3 py-1 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            Next
            <MdArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;




















// import { useState } from "react";
// import { useAppData } from "../../context/AppDataContext";
// import Transactions from "../../components/overviewPage/transactions";
// import type { TransactionItem } from "../../../../types/TransactionItem";

// const TransactionsPage = () => {
//   const { transactions } = useAppData(); // ✅ global transactions list
//   const [currentPage, setCurrentPage] = useState(1);

//   // optional sorting or filtering logic
//   const ITEMS_PER_PAGE = 10;
//   const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
//   const currentData = transactions.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   return (
//     <div className="w-full font-[Public_Sans] p-6">
//       {/* existing search/sort/filter UI remains unchanged */}
//       <Transactions transactions={currentData} />
//       {/* pagination UI remains unchanged */}
//     </div>
//   );
// };

// export default TransactionsPage;


