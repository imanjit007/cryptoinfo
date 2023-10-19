import React, {createContext, useContext, useState,useEffect } from "react";
const Crypto = createContext();
const CryptoContext = ({children}) => {
const [currency, setcurrency] = useState('inr');
const [symbolCoin, setsymbolCoin] = useState('₹');
const [user,setUser]=useState();
console.log(user);
useEffect(() => {
if(currency==='inr') setsymbolCoin('₹');
else if(currency==='usd') setsymbolCoin('$');
}, [currency])

  return <Crypto.Provider value={{currency,symbolCoin,setcurrency,user,setUser}}>{children}</Crypto.Provider>;
};

export default CryptoContext;

export const CryptoState=()=>{
    return useContext(Crypto);
}