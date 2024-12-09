import { Outlet } from "react-router-dom";
import Navbar from "../pages/SharedPages/Navbar/Navbar";
import Footer from "../pages/SharedPages/Footer/Footer";
import { TopBanner } from "../components/TopBanner/TopBanner";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";

const MainLayout = () => {
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <TopBanner />
      <Navbar />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
