import { MdArrowRight } from "react-icons/md";
import Transactions from "../../../../components/overviewPage/transactions";
import transactionsData from "../../../../data/overviewPage/transactionsData";
import { Link } from "react-router-dom";


const TransactionPreview = () => {
  const previewData = transactionsData.slice(0, 5); 

  return (
    <div className="w-full bg-[#FFFFFF] rounded-xl p-4 ">
      <div className="flex flex-col gap-2">
        {/* Transactions Header */}
        <div className="flex justify-between mb-4">
          <h5 className="font-bold text-[#201F24] text-xl md:text-2xl lg:text-base">Transactions</h5>
          <Link to="/transactions" className="flex gap-2 items-center text-[#696868] hover:underline">
            <p className="font-normal text-sm md:text-xl lg:text-xs">View All</p>
            <MdArrowRight />
          </Link>
        </div>
         {/* Transactions Data */}
        <div className="overflow-y-auto max-h-[330px]">
          {previewData.map((item, index) => (
            <Transactions
              key={index}
              image={item.image}
              name={item.name}
              amount={item.amount}
              date={item.date}
              compact
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionPreview;

