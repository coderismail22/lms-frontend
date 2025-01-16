import { Outlet } from "react-router-dom";
import Navbar from "../pages/SharedPages/Navbar/Navbar";
import Footer from "../pages/SharedPages/Footer/Footer";
import { TopBanner } from "../components/TopBanner/TopBanner";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";

const MainLayout = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col min-h-screen">
      <div className="bg-[#211B52]">
        <TopBanner />
      </div>
      <Navbar />
      <ScrollToTop />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
