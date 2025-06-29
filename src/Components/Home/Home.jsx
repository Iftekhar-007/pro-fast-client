import React from "react";
import Banner from "../Banner/Banner";
import Services from "../Servicesdata/ServicesData";
import Logos from "../Logos/Logos";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="p-5">
        <Services></Services>
      </div>
      <Logos></Logos>
    </div>
  );
};

export default Home;
