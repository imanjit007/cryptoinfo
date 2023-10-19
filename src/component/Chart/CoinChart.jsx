import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HistoricalChart } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { chartDays } from "../../config/data";
const CoinChart = () => {
  const { currency, symbolCoin } = CryptoState();
  const params = useParams();
  const [chartData, setchartData] = useState([]);
  const [flag, setflag] = useState(false);
  const [days, setDays] = useState(1);
  const fetchChartData = async () => {
    const { data } = await axios.get(
      HistoricalChart(params.id, days, currency),
      { crossDomain: true }
    );
    setflag(true);
    setchartData(data.prices);
  };
  useEffect(() => {
    fetchChartData();
  }, [currency, days]);
  ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <div className="d-flex align-content-between flex-column justify-content-between">
      {!chartData || flag === false ? (
        <div className="d-flex align-content-between flex-column justify-content-between">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      ) : (
        <>
          <div className="d-flex align-content-center justify-content-between mb-4">
            <h2>Historical Chart</h2>
            <label htmlFor="days">
              Data of Last &nbsp;
              <select
                id="days"
                className="info"
                value={days}
                onChange={(e) => setDays(e.target.value)}
              >
                {chartDays.map((cdata, i) => {
                  const { label, value } = cdata;
                  return (
                    <>
                      <option key={i} value={value}>
                        {label}
                      </option>
                    </>
                  );
                })}
              </select>
            </label>
          </div>
          <Line
            data={{
              labels: chartData.map((coin) => {
                let date = new Date(coin[0]);
                
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: chartData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in  ${currency}`,
                  borderColor: "#a78bfa",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        </>
      )}
    </div>
  );
};

export default CoinChart;
