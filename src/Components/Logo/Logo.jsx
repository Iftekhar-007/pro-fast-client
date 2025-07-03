import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <div className="flex relative">
        <img src={logo} alt="" />
        <p className="absolute ml-5 mt-5 text-3xl font-extrabold font-urbanist">
          ProFast
        </p>
      </div>
    </Link>
  );
};

export default Logo;
