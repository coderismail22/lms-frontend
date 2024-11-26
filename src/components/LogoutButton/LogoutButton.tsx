import { useLogout } from "@/hooks/useLogout";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate(); // Trigger the logout process
  };

  return (
    <Button onClick={handleLogout} disabled={logoutMutation.isPending}>
      <LogOut />
      {logoutMutation.isPending ? "Logging out..." : "Logout"}
    </Button>
  );
};

export default LogoutButton;
