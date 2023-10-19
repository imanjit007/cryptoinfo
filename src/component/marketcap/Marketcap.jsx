import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CryptoState } from "../../CryptoContext";
import { CoinList } from "../../config/api";
import axios from "axios";
import PaginationCoins from "./PaginationCoins";
import Loading from "../Loading";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
const Marketcap = () => {
  const { currency, symbolCoin, setcurrency } = CryptoState();
  const [flag, setflag] = useState(false);
  const [coins, setcoins] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
      fetchCoinsList();
  });
  const fetchCoinsList = async () => {
    await axios
      .get(CoinList(currency))
      .then((res) => {
          setflag(true);
          setcoins(res.data);
          console.log('fetching Data');
      })
      .catch((err) => {
        console.log('Error while fetching Data');
        setflag(false);
      });
  };

  const filterData = coins.filter(
    (coin) =>
      coin["name"].toLowerCase().includes(searchInput.toLowerCase()) ||
      coin["symbol"].toLowerCase().includes(searchInput.toLowerCase())
  );

  const totalCoins = filterData.length;
  const firstIndex = currentPage * postPerPage;
  const lastIndex = firstIndex - postPerPage;
  const currentPost = filterData.slice(lastIndex, firstIndex);

  return (
    <>
      {!coins || flag === false ? (
        <>
          <Loading />
        </>
      ) : (
        <div className=" p-5 bg-dark">
          <div className="container">
            <div className="coin-list-container">
              <h2 className="text-light text-align mb-3">
                Cryptocurrency Prices by Market Cap
              </h2>
              <input
                type="text"
                className="search-input mb-3"
                id=""
                placeholder="Seach Your Coins Here"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div className="coins-cointainer">
              <Table>
                <Thead>
                  <Tr>
                    <Th># Rank</Th>
                    <Th>Symbol</Th>
                    <Th>Coin</Th>
                    <Th>Price</Th>
                    <Th>24h Change</Th>
                    <Th>Market Cap</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {currentPost &&
                    currentPost.map((coins, i) => {
                      const {
                        id,
                        market_cap_rank,
                        image,
                        current_price,
                        market_cap,
                        price_change_percentage_24h,
                        name,
                        symbol,
                      } = coins;

                      return (
                        <Tr key={i}>
                          <Td>{market_cap_rank}</Td>
                          <Td>
                            <img
                              src={image}
                              className="img-round"
                              alt={name}
                              width={40}
                              height={40}
                            />
                          </Td>
                          <Td>
                            <Link
                              to={`/coins/${id}`}
                              className="namespan"
                              id={id}
                            >
                              <span className="coin-symbol">{symbol}</span>
                              <span className="coin-name">{name}</span>
                            </Link>
                          </Td>
                          <Td>
                            {symbolCoin === "$" ? "$" : "₹"}
                            {current_price.toLocaleString("en-US")}
                          </Td>
                          <Td
                            className={
                              price_change_percentage_24h < 0
                                ? "text-danger"
                                : "text-success"
                            }
                          >
                            {price_change_percentage_24h < 0
                              ? price_change_percentage_24h.toFixed(2) + "%"
                              : "+" + price_change_percentage_24h.toFixed(2) + "%"}
                          </Td>
                          <Td>
                            <span>{symbolCoin === "$" ? "$" : "₹"}</span>
                            {market_cap.toLocaleString("en-US")}
                          </Td>
                        </Tr>
                      );
                    })}
                </Tbody>
              </Table>
              <PaginationCoins
                totalCoins={totalCoins}
                setcurrentPage={setcurrentPage}
                postPerPage={postPerPage}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Marketcap;
