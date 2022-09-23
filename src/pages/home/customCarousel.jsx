import React from "react";
import { Carousel } from "antd";

import "./customCarouselStyle.scss";

const CustomCarousel = () => {
  return (
    <>
      <Carousel autoplay>
        <div className="carousel-content">
          <img
            src={require("../../images/Carousel_1.webp")}
            alt=""
            className="carousel-img"
          />
        </div>

        <div className="carousel-content">
          <img
            src={require("../../images/Carousel_2.webp")}
            alt=""
            className="carousel-img"
          />
        </div>

        <div className="carousel-content">
          <img
            src={require("../../images/Carousel_3.webp")}
            alt=""
            className="carousel-img"
          />
        </div>

        <div className="carousel-content">
          <img
            src={require("../../images/Carousel_4.webp")}
            alt=""
            className="carousel-img"
          />
        </div>
        <div className="carousel-content">
          <img
            src={require("../../images/Carousel_5.webp")}
            alt=""
            className="carousel-img"
          />
        </div>
      </Carousel>
    </>
  );
};

export default CustomCarousel;
