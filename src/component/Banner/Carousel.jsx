import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";
const Carousel = () => {
  const [trandingCoins, settrandingCoins] = useState([]);
  const [flag, setflag] = useState(false);
  const { currency, symbolCoin } = CryptoState();

  const fetchTrandingCoins = async () => {
   
     await axios
      .get(TrendingCoins(currency))
      .then((res) => {
          console.log("success");
          setflag(true);
          settrandingCoins(res.data);
      })
      .catch((err) => {
        console.log("error");
        setflag(false);
      });
    // settrandingCoins(data);
  };
  useEffect(() => {
      fetchTrandingCoins();
  }, [currency]);

  const responsive = {
    0: { items: 1 },
    767: { items: 2 },
    1024: { items: 6 },
  };

  const items = trandingCoins.map((coins, i) => {
    return (
      <Link key={i} to={`/coins/${coins.id}`}>
        <div className="carousel-card">
          <img src={coins?.image} alt="" width={50} height={50} />
          <h4 className="content-h4">
            <span>{coins?.symbol}</span>{" "}
            <span
              className={
                coins?.price_change_percentage_24h < 0
                  ? "text-danger small-text"
                  : "text-success small-text"
              }
            >
              {coins?.price_change_percentage_24h < 0
                ? coins?.price_change_percentage_24h.toFixed(2)+"%"
                : "+" + coins?.price_change_percentage_24h.toFixed(2)+"%"}
            </span>
          </h4>
          <h4 className="content-h4">
            <span>{symbolCoin === "$" ? "$" : "₹"}</span> {coins?.current_price.toLocaleString("en-US")}
          </h4>
        </div>
      </Link>
    );
  });

  return (
    <>
      {!trandingCoins || flag === false ? (
        <div className="pt-5 d-flex align-items-center justify-content-center">
           <CircularProgress color="warning" />
        </div>
      ) : (
        <div className="pt-5">
          <AliceCarousel
            autoPlay
            disableDotsControls
            disableButtonsControls
            infinite
            autoHeight
            autoPlayInterval={2000}
            mouseTracking
            items={items}
            responsive={responsive}
            controlsStrategy="alternate"
          />
        </div>
      )}
    </>
  );
};

export default Carousel;
