import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router";
import { NavLink } from "react-router";

const Logo = () => {
  return (
    <NavLink to="/">
      <div className="flex relative">
        <img src={logo} alt="" />
        <p className="absolute ml-5 mt-5 text-3xl font-extrabold font-urbanist">
          ProFast
        </p>
      </div>
    </NavLink>
  );
};

export default Logo;
