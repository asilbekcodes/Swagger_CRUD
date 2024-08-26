import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from '../../helpers/url'
import { config } from '../../helpers/token'
import { toast } from 'react-toastify'

function Category() {
    const [categories, setCategories] = useState(null)

    const [addModal, setAddModal] = useState(false)
    const openAddModal = () => setAddModal(!addModal)

    const [editModal, setEditModal] = useState(false)
    const openEditModal = () => setEditModal(!editModal)
    function getCategory() {
        axios.get(`${url}category/list`)
        .then(res => {
            // console.log(res.data.body)
            setCategories(res.data.body)
        }).catch(err => {
            console.log(err);
            
        })
    }

    useEffect(() => {
        getCategory()
    }, [])
    
    function deleteCategory(id) {
        axios.delete(`${url}category/${id}`, config)
        .then(res => {
            // console.log(res.data.success);
            getCategory()
            
        }).catch(err => {
            console.log(err);
            
        })
    }
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    function addCategory() {
        let obg = {
            "name": name,
            "description": desc
        }
        axios.post(`${url}category/save`, obg, config)
        .then(res => {
            console.log(res.data.success);
            getCategory()
            setAddModal(false)
            toast.success('Successfully added')
        }).catch(err => {
            console.log(err);
            toast.error('Something went wrong')
        })
    }
    function editCategory(id) {
        let obg = {
            "name": name,
            "description": desc,
        }
        axios.put(`${url}product/update/${id}`, obg, config)
        .then(res => {
            console.log(res.data.success);
            getCategory()
            setEditModal(false)
            toast.success('Successfully updated')
        }).catch(err => {
            console.log(err);
            toast.error('Something went wrong')
        })
    }
  return (
    <div className='container mx-auto my-5'>
        <button onClick={openAddModal} className='bg-blue-600 py-2 mb-2 px-3 text-white rounded-lg'>Add+</button>
        <div className="relative overflow-x-auto border border-black border-solid rounded-xl">
          <table className="w-full text-sm text-left rtl:text-right  ">
              <thead className="text-xs text-gray-900 uppercase ">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          id
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Category name
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
                  categories && categories.length > 0 ? categories.map((item, key) => 
                      <tr key={key} className="bg-white " >
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            {item.id}
                          </th>
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            {item.name}
                          </th>
                          <td className="px-6 py-4 text-gray-900">
                              {item.description.length > 20 ? item.description.slice(0, 20) + '...' : item.description}
                          </td>
                          <button onClick={() => openEditModal(item.id)} type="button" class="focus:outline-none mx-2 text-white bg-yellow-400 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5   ">edit</button>
                          <button onClick={() => deleteCategory(item.id)} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                      </tr>
                  ) : <tr ><td className='px-6 py-4'>data is empty...</td></tr>
                }
              </tbody>
              
          </table>
      </div>
      { addModal &&
            <div id="authentication-modal" tabindex="-1" aria-hidden="true" className="flex fixed top-0 right-0 left-0 z-50 justify-center items-center  md:inset-0 ">
            <div className="relative  p-4 w-[450px] max-w-2xl">
                <div className="relative bg-slate-100 rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Add category
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
                                <input  onChange={(e) => setName(e.target.value)} type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Product name" required />
                            </div>
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <input  onChange={(e) => setDesc(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Description" required />
                            </div>
                            <div>
                              <button onClick={addCategory} type="submit" className="mt-7 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">submit</button>
                            </div>
                        </div>
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
                            Edit category
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
                              <button onClick={editCategory} type="submit" className="mt-7 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
       }
    </div>
  )
}

export default Category
