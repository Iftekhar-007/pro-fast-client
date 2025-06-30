import React from "react";
import Banner from "../Banner/Banner";
import Services from "../Servicesdata/ServicesData";
import Logos from "../Logos/Logos";
import ClientReviewSlider from "../CliebtReview/ClientReviewSlider";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="p-5">
        <Services></Services>
      </div>
      <Logos></Logos>
      <ClientReviewSlider></ClientReviewSlider>
    </div>
  );
};

export default Home;
