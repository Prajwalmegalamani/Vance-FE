import React, {
  BaseSyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { MdOutlineLogin, MdOutlineLogout } from "react-icons/md";
import { storage } from "../lib/storage";
import { AuthContext } from "../context/AuthContext";

const HeaderComponent: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, handleLogout } = useContext(AuthContext);

  const redirectToHome = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center py-4 px-52 bg-[#111111] border-b border-b-white border-opacity-10">
      <div
        className="text-green-400 text-2xl font-bold hover:cursor-pointer"
        onClick={(e) => redirectToHome(e)}
      >
        <img src={Logo} alt="Vance_Logo" className="h-8" />
      </div>
      {isAuthenticated ? (
        <button
          className="border font-semibold py-2 px-6 mx-1 rounded-full flex items-center justify-center gap-2 bg-black border-green-500 text-green-500"
          onClick={handleLogout}
        >
          Sign out
          <MdOutlineLogout className="h-4 w-4" />
        </button>
      ) : (
        <button
          className="bg-green-400 text-[#0b0b0b] font-semibold py-2 px-6 mx-1 rounded-full flex items-center justify-center gap-2"
          onClick={() => navigate("/signin")}
        >
          Sign in
          <MdOutlineLogin className="h-4 w-4" />
        </button>
      )}
    </header>
  );
};

export default HeaderComponent;
