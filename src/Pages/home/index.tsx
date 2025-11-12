
import Overview from "./view/overView";
import Pots from "./view/pots";
import TransactionPreview from "./view/transactions";
import Budgets from "./view/budgets";
import RecurringBills from "./view/recurringBills";

const Home = () => {
  return (
   
      
      <div className=" flex flex-col w-full  overflow-x-hidden bg-[#F8F4F0] px-8 lg:px-10 pb-26 lg:pb-6">
        <Overview />
        <div className="w-full flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/2 overflow-x-hidden">
          <Pots />
          <TransactionPreview/>
        </div>
        <div className=" flex flex-col w-full lg:w-1/2 overflow-x-auto gap-4">
          <Budgets />
          <RecurringBills/>
        </div>
        </div>
      </div>
    
  );
};

export default Home;
