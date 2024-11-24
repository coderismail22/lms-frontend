import { useLogout } from "@/api/useLogout";

const LogoutButton = () => {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(); // Trigger the logout process
  };

  return (
    <button onClick={handleLogout} disabled={logoutMutation.isPending}>
      {logoutMutation.isPending ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
