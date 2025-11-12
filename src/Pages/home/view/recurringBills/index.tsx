import { MdArrowRight } from "react-icons/md";
import RecurringBillsData from "../../../../data/overviewPage/recurringBillsData";
import RecurringBillsCategory from "../../../../components/overviewPage/RecurringBillsCategory";


const recurringBills = () => {
  return (
 <div className="w-full bg-[#FFFFFF] rounded-xl p-4">
      <div className="flex flex-col gap-2">
        {/* Recurring Bills Header */}
        <div className="flex justify-between mb-4">
          <h5 className="font-bold text-[#201F24] text-xl md:text-2xl lg:text-base">Recurring Bills</h5>
          <button className="flex gap-2 items-center text-[#696868]">
            <p className="font-normal text-sm md:text-xl lg:text-xs">View All</p>
            <MdArrowRight />
          </button>
        </div>

        {/* Recurring Bills Data */}
        <div className="flex flex-col gap-4  lg:pb-2 ">
          {RecurringBillsData.map((item, index) => (
            <RecurringBillsCategory
              key={index}
              label={item.label}
              amount={item.amount}
               color={item.color}
            />
          ))}
        </div>
        </div>
      </div>
      
      
  
  );
};

export default recurringBills;
