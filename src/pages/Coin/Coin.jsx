import React, { useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { useContext } from 'react';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../Components/LineChart/LineChart';

function Coin() {
const {coinId} = useParams();
const [coinData , setCoinData]= useState()
//past 10 days data fetch for graph
const [historicalData , setHistoricalData]= useState()
const {coin} = useContext(CoinContext)
const fetchData = async () => {
  const options = {
  method: 'GET',
  headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-kPJNrDRExbKXHtof8UGr4zAg'}
};

fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
  .then(res => res.json())
  .then(res => setCoinData(res))
  .catch(err => console.error(err));
}
//past data api call
const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-kPJNrDRExbKXHtof8UGr4zAg',
      },
    };

    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=10&interval=daily`,
        options
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      setHistoricalData(data);
    } catch (err) {
      console.error("Historical data fetch error:", err.message);
    }
  };
useEffect(()=>{
  fetchData()
  fetchHistoricalData()
},[coin])


if(coinData && historicalData){
  return (
    <div className='coin'>
      <div className="coin-name">
        <img src={coinData.image.large} alt="" />
        <p><b>{coinData.name}{coinData.symbol.toUpperCase()}</b></p>
      </div>
      <div className="coinchart">
        <LineChart historicalData={historicalData}/>
      </div>
      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>{coinData.market_data.market_cap[coin.name].toLocaleString()}</li>
        </ul>
         <ul>
          <li>24H high</li>
          <li>{coin.symbol}{coinData.market_data.high_24h[coin.name].toLocaleString()}</li>
        </ul>
         <ul>
          <li>24H low</li>
          <li>{coin.symbol}{coinData.market_data.low_24h[coin.name].toLocaleString()}</li>
        </ul>
      </div>
    </div>
  )}
  else{
    return(
      <div className="spinner">
        <div className="spin"></div>
      </div>
    )
  }
}

export default Coin;