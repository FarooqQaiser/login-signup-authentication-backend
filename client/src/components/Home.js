import React, { useContext } from "react";
import Button from "./Button";
import { AuthContext } from "./AuthContext";

export default function Home() {
  const { logout } = useContext(AuthContext);

  const handleLogoutButton = () => {
    logout();
  };

  return (
    <div className="w-full h-screen flex flex-col gap-5 justify-center items-center">
      <p className="text-green-600 text-xl font-semibold">
        Congratulations! You have successfully logged in
      </p>
      <Button
        name={"Log out"}
        bgColor={"bg-[#0078F8]"}
        txtColor={"text-white"}
        border={"border"}
        borderValue={"border-1"}
        borderColor={"border-[#0078F8]"}
        hoverBgColor={"hover:bg-white"}
        hoverTextColor={"hover:text-[#0078F8]"}
        hoverBorderColor={"hover:border-[#0078F8]"}
        buttonFunction={handleLogoutButton}
      />
    </div>
  );
}
