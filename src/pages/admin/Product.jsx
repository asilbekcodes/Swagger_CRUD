import React, { useEffect, useState } from 'react'
import { url } from '../../helpers/url'
import axios from 'axios'
import { toast } from 'react-toastify'
import { config } from '../../helpers/token'


function Product() {
    const [products, setProducts] = useState(null)


    function product() {
        axios.get(`${url}product/list`)
            .then(response => {
                if (response.data.success) {
                    setProducts(response.data.body)
                } else {
                    setProducts([])
                }
            })
            .catch(error => {
                toast.error('Failed to fetch products')
            })
    }

    useEffect(() => {
        product()
    }, [])

    function deleteProduct(productId) {
        if (config && productId) {
            axios.delete(`${url}product/${productId}`, config)
                .then(response => {
                    toast.success('Product deleted successfully')
                    if (response.data.success) {
                        toast.success('Product deleted successfully')
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
  return (
    <div className='container mx-auto my-5'>
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
                          Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Actions
                      </th>
                  </tr>
              </thead>
              <tbody >
                {
                  products && products.length > 0 ? products.map((item, key) => 
                      <tr key={key} className="bg-white " >
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            {key + 1}
                          </th>
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            {item.name}
                          </th>
                          <td className="px-6 py-4 text-gray-900">
                              {item.description.length > 15 ? item.description.slice(0, 15) + '...' : item.description}
                          </td>
                          <td className="px-6 py-4 text-gray-900">
                            {item.price} so'm
                          </td>
                          <button onClick={() => deleteProduct(item.id)} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                      </tr>
                  ) : <tr ><td className='px-6 py-4'>data is empty...</td></tr>
                }
              </tbody>
              
          </table>
      </div>
    </div>
  )
}

export default Product
