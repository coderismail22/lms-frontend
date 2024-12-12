import { Link, NavLink } from "react-router-dom";
import logo from "../../../../public/ejobsit-logo.svg";
import { GoChevronDown } from "react-icons/go";
import Swal from "sweetalert2";
import { IoMdNotificationsOutline } from "react-icons/io";

const Navbar = () => {
  // Example user and isAdmin values
  const user = {
    displayName: "John Doe",
    photoURL: "https://via.placeholder.com/150",
  };
  const isAdmin = true;

  const handleLogOut = () => {
    Swal.fire({
      title: "Logged out successfully",
      text: "See You Again",
      icon: "success",
    });
  };

  const navlinks = (
    <>
      <div className="flex text-[16px]">
        <li>
          <NavLink to="/">হোম </NavLink>
        </li>
        <li>
          <NavLink to="/courses">কোর্স সমূহ</NavLink>
        </li>
        <li>
          {/* <NavLink to="#">আমাদের সম্পর্কে</NavLink> */}
        </li>
      </div>
    </>
  );

  return (
    <div className="shadow-md sticky bg-gradient-to-r from-cyan-100 to-blue-100 hover:bg-gradient-to-l top-0 z-50 font-siliguri">
      <div className="navbar w-10/12 mx-auto bg-gradient-to-r from-cyan-100 to-blue-100 hover:bg-gradient-to-l">
        <div className="navbar-start">
          <div className="dropdown">
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navlinks}
            </ul>
          </div>

          <div>
            <div>
              <div className="flex-1 block">
                <Link to="/">
                  <img className="w-[100px]" src={logo} alt="ejobsit" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navlinks}</ul>
        </div>
        <div className="navbar-end z-50">
          <div>
            {user && isAdmin && (
              <div className="flex gap-1">

                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost border-2 border-gray-300 flex flex-col md:flex-row"
                  >
                    <img
                      className="w-10 h-10 hidden md:block rounded-full"
                      src={user.photoURL}
                      alt=""
                    />
                    <h1>{user.displayName}</h1>
                    <p>
                      <GoChevronDown className="text-xl" />
                    </p>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link to="/profile/adminHome">Profile</Link>
                    </li>
                    <li>
                      <Link>Settings</Link>
                    </li>
                    <li>
                      <button onClick={handleLogOut}>Log Out</button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {user && !isAdmin && (
              <div className="flex gap-1">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost border-2 border-gray-300 flex flex-col md:flex-row"
                  >
                    <img
                      className="w-10 h-10 hidden md:block rounded-full"
                      src={user.photoURL}
                      alt=""
                    />
                    <h1>{user.displayName}</h1>
                    <p>
                      <GoChevronDown className="text-xl" />
                    </p>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link to="/profile/userHome">Profile</Link>
                    </li>
                    <li>
                      <Link>Settings</Link>
                    </li>
                    <li>
                      <button onClick={handleLogOut}>Log Out</button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {!user && (
              <div className="text-[17px]">
                <Link
                  to="/login"
                  className="border-r-2 border-[#FDC449] mr-3 pr-3"
                >
                  Login
                </Link>
                <Link to="/signup">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
