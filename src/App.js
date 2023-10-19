import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './component/Header'
import Home from './pages/Home'
import Coins from './pages/Coins'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CryptoPriceChart from './component/CompareCoin/CryptoPriceChart'
import Profile from './pages/Profile'
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coins/:id' element={<Coins />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/comparecoins' element={<CryptoPriceChart/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;