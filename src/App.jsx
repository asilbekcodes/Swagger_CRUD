import React from 'react'
import { Route,  Routes, } from 'react-router-dom'
import Main from './pages/Main'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Buyer from './pages/buyer/Buyer'
import Admin from './pages/admin/Admin'
import Seller from './pages/seller/Seller'
import Product from './pages/admin/Product'
import Category from './pages/admin/Category'
import Users from './pages/admin/Users'
function App() {
  // let navigater = useNavigate()
  // useEffect(() => {
  //   checkIsLogin()
  // },[])

  // const checkIsLogin = () => {
  //   // const token = localStorage.getItem('token')
  //   const token = config
  //   console.log(token);
  //   if (!token) {
  //     navigater('/login')
  //   }else{
  //     navigater('/')
  //   }
  // }

  // const navigate = useNavigate()
  // if (Login === false) {
  //   navigate("/login")
  // }
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login />} />
        <Route path='/buyer' element={<Buyer/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/seller' element={<Seller/>}/>
        <Route path="/product" element={<Product />} />
        <Route path='/category' element={<Category/>}/>
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  )
}

export default App
