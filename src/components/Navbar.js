import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="h-12 items-center flex justify-between px-5 bg-slate-300">
      <p>Ant Cloud</p>
      <button
        onClick={() => {
          localStorage.removeItem("userData");
          navigate("/login");
        }}
        className="bg-blue-500 px-3 h-fit py-1 rounded "
      >
        Log out
      </button>
    </div>
  );
};

export default Navbar;
