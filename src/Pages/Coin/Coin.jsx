import React, { useContext, useEffect, useState } from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../Context/CoinContext';
import Linechart from '../../componets/LineChart/Linechart';

const Coin = () => {

  const {coinId} =  useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, sethistoricalData] = useState();
  const {currency} = useContext(CoinContext)

  const fechCoinData = async ()=> {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-1Gkby6gesT3sNNE3xTYNasNM'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(res => res.json())
      .then(res => setCoinData(res))
      .catch(err => console.error(err));

  }
const fechHistoricalData = async ()=>{
  const options = {
    method: 'GET',
    headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-1Gkby6gesT3sNNE3xTYNasNM'}
  };
  
  fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
    .then(res => res.json())
    .then(res => sethistoricalData(res))
    .catch(err => console.error(err));
}

  useEffect(()=>{
    fechCoinData();
    fechHistoricalData();
  },[currency])

if(coinData && historicalData){
  return (
    <div className='coin'>
      <div className="coin-name">
        <img src={coinData.image.large} alt="" />
        <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
      </div>

      <div className="coin-chart">
        <Linechart historicalData={historicalData}/>
      </div>
    <div className="coin-info">
      <ul>
      <li>Crypto Market Rank</li>
      <li>{coinData.market_cap_rank}</li>
      </ul>
      <ul>
      <li>Current Price</li>
      <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
      </ul>
      <ul>
      <li>Market Cap</li>
      <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
      </ul>
      <ul>
      <li>24 Hour high</li>
      <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
      </ul>
      <ul>
      <li>24 Hour low</li>
      <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
      </ul>
    </div>


    </div>
  )
}else{ 
  return (
    <div className='spinner'>
      <div className="spin"></div>

    </div>
  )
}
}

export default Coin
