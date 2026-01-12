import { PiReceiptFill } from "react-icons/pi";
import SummaryItemData from "../../../../data/recurringBills/summaryItem";
import SummaryRow from "../../../../components/RecurringBills/summaryRow";

const LeftSection = () => {
  return (
    <section className="flex flex-col gap-6 lg:gap-8">
      {/* Title always scrolls normally */}
     <h3 className="text-2xl font-bold text-slate-800">Recurring Bills</h3>

      {/* Content container */}
      <div className="flex flex-col gap-6 md:flex-row lg:flex-col lg:fixed lg:top-[88px] lg:w-[320px]"
      >
        {/* Total Bills Card */}
        <div className="bg-black text-white p-4 rounded-xl space-y-6 w-full">
          <PiReceiptFill className="text-4xl text-white" />
          <div className="flex flex-col gap-2">
           <p className="text-sm opacity-70">Total Bills</p>
           <p className="font-bold text-3xl tracking-tight">$384.98</p>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-white text-black p-4 rounded-xl space-y-5 w-full">
          <h6 className="font-bold text-base md:text-lg">
            Summary
          </h6>
          <div className="space-y-2">
            {SummaryItemData.map((item) => (
              <SummaryRow key={item.label} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeftSection;
