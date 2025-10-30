import React, { memo, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './pages/Login'
import { AdminDataContext } from './context/AdminContext';
import { Toaster } from "react-hot-toast";


function App() {

  let {adminData } = useContext(AdminDataContext);

  return (
    <>
      {!adminData ? <Login/> : <>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<Add/>}/>
        <Route path='/list' element={<List/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/orders' element={<Orders/>}/>
      </Routes>
      </>
    }
    </>
  )
}

export default memo(App)