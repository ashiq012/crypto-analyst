import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Home from './pages/Home/Home'
import { Route , Routes } from 'react-router-dom'
import Coin from './pages/Coin/Coin'

function App() {
  return (
    <div className='app'>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/coin/:coinId' element={<Coin/>}/>
        </Routes>
    </div>
  )
}

export default App