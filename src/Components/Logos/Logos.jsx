import React from "react";
import logo1 from "../../assets/brands/amazon.png";
import logo2 from "../../assets/brands/amazon_vector.png";
import logo3 from "../../assets/brands/casio.png";
import logo4 from "../../assets/brands/moonstar.png";
import logo5 from "../../assets/brands/randstad.png";
import logo6 from "../../assets/brands/start-people 1.png";
import logo7 from "../../assets/brands/start.png";
import Marquee from "react-fast-marquee";

const showLogos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const Logos = () => {
  return (
    <div className="lg:w-11/12 mx-auto text-center mb-12">
      <div className="mb-10">
        <h2 className="text-4xl font-bold">Our Happy Clients</h2>
      </div>

      <Marquee>
        {showLogos.map((logo, index) => (
          <div key={index} className="flex items-center mx-7">
            <img className="h-6 object-contain" src={logo} alt="" />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Logos;
