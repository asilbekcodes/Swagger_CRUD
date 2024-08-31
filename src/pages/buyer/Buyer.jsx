import React, { useEffect, useState } from 'react'
import BuyerHeader from '../../components/buyerHeader'
import axios from 'axios'
import { url } from '../../helpers/url'
import Footer from '../../components/Footer'

function Buyer() {
  const [categoryId, setcategoryId] = useState([])

  const [product, setProduct] = useState([])

  function getcategoryId(){
    axios.get(url + 'category/list')
    .then(res => {
      // console.log(res.data.body);
      setcategoryId(res.data.body)
    })
    .catch(err =>{
      console.error(err);
    })
  }

  function getProduct(){
    axios.get(`${url}product/list`)
    .then(res => {
      console.log(res.data.body);
      setProduct(res.data.body)
    })
    .catch(err =>{
      console.error(err);
    })
  }

  useEffect(() => {
    getcategoryId()
    getProduct()
  }, [])
  return (
    <>
      <BuyerHeader />
      <div className='container mx-auto my-5'>
        <div className='mt-20 mb-3'>
          { 
            categoryId.length > 0 && 
            <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br  dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">All</button>
          }
          {
            categoryId.length > 0 ? categoryId.map(item => 
              <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-[1]  dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">{item.name}</button>
            ) : <p className='px-6 py-4'>data is empty...</p>
          }
        </div>
        <div class="flex flex-wrap gap-5 justify-between max-h-max">
              {
                product && product.length > 0 ? product.map((item, key)  =>
                  <div key={key} class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                  <a href="#">
                      <img class="p-8 rounded-t-lg" src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D" alt="product image" />
                  </a>
                  <div class="px-5 pb-5">
                      <a href="#">
                          <h4 class="text-xl font-semibold tracking-tight text-gray-900 ">{item.name}</h4>
                          <h6 class="text-xl font-semibold tracking-tight text-gray-900 ">{item.description}</h6>
                      </a>
                      <div class="flex items-center mt-2.5 mb-5">
                          <div class="flex items-center space-x-1 rtl:space-x-reverse">
                              <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                              </svg>
                              <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                              </svg>
                              <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                              </svg>
                              <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                              </svg>
                              <svg class="w-4 h-4  text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                              </svg>
                          </div>
                          <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
                      </div>
                      <div class="flex items-center justify-between">
                          <span class="text-3xl font-bold text-gray-900 ">{item.price} so'm</span>
                          <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                      </div>
                  </div>
              </div>
                ) : <p className='px-6 py-4'>data is empty...</p>
              }
        </div>
        <Footer/>
      </div>
    </>
  )
} 
  



export default Buyer
