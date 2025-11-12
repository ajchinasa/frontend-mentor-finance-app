import logo from "../../assets/Sidebar/Logo.svg";
import { GoHomeFill } from "react-icons/go";
import { RiArrowUpDownFill } from "react-icons/ri";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { FaSackDollar } from "react-icons/fa6";
import { PiReceiptFill } from "react-icons/pi";
import { TbArrowBigLeftLinesFilled } from "react-icons/tb";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div
      className="w-full lg:w-1/5 bg-[#201F24] text-white p-4 
 rounded-tl-2xl md:rounded-tl-none rounded-tr-2xl md:rounded-br-2xl 
  flex md:flex-col flex-row justify-between 
  lg:h-screen h-[70px] 
  lg:sticky lg:top-0 
  fixed bottom-0 left-0 right-0 z-50"
    >
      {/* Logo at the top */}
      <div className="hidden lg:block mb-8 p-4">
        <img src={logo} alt="Logo" className="w-22" />
      </div>

      {/* Navigation */}
      <ul className="flex flex-row justify-between lg:flex-col lg:justify-start w-full font-[Public_Sans] font-bold space-y-0 lg:space-y-4">
        <li className="">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `group relative flex flex-col lg:flex-row items-center gap-2 w-full px-4 py-2 rounded-md transition-all duration-200 transform hover:scale-[1.03] hover:shadow-md text-left ${
                isActive
                  ? "bg-white text-black"
                  : "hover:bg-[#F8F4F0] hover:text-black"
              }`
            }
          >
            {/* Green line on hover */}
            <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#277C78] rounded opacity-0 group-hover:opacity-100 transition-all duration-200"></span>
            <GoHomeFill className="text-[#B3B3B3] group-hover:text-[#277C78]" />
            <p className="hidden md:block text-base">Overview</p>
          </NavLink>
        </li>
        {/* transactions */}
        <li>
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              `group relative flex flex-col lg:flex-row items-center gap-2 w-full px-4 py-2 rounded-md transition-all duration-200 transform hover:scale-[1.03] hover:shadow-md text-left ${
                isActive
                  ? "bg-white text-black"
                  : "hover:bg-[#F8F4F0] hover:text-black"
              }`
            }
          >
            <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#277C78] rounded opacity-0 group-hover:opacity-100 transition-all duration-200"></span>
            <RiArrowUpDownFill className="text-[#B3B3B3] group-hover:text-[#277C78]" />
            <p className="hidden md:block text-base">Transactions</p>
          </NavLink>
        </li>

        {/* budgets */}
        <li className="">
          <NavLink
            to="/budgets"
            className={({ isActive }) =>
              `group relative flex flex-col lg:flex-row items-center gap-2 w-full px-4 py-2 rounded-md transition-all duration-200 transform hover:scale-[1.03] hover:shadow-md text-left ${
                isActive
                  ? "bg-white text-black"
                  : "hover:bg-[#F8F4F0] hover:text-black"
              }`
            }
          >
            {" "}
            {/* Green line on hover */}
            <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#277C78] rounded opacity-0 group-hover:opacity-100 transition-all duration-200"></span>
            <BiSolidPieChartAlt2 className="text-[#B3B3B3] group-hover:text-[#277C78]" />
            <p className="hidden md:block text-base">Budgets</p>
          </NavLink>
        </li>

        {/* pots */}
        <li className="">
          <NavLink
            to="/pots"
            className={({ isActive }) =>
              `group relative flex flex-col lg:flex-row items-center gap-2 w-full px-4 py-2 rounded-md transition-all duration-200 transform hover:scale-[1.03] hover:shadow-md text-left ${
                isActive
                  ? "bg-white text-black"
                  : "hover:bg-[#F8F4F0] hover:text-black"
              }`
            }
          >
            {" "}
            {/* Green line on hover */}
            <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#277C78] rounded opacity-0 group-hover:opacity-100 transition-all duration-200"></span>
            <FaSackDollar className="text-[#B3B3B3] group-hover:text-[#277C78]" />{" "}
            <p className="hidden md:block text-base">Pots</p>
          </NavLink>
        </li>

        {/* Recurring Bills */}
        <li className="">
          <button className="group relative flex flex-col lg:flex-row items-center gap-2 w-full px-4 py-2 rounded-md hover:bg-[#F8F4F0] hover:text-black cursor-pointer transition-all duration-200 transform hover:scale-[1.03] hover:shadow-md text-left ">
            {/* Green line on hover */}
            <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#277C78] rounded opacity-0 group-hover:opacity-100 transition-all duration-200"></span>
            <PiReceiptFill className="text-[#B3B3B3] group-hover:text-[#277C78]" />
            <p className="hidden md:block text-base"> Recurring Bills</p>
          </button>
        </li>
      </ul>

      <ul className="hidden lg:block mt-auto  font-[Public_Sans] font-bold">
        <li className="flex">
          <button className="group relative flex flex-col lg:flex-row items-center gap-2 w-full px-4 py-2 rounded-md hover:bg-[#F8F4F0] hover:text-black cursor-pointer transition-all duration-200 transform hover:scale-[1.03] hover:shadow-md text-left ">
            {/* Green line on hover */}
            <span className="absolute left-0 top-0 bottom-0 w-1 bg-[#277C78] rounded opacity-0 group-hover:opacity-100 transition-all duration-200"></span>
            <TbArrowBigLeftLinesFilled className="text-[#B3B3B3] group-hover:text-[#277C78]" />
            <p className="hidden md:block text-base">Minimize Menu</p>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
