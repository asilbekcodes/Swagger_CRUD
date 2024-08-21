import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from './consts/const'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [categoryId, setcategoryId] = useState([])
  const [product, setProduct] = useState([])

  const [infoModal, setInfoModal] = useState(false)
  const openModal = () => setInfoModal(!infoModal)
  const [infoItem, setInfoItem] = useState(null)

  const [editModal, setEditModal] = useState(false)
  const openEditModal = () => setEditModal(!editModal)

  const [deleteModal, setDeleteModal] = useState(false)
  const openDelete = () => setDeleteModal(!deleteModal)

  const [addModal, setAddModal] = useState(false)
  const openAddModal = () => setAddModal(!addModal)

  useEffect(() => {
    getcategoryId()
    getProduct()
  }, [])

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
    axios.get(url + 'product/list')
    .then(res =>{
      // console.log(res.data.body);
      setProduct(res.data.body)
    })
    .catch(err =>{
      console.error(err);
    })
  }

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState('')
  function editProducts(){
    let obg = {
      "name": name,
      "description": desc,
      "categoryId": infoItem.categoryId,
      "price": price
    }
    axios.put(url + `product/update/${infoItem.id}`, obg)
    .then(res => {
      console.log(res);
      toast.success('Successfully updated')
      setEditModal(false)
      getProduct()
    })
    .catch(err =>{
      console.error(err);
      toast.error('Something went wrong')
    })
  }

  function deleteProducts(){
    axios.delete(url + `product/{id}?id=${infoItem.id}`)
    .then(res => {
      console.log(res);
      toast.success('Successfully deleted')
      getProduct()
      openDelete()
    })
    .catch(err =>{
      console.error(err);
      toast.error('Something went wrong')
    })
  }


  const [catagory, setCategory] = useState('')
  function addProducts(){
    let obg = {
      "name": name,
      "description": desc,
      "categoryId": catagory,
      "price": price
    }
    console.log(obg);
    axios.post(url + `product/save`, obg)
    .then (res => {
      console.log(res);
      toast.success('Successfully added')
      // setAddModal(false)
      getProduct()
    })
    .catch(err =>{
      console.error(err);
      toast.error('Something went wrong')
    })

    openAddModal()
  }

  return (
    <div className='container mx-auto py-5'>
      <div >
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
      <button onClick={openAddModal} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add+</button>
      <div className="relative overflow-x-auto border border-black border-solid rounded-xl">
          <table className="w-full text-sm text-left rtl:text-right  ">
              <thead className="text-xs text-gray-900 uppercase ">
                  <tr>
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
                  product.length > 0 ? product.map(item => 
                      <tr className="bg-white " >
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            {item.name}
                          </th>
                          <td className="px-6 py-4 text-gray-900">
                              {item.description.length > 15 ? item.description.slice(0, 15) + '...' : item.description}
                          </td>
                          <td className="px-6 py-4 text-gray-900">
                            {item.price} so'm
                          </td>
                          <button onClick={() => {openModal(); setInfoItem(item)}} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">info</button>
                          <button onClick={() => {openEditModal();setInfoItem(item)}} type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">edit</button>
                          <button onClick={() => {openDelete(); setInfoItem(item)}} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                      </tr>
                  ) : <tr ><td className='px-6 py-4'>data is empty...</td></tr>
                }
              </tbody>
              
          </table>
      </div>
        {
          infoModal && 
            <div id="static-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative p-4 w-full max-w-2xl max-h-full ">
                    <div class="relative rounded-lg shadow bg-slate-50">
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 ">
                                Info modal
                            </h3>
                            <button onClick={openModal} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-400 dark:hover:text-white" data-modal-hide="static-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div class="p-4 md:p-5 space-y-4">
                          <p><b>ID:</b> {infoItem.id}</p>
                          <p><b>categoryId:</b> {infoItem.categoryId}</p>
                          <p><b>Name:</b> {infoItem.name}</p>
                          <p><b>description:</b> {infoItem.description}</p>
                          <p><b>Price:</b> {infoItem.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        }
        { editModal &&
            <div id="authentication-modal" tabindex="-1" aria-hidden="true" className="flex  fixed top-0 right-0 left-0 z-50 justify-center items-center  md:inset-0 ">
            <div className="relative  p-4 w-[450px] max-w-2xl">
                <div className="relative bg-slate-100 rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Edit
                        </h3>
                        <button onClick={openEditModal} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        <div className="space-y-4" action="#">
                            <div>
                                <label for="name" className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">Product name</label>
                                <input onChange={(e) => setName(e.target.value)} type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Product name" required />
                            </div>
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <input onChange={(e) => setDesc(e.target.value)}  type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Description" required />
                            </div>
                            <div>
                                <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <input onChange={(e) => setPrice(e.target.value)} type="text" name="phone" id="phone" placeholder="Price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                            </div>
                            <div>
                              <button onClick={() => {editProducts()}} type="submit" className="mt-7 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
       }

       { deleteModal &&
        <div id="popup-modal" tabindex="-1" class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative p-4 w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button onClick={openDelete} type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="p-4 md:p-5 text-center">
                        <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                        <button onClick={deleteProducts} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                            Yes, I'm sure
                        </button>
                        <button onClick={openDelete} data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                    </div>
                </div>
            </div>
        </div>
       }

      { addModal &&
            <div id="authentication-modal" tabindex="-1" aria-hidden="true" className="flex  fixed top-0 right-0 left-0 z-50 justify-center items-center  md:inset-0 ">
            <div className="relative  p-4 w-[450px] max-w-2xl">
                <div className="relative bg-slate-100 rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Edit
                        </h3>
                        <button onClick={openAddModal} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        <div className="space-y-4" action="#">
                            <div>
                                <label for="name" className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">Product name</label>
                                <input onChange={(e) => setName(e.target.value)} type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Product name" required />
                            </div>
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <input onChange={(e) => setDesc(e.target.value)}  type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Description" required />
                            </div>
                            <div>
                                <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <input onChange={(e) => setPrice(e.target.value)} type="text" name="phone" id="phone" placeholder="Price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                            </div>
                            <div>
                            <div class="max-w-sm mx-auto">
                              <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">category</label>
                              <select onChange={(e) => setCategory(e.target.value)} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected disabled>select category</option>
                                {categoryId.length > 0 && categoryId.map(item =>
                                  <option value={item.id}>{item.name}</option>
                                )}
                              </select>
                            </div>
                              <button onClick={addProducts} type="submit" className="mt-7 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
      }

      <ToastContainer/>
    </div>
  )
}

export default App
