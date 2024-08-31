import React, { useEffect } from 'react'
import { Route,  Routes, useNavigate, } from 'react-router-dom'
import Main from './pages/Main'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Buyer from './pages/buyer/Buyer'
import Admin from './pages/admin/Admin'
import Seller from './pages/seller/Seller'
import Product from './pages/admin/Product'
import Category from './pages/admin/Category'
import Users from './pages/admin/Users'
import { config } from './helpers/token'
function App() {
  // let navigater = useNavigate()
  

  // const checkIsLogin = () => {
  //   // const token = localStorage.getItem('token')
  //   const token = config
  //   console.log(token);
  //   if (!token) {
  //     navigater('/login')
  //   }else{
  //     navigater('/register')
  //   }
  // }
  
  // useEffect(() => {
  //   checkIsLogin()
  // },[])

  // const navigate = useNavigate()
  // if (Login === false) {
  //   navigate("/login")
  // }
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<Login />} />
        <Route path='/buyer' element={<Buyer/>}/>
        <Route path='/seller' element={<Seller/>}/>
        {/* --- admin pages --- */}
        <Route path='/admin' element={<Admin/>}/>
        <Route path="/admin/product" element={<Product />} />
        <Route path='/admin/category' element={<Category/>}/>
        <Route path="/admin/users" element={<Users />} />
      </Routes>
    </div>
  )
}

export default App
