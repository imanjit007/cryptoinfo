import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import Select from "react-select";
import coins from "./Coins";
import Loading from "../Loading";
import { CryptoState } from "../../CryptoContext";
import { chartDays } from "../../config/data";
const CryptoPriceChart = () => {
  const [chartData, setChartData] = useState(null);
  const [days, setDays] = useState(1);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const { currency } = CryptoState();

  useEffect(() => {
    fetchCryptoData();
  }, [days, selectedCoins, currency]);

  const fetchCryptoData = async () => {
    try {
      const coinDataPromises = selectedCoins.map(async (coin) => {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coin.value}/market_chart?vs_currency=${currency}&days=${days}`
        );
        return {
          coin,
          prices: response.data.prices,
        };
      });

      const coinDataList = await Promise.all(coinDataPromises);
      const chartData = {
        labels: coinDataList[0].prices.map((coin) => {
          let date = new Date(coin[0]);
          let time =
            date.getHours() > 12
              ? `${date.getHours() - 12}:${date.getMinutes()} PM`
              : `${date.getHours()}:${date.getMinutes()} AM`;
          return days === 1 ? time : date.toLocaleDateString();
        }),
        datasets: coinDataList.map((coinData, index) => ({
          label:
            coinData.coin.value.charAt(0).toUpperCase() +
            coinData.coin.value.slice(1),
          data: coinData.prices.map((item) => item[1]),
          borderColor: getRandomColor(index),
        })),
      };
      setChartData(chartData);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDaysChange = (event) => {
    setDays(event.target.value);
  };

  const handleCoinChange = (coins) => {
    setSelectedCoins(coins);
  };
  const getRandomColor = (index) => {
    const colors = [
      "rgb(75, 192, 192)",
      "rgb(255, 99, 132)",
      "rgb(54, 162, 235)",
      "rgb(255, 205, 86)",
    ];
    return colors[index % colors.length];
  };

  const colourStyles = {
    option: (defaultStyles, state) => ({
      ...defaultStyles,
      backgroundColor: state.isFocused ? "rgb(133, 96, 246)" : "rgba(17, 24, 39, 1)",
      color: state.isFocused ? "#fff" : "#fff",
      cursor: "pointer",
    }),
    control: (defaultStyles) => ({
      ...defaultStyles,
      backgroundColor: "rgba(17, 24, 39, 1) !important",
      padding: "8px 16px",
      marginTop: 20 + "px",
      border: "2px solid rgba(167, 139, 250, 1) !important",
      boxShadow: "none",
      cursor: "pointer",
    }),
    singleValue: (defaultStyles) => ({
      ...defaultStyles,
    }),
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="comparebg">
          <h1 className="mb-5 mt-5 text-center">Crypto Price Comparison</h1>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <label htmlFor="coins">Select Coins:</label>
          <label htmlFor="days">
            Select &nbsp;
            <select id="days" value={days} onChange={handleDaysChange}>
              {chartDays.map((coin, i) => {
                const { value, label } = coin;
                return (
                  <option key={i} value={value}>
                    {label}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <div>
          {
            <Select
              id="coins"
              onChange={handleCoinChange}
              styles={colourStyles}
              isMulti
              options={coins}
            />
          }
        </div>
        {selectedCoins.length === 0 ? (
          <h2 className="d-flex align-content-center justify-content-center mt-5">
            Please select a coin to view a Comparsion chart
          </h2>
        ) : (
          <div className="pt-4">
            {chartData ? (
              <Line
                data={chartData}
                options={{
                  elements: {
                    point: {
                      radius: 1,
                    },
                  },
                }}
              />
            ) : (
              <Loading />
            )}
          </div>
        )}
      </div>
      
    </div>
  );
};

export default CryptoPriceChart;
