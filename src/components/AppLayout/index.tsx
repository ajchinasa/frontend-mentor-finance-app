import { Outlet } from "react-router-dom";
import SideBar from "../sideBar";

const AppLayout = () => {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar on the left */}
      <SideBar />

      {/* Main content area */}
      <div className="flex-1 bg-[#F8F4F0] overflow-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
