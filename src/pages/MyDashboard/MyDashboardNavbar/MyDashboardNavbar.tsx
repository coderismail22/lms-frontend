import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";

const navitems = [
  { title: "Profile", path: "my-profile" },
  { title: "Course Mangement", path: "add-" },
  // { title: "Create Course", path: "add-" },
  // { title: "Create Subject", path: "add-" },
  // { title: "Create Topic", path: "add-" },
  // { title: "Create Lesson", path: "add-" },
];

const MyDashboardNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    document.body.classList.toggle("overflow-hidden", !isSidebarOpen);
  };

  const closeSidebarWithDelay = () => {
    setTimeout(() => {
      setIsSidebarOpen(false);
      document.body.classList.remove("overflow-hidden");
    }, 200); // Adjust delay as needed
  };

  return (
    <main className="mx-auto h-[70px] flex flex-col justify-between z-[9999] px-5 text-white bg-[#26283b] p-1">
      <nav className="flex justify-between items-center">
        <div className="flex items-center justify-between w-full">
          <Link to="/" className="w-[120px]">
            {/* LOGO */}
            <img src="/logo.svg" className="w-100px" />
          </Link>

          <section className="w-[50px]">
            {/* MENU for Mobile */}
            <h1
              className="text-3xl cursor-pointer lg:hidden"
              onClick={toggleSidebar}
            >
              <FaBars />
            </h1>
          </section>
        </div>

        <section className="flex items-center justify-center flex-nowrap gap-2 md:gap-4 lg:gap-6 xl:gap-8 2xl:gap-10">
          {/* Navbar For Larger Displays */}
          {navitems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="hover:text-blue-500 hidden lg:inline-block font-montserrat font-bold text-center text-sm md:text-base w-[80px]"
            >
              {item.title}
            </Link>
          ))}
        </section>

        {/* Mobile Sidebar */}
        <div
          className={clsx(
            "fixed inset-0 z-[10000] lg:hidden bg-black/50 backdrop-blur-sm transition-all",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={toggleSidebar} // Close sidebar when background is clicked
        >
          <section
            className="overflow-scroll text-white bg-black/90 h-screen w-56 absolute left-0 top-0 flex flex-col items-center gap-8 py-16"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the sidebar
          >
            <p className="text-center">
              <TbLayoutSidebarLeftCollapse size="30" onClick={toggleSidebar} />
            </p>

            {navitems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="font-bold flex flex-col items-center justify-center"
                onClick={closeSidebarWithDelay} // Close sidebar with delay
              >
                {item.title}
              </Link>
            ))}
          </section>
        </div>

        <section className="flex gap-4">
          {/* Social Media Icons */}
          {/* <IoCart className="text-3xl" /> */}
        </section>
      </nav>
    </main>
  );
};

export default MyDashboardNavbar;
