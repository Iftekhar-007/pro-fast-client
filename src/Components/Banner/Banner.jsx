import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../assets/banner/banner1.png";
import banner2 from "../../assets/banner/banner2.png";
import banner3 from "../../assets/banner/banner3.png";
const Banner = () => {
  return (
    <Carousel
      showThumbs={false}
      autoPlay={true}
      infiniteLoop={true}
      stopOnHover={false}
      transitionTime={1000}
      showStatus={false}
      className="my-12 lg:w-11/12 mx-auto p-5"
    >
      <div>
        <img src={banner1} />
      </div>
      <div>
        <img src={banner2} />
      </div>
      <div>
        <img src={banner3} />
      </div>
    </Carousel>
  );
};

export default Banner;
