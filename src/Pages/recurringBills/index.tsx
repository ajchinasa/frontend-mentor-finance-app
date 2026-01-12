import LeftSection from "./view/leftSection";
import RightSection from "./view/rightSection";

const RecurringBills = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full overflow-x-hidden bg-[#F8F4F0] w-full md:p-4 lg:px-8 lg:py-2 lg:gap-6 ">
      <div className="w-full lg:w-1/3">
        {" "}
        <LeftSection />
      </div>
      <div className="w-full lg:w-2/3 mt-8 lg:mt-16">
        {" "}
        <RightSection />
      </div>
    </div>
  );
};

export default RecurringBills;
