
import overviewBalances from "../../../../data/overviewPage/overviewBalance";
import OverviewBalanceCard from "../../../../components/overviewPage/overviewBalanceCard/index";


const Overview = () => {
  return (
    <div className="w-full  md:py-6 font-[Public_Sans]">
      {/* Overview */}
      <h1 className="text-4xl lg:text-2xl font-bold mt-8 lg:mt-0">Overview</h1>
      
      {/* Overview Data */}
      <div className="flex flex-col  space-y-4 md:space-y-0 md:flex-row justify-between pt-8">
        {overviewBalances.map((item, index) => (
          <OverviewBalanceCard
            key={index}
            label={item.label}
            value={item.value}
            
          />
        ))}
      </div>
    </div>
  );
};


        export default Overview;