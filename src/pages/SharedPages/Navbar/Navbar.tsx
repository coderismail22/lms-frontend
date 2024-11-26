import clsx from "clsx";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll"; // Add scroller from react-scroll
import { FaBars } from "react-icons/fa";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { authKey } from "@/api/authKey";
import { useQueryClient } from "@tanstack/react-query";
import LogoutButton from "@/components/LogoutButton/LogoutButton";

const Navbar = () => {
  const queryClient = useQueryClient();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    // Check login status using auth data from query client
    const authData = queryClient.getQueryData(authKey);

    if (authData) {
      console.log("Auth data retrieved:", authData);
      setIsLoggedIn(true); // User is logged in
    } else {
      console.log("No auth data found.");
      setIsLoggedIn(false); // User is not logged in
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // No need to include queryClient in dependencies

  // Show loading state until login status is determined
  // if (isLoggedIn === null) {
  //   return <p>Loading...</p>;
  // }

  // Define nav items
  const navitems = [
    { title: "Home", path: "/", isScroll: false },
    { title: "Courses", path: "/courses", isScroll: false },
  ];

  // Add conditional items based on login state
  if (isLoggedIn) {
    navitems.push(
      { title: "Cart", path: "/dashboard/student/cart", isScroll: false },
      { title: "Dashboard", path: "/dashboard", isScroll: false }
    );
  } else {
    navitems.push({ title: "Login", path: "/auth/login", isScroll: false });
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleScrollNavigation = (elementId: string) => {
    if (location.pathname !== "/") {
      // If user is not on the home page, navigate to home and scroll after navigation
      navigate("/");
      setTimeout(() => {
        scroller.scrollTo(elementId, {
          smooth: true,
          duration: 500,
          offset: -80, // Offset to adjust for any fixed header
        });
      }, 100); // Give some time for the home page to load
    } else {
      // If already on the home page, directly scroll to the section
      scroller.scrollTo(elementId, {
        smooth: true,
        duration: 500,
        offset: -80,
      });
    }
  };

  return (
    <main className="mx-auto h-[50px] flex flex-col justify-between md:justify-center z-[9999] px-10 py-1 text-white bg-[#26283b] ">
      <nav className="flex justify-between items-center px-5 ">
        <div className="flex items-center justify-between lg:justify-center w-full  ">
          <div className="">
            <Link to="/">
              {/* LOGO */}
              <img
                src="/ejobsit-logo.svg"
                // width={"120px"}
                className="w-[30%]"
                alt="lms-logo"
              />
            </Link>
          </div>

          <section className="w-[50px] ">
            {/* MENU for Mobile */}
            <h1
              className="text-3xl cursor-pointer lg:hidden"
              onClick={toggleSidebar}
            >
              <FaBars />
            </h1>
          </section>
        </div>

        <section className="flex items-center justify-center gap-10 xl:gap-16 2xl:gap-20 text-center ">
          {/* Navbar For Larger Displays */}
          {navitems.map((item, index) =>
            item.isScroll ? (
              <button
                key={index}
                onClick={() => handleScrollNavigation(item.path)} // Handle scroll navigation
                className="hover:text-blue-500 hover:cursor-pointer hidden lg:inline-block font-montserrat font-bold text-center text-sm md:text-base "
              >
                {item.title}
              </button>
            ) : (
              <Link
                key={index}
                to={item.path}
                className="hover:text-blue-500 hover:cursor-pointer hidden lg:inline-block font-montserrat font-bold text-center text-sm md:text-base "
              >
                {item.title}
              </Link>
            )
          )}
          {isLoggedIn && <LogoutButton />}
        </section>

        {/* Mobile Sidebar */}
        <div
          className={clsx(
            "fixed inset-0 z-[10000] lg:hidden bg-black/50 backdrop-blur-sm transition-all ",
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

            {navitems.map((item, index) =>
              item.isScroll ? (
                <button
                  key={index}
                  onClick={() => {
                    closeSidebarWithDelay(); // Close the sidebar
                    handleScrollNavigation(item.path); // Perform scroll navigation
                  }}
                  className="font-bold flex flex-col items-center justify-center"
                >
                  {item.title}
                </button>
              ) : (
                <Link
                  key={index}
                  to={item.path}
                  className="font-bold flex flex-col items-center justify-center"
                  onClick={closeSidebarWithDelay} // Close sidebar with delay
                >
                  {item.title}
                </Link>
              )
            )}
          </section>
        </div>
      </nav>
    </main>
  );
};

export default Navbar;
