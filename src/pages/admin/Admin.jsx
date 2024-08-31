import React from 'react'
import AdminHeader from '../../components/adminHeader'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
function Admin() {
  return (
    <>
      <AdminHeader />
        <div className='container m-auto my-5 flex justify-between gap-10 h-[54vh]'>
          <Link to={"/admin/users"} className='w-full'>
            <button type="button" className="w-full h-32 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-3xl px-5 py-2.5 text-center me-2 mb-2">Users</button>
          </Link >
          <Link to={"/admin/category"} className='w-full'>
            <button type="button" className="w-full h-32 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-3xl px-5 py-2.5 text-center me-2 mb-2">Categorys</button>
          </Link>
          <Link to={"/admin/product"} className='w-full'>
            <button type="button" className="w-full h-32 text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-3xl px-5 py-2.5 text-center me-2 mb-2">Products</button>
          </Link>
      </div>
      <Footer />
    </>
  )
}

export default Admin
