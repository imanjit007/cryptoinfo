import React from "react";
import Carousel from "./Carousel";
const Banner = () => {
  return (
    <>
      <div className="banner p-5">
        <div className="container">
          <h1 className="text-center">Crypto Info</h1>
          <Carousel />
        </div>
      </div>
    </>
  );
};

export default Banner;
