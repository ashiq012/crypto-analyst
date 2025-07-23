import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom';
function Home() {
  const {allCoin , coin} = useContext(CoinContext);
  const [displayCoin , setDisplayCoin] = useState([]);
  const [findCoin,setFindCoin] = useState('');
  const inputHandler = (e) => {
    setFindCoin(e.target.value)
    if(e.target.value === ""){
      setDisplayCoin(allCoin)
    }
  }
  const seachHandler = async (e) =>{
    e.preventDefault()
    const searchedCoin = await allCoin.filter( (item)=>{
      return item.name.toLowerCase().includes(findCoin.toLowerCase())
    } )
    setDisplayCoin(searchedCoin)
  }
  useEffect(()=>{
    setDisplayCoin(allCoin);
  },allCoin)
  return (
    <div className='home'>
        <div className='hero'>
            <h1>Largest <br/>Crypto Market</h1>
            <p>Welcome to the world's largest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>
            <form onSubmit={seachHandler}>
                  <input onChange={inputHandler} value={findCoin} type="text" placeholder='Search crypto....'/>
                  <button type='submit'>Search</button>
            </form>
        </div>
        <div className="crypto-table">
          <div className="table-layout">
            <p>#</p>
            <p>Coins</p>
            <p>Price</p>
            <p style={{textAlign:'center'}}>24h Change</p>
            <p className='market-cap'>Market cap</p>
          </div>
          {
            displayCoin.slice(0,10).map((item,index)=>(
              <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
                <p>{item.market_cap_rank}</p>
                <div>
                  <img src={item.image} alt="" />
                  <p>{item.name + "-" + item.symbol}</p>
                </div>
                <p >{coin.symbol}{item.current_price.toLocaleString()}</p>
                <p className={item.price_change_percentage_24h>0?"green":"red"}
                >{coin.symbol}{Math.floor(item.price_change_percentage_24h*100)/100}</p>
                <p className='market-cap'>{coin.symbol}{item.market_cap.toLocaleString()}</p>
              </Link>
            ))
          }
        </div>
    </div>
  )
}

export default Home