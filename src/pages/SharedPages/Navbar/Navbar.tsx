import { Link, NavLink } from "react-router-dom";
import logo from "../../../../public/ejobsit-logo.svg";
import { GoChevronDown } from "react-icons/go";
import Swal from "sweetalert2";
import { useLogout } from "@/hooks/useLogout";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthState } from "@/hooks/useLogin";
import { authKey } from "@/api/authKey";
import { HiSparkles } from "react-icons/hi2";
import "../../../styles/eid-button.css";

const Navbar = () => {
  const queryClient = useQueryClient();

  // Use useQuery to subscribe to authKey changes
  const { data: authData } = useQuery<AuthState>({
    queryKey: authKey,
    // Automatically refresh auth state whenever authKey changes
    // TODO: Check potential error here
    initialData: queryClient.getQueryData<AuthState>(authKey),
  });

  const isLoggedIn = !!authData;
  const role = authData?.role || null;
  const logoutMutation = useLogout();

  const handleLogOut = () => {
    logoutMutation.mutate(); // Trigger the logout process
    Swal.fire({
      title: "Logged out successfully",
      text: "See You Again",
      icon: "success",
    });
  };

  const navlinks = (
    <>
      <div className="flex flex-col lg:flex-row text-[16px] gap-1">
        <Link to={"/get-your-website"}>
          <div className="relative font-siliguri">
            <div
              id="special-offer"
              className="relative block w-full px-4 py-2  text-center uppercase whitespace-nowrap overflow-hidden rounded-md font-bold"
            >
              <div className="flex lg:flex-row-reverse gap-2 items-center relative z-10 text-green-700">
                <p>স্পেশাল অফার</p>
                <p>
                  <HiSparkles className="" />
                </p>
              </div>
              <div className="absolute inset-0 rounded-md border-animation"></div>
            </div>
          </div>
        </Link>

        {/* <li>
          <NavLink
            to="/get-your-website"
            className={({ isActive }) =>
              `relative font-semibold ${
                isActive
                  ? "text-green-700 "
                  : "text-blue-500 hover:bg-[#2A323C] underline underline-offset-4"
              }`
            }
          >
            <div className="flex lg:flex-row-reverse gap-1">
              <p> বিশেষ অফার</p> 
              <HiSparkles />
            </div>
          </NavLink>
        </li> */}
        <li>
          <NavLink to="/">হোম </NavLink>
        </li>
        <li>
          <NavLink to="/courses">কোর্স সমূহ</NavLink>
        </li>
        <li>
          <NavLink to="/workshop">ওয়ার্কশপ</NavLink>
        </li>
        <li>
          <NavLink to="/about">আমাদের সম্পর্কে</NavLink>
        </li>
        <li>
          <NavLink to="/contact">যোগাযোগ</NavLink>
        </li>
      </div>
    </>
  );

  return (
    <div className="shadow-md sticky bg-gradient-to-r from-cyan-100 to-blue-100 hover:bg-gradient-to-l top-0 z-50 font-siliguri">
      <div className="navbar w-10/12 mx-auto bg-gradient-to-r from-cyan-100 to-blue-100 hover:bg-gradient-to-l">
        <div className="navbar-start">
          {/* Dropdown For Mobile */}
          <div className="dropdown ">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-64"
            >
              {navlinks}
            </ul>
          </div>
          {/* LOGO */}
          <div>
            <div>
              <div className="flex-1 block">
                <Link to="/">
                  <img
                    className="w-[80px] md:w-[100px]"
                    src={logo}
                    alt="ejobsit"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/*Navbar For Desktop */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navlinks}</ul>
        </div>

        {/* Render User Profile Based on Role Start */}
        <div className="navbar-end z-50">
          <div>
            {/* If Not Logged In */}
            {!isLoggedIn && role === null && (
              <div className="text-[17px] font-montserrat">
                <Link
                  to="/auth/login"
                  className="border-r-2 border-[#FDC449] mr-3  pr-3"
                >
                  Login
                </Link>
                <Link to="/auth/signup" className="">
                  Register
                </Link>
              </div>
            )}
            {/* If Student */}
            {isLoggedIn && role === "student" && (
              <div className="flex gap-1">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost border-2 border-gray-300 flex flex-col md:flex-row"
                  >
                    <h1>Profile</h1>
                    <p>
                      <GoChevronDown className="text-xl" />
                    </p>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
                  >
                    <li>
                      <Link to="/dashboard/student/home">Dashboard</Link>
                    </li>
                    <li>
                      <div onClick={handleLogOut}>Logout</div>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* If Admin */}
            {isLoggedIn && role === "admin" && (
              <div className="flex gap-1">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost border-2 border-gray-300 flex flex-col md:flex-row"
                  >
                    <h1>Profile</h1>
                    <p>
                      <GoChevronDown className="text-xl" />
                    </p>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
                  >
                    <li>
                      <Link to="/dashboard/admin/home">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/dashboard/admin/orders">Orders</Link>
                    </li>
                    <li>
                      <button onClick={handleLogOut}>Log Out</button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Render User Profile Based on Role End */}
      </div>
    </div>
  );
};

export default Navbar;
