import { useParams } from "react-router-dom";
import { SingleCoin } from "../../config/api";
import { Parser } from "html-to-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { CryptoState } from "../../CryptoContext";
import Loading from "../Loading";
import CoinChart from "../Chart/CoinChart";
const CoinInfo = () => {
  const [coinInfo, setcoinInfo] = useState();
  const { currency, symbolCoin } = CryptoState();
  const params = useParams();
  const coinId=params.id.toLowerCase();
  const fetchSingleCoin = async () => {
    const res = await axios.get(SingleCoin(coinId));
    setcoinInfo(res.data);
  };
  useEffect(() => {
    fetchSingleCoin();
  }, [currency]);
  const htmlParser = new Parser();
  const htmlString = coinInfo?.description.en;
  return (
    <>
      {!coinInfo ? (
        <Loading />
      ) : (
        <div className="coin-container pt-5 ">
          <div className="coin-main">
            <div className="coin-div">
              <div className="left-side container pb-5">
                <div className="coin-left-side">
                  <div className="coin-content">
                    <img
                      src={coinInfo?.image.large}
                      alt={coinInfo?.name}
                      height={200}
                      className="big-icon"
                    />
                    <div className="crypto-content">
                      <h2>{coinInfo?.name}</h2>
                      <h4>Rank: # {coinInfo.market_cap_rank}</h4>
                      <h4>
                        Current Price: <span>{symbolCoin}</span>{" "}
                        {
                          coinInfo?.market_data.current_price[
                            currency.toLowerCase()
                          ].toLocaleString("en-US")
                        }
                      </h4>
                      <h4>
                        Market Cap: <span>{symbolCoin}</span>{" "}
                        {coinInfo?.market_data.market_cap[
                          currency.toLowerCase()
                        ]
                        .toLocaleString("en-US")
                          .slice(0, -6)}
                      </h4>
                    </div>
                  </div>
                  <p className="description pt-5">{htmlParser.parse(htmlString)}</p>
                </div>
              </div>
              <div className="right-side ">
                <div className="container pt-5 pb-5">
                  <CoinChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoinInfo;
