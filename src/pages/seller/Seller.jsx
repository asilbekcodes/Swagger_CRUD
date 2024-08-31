import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import axios from 'axios'
import { url } from '../../helpers/url'
import { config } from '../../helpers/token'
import BuyerHeader from '../../components/buyerHeader'
import { toast } from 'react-toastify'



function Seller() {
  const [products, setProducts] = useState([])

  const [selectID, setSelectID] = useState(null)

  const [deleteModal, setDeleteModal] = useState(false)
  const openDelete = () => setDeleteModal(!deleteModal)

  
 
  function product() {
    axios.get(`${url}product/list`, config) 
      .then(response => {
        if (response.data.success) {
          setProducts(response.data.body)
        } else {
          setProducts([])
        }
      })
      .catch(error => {
        console.log(error);
        
      })
  }



  function deleteProduct() {
    if (config && selectID) {
      axios.delete(`${url}product/${selectID}`, config)
        .then(response => {
          toast.success('Product deleted successfully')
          if (response.data.success) {
            toast.success('Product deleted successfully')
            setDeleteModal(false)
            product()
          } else {
            toast.error('Failed to delete product')
          }
        }).catch(() => {
          toast.error('Failed to delete product')
        })
    } else {
      toast.error('server error')
    }
  }


  useEffect(() => {
    product()
  }, [])

  return (
    <>
      <BuyerHeader />
      <div className='container mx-auto mb-5 mt-20 h-[55vh]'>
        <h1 className='text-3xl font-bold text-green-600 font-serif my-5'>Products</h1>
        <button className='bg-blue-600 py-2 mb-5 px-3 text-white rounded-lg'>Add+</button>
        <div className="relative overflow-x-auto border border-black border-solid rounded-xl">
          <table className="w-full text-sm text-left rtl:text-right  ">
              <thead className="text-xs text-gray-900 uppercase ">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          #
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Product name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        description
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Actions
                      </th>
                  </tr>
              </thead>
              <tbody >
                {
                  products && products.length > 0 ? products.map((item, key) => 
                    <>
                      <tr key={key} className="bg-white " >
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            {key + 1}
                          </th>
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            {item.name}
                          </th>
                          <td className="px-6 py-4 text-gray-900">
                              {item.description.length > 20 ? item.description.slice(0, 20) + '...' : item.description}
                          </td>
                          <button  type="button" class="focus:outline-none mx-2 text-white bg-yellow-400 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5   ">edit</button>
                          <button onClick={() => {openDelete(); setSelectID(item.id)}} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                      </tr>
                      {
                        deleteModal && 
                        <div id="popup-modal" tabindex="-1" class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                          <div class="relative p-4 w-full max-w-md max-h-full">
                              <div class="relative bg-white rounded-lg shadow drop-shadow-2xl ">
                                  <button onClick={openDelete} type="button" class="absolute top-3 end-2.5 text-gray-700 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  " data-modal-hide="popup-modal">
                                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                      </svg>
                                      <span class="sr-only">Close modal</span>
                                  </button>
                                  <div class="p-4 md:p-5 text-center">
                                      <svg class="mx-auto mb-4 text-gray-700 w-12 h-12 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                      </svg>
                                      <h3 class="mb-5 text-lg font-normal text-gray-700 ">Are you sure you want to delete this product?</h3>
                                      <button onClick={() => deleteProduct(item.id)} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                          Yes, I'm sure
                                      </button>
                                      <button onClick={openDelete} data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                                  </div>
                              </div>
                          </div>
                        </div>
                      }
                    </>
                  ) : <tr ><td className='px-6 py-4'>data is empty...</td></tr>
                }
              </tbody>
              
          </table>
        </div>  
      </div>
      <Footer/>
    </>
  )
}

export default Seller
