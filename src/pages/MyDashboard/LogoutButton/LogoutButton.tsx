import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://ismail-codes-portfolio-backend-24.vercel.app/api/v1/admin/logout",
        {},
        {
          withCredentials: true,
        }
      );
      navigate("/mylogin");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex justify-center items-center gap-2 bg-rose-100 hover:bg-red-300  p-3 rounded-md font-bold "
    >
      <CiLogout />
      Logout
    </button>
  );
};
