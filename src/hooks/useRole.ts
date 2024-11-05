// import { useContext } from "react";

export const useRole = () => {
  //   const { role } = useContext(AuthContext); // Replace with actual role context logic
  const role = "instructor";
  return role; // default to "admin" if no role is found
};
