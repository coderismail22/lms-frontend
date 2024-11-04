import { Outlet } from "react-router-dom";
import MyDashboardNavbar from "../MyDashboardNavbar/MyDashboardNavbar";

const MyDashboard = () => {
  return (
    <div className="bg-[#141C2A]">
      <MyDashboardNavbar />
      <Outlet />
    </div>
  );
};

export default MyDashboard;
