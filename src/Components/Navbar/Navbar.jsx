import React, { useContext } from 'react'
import './Navbar.css'  
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { CoinContext } from '../../context/CoinContext'
function Navbar() {
  const {setCoin} = useContext(CoinContext);
  const currencyHandler = (e) => {
      switch (e.target.value){
        case "usd":{
          setCoin({name:"usd",symbol:"$"})
          console.log(e.target.value)
          break;
        }
        case "eur":{
          setCoin({name:"eur",symbol:"€"})
          console.log(e.target.value)
          break;
        }
        case "inr":{
          setCoin({name:"inr",symbol:"₹"})
          console.log(e.target.value)
          break;
        }
        default :{
          setCoin({name:"inr",symbol:"₹"})
          console.log(e.target.value)
          break;
        }
      }
  }
  return (
   <div className='navbar'>
<Link to={"/"}>
      <img src={logo} alt="Logo"  className='logo'/> 
      </Link>
        <ul>
          <Link to={"/"}>
          <li>Home</li></Link>
          <li>Features</li>
          <li>Pricing</li>
          <li>Blog</li>
        </ul>
        <div className='right_nav'>
          <select onChange={currencyHandler}>
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="inr">INR</option>
          </select>
          <button>Sign Up</button>
        </div>
   </div>
  )
}

export default Navbar