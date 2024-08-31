import React, { useCallback, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { url  } from '../../helpers/url'
import { config } from '../../helpers/token'
import { toast } from 'react-toastify'
import AdminHeader from '../../components/adminHeader'
import Footer from '../../components/Footer'

const Category = () => {
    const [categorys, setCategories] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const name = useRef('')
    const desc = useRef('')

    const openAdd = () => {
        setIsAdd(!isAdd)
        if (isAdd == false) {
            toast.info('Modal is Open')
        } else {
            toast.info('Modal is Close')
        }
    }

    const openDelete = () => {
        setIsDelete(!isDelete)
    }
    const openEdit = () => {
        setIsEdit(!isEdit)
    }

    const addItem = () => {
        const newData = {
            "name": name.current.value,
            "description": desc.current.value,
            "fileId": 0
        }

        axios.post(`${url}category/save?productUnits=KG`, newData, config)
            .then(res => {
                setCategories(res.data.body)
                toast.success("success added ")
                getCategory()
                openAdd()
            }).catch(err => {
                console.error(err);
                toast.error(err)
            })
    }

    const editItem = (id) => {
        const editData = {
            "name": name.current.value,
            "description": desc.current.value,
        }

        axios.put(`${url}category/update/${id}?productUnits=KG`, editData, config)
            .then(res => {
                setCategories(res.data.body)
                toast.success("success edited ")
                getCategory()
            }).catch(err => {
                console.error(err);
                toast.error(err)
            })
        openEdit()
    }

    const getCategory = useCallback(() => {
        axios.get(`${url}category/list`, config)
            .then(res => {
                setCategories(res.data.body)
            }).catch(err => {
                console.error(err);
            })
    }, [])

    const deleteCategory = (id) => {
        axios.delete(`${url}category/${id}`, config)
            .then(res => {
                setCategories(res.data.body)
                getCategory()
                openDelete()
            }).catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
        getCategory()
    }, [getCategory])

    return (
        <div className='container m-auto my-5'>
            <AdminHeader />
            <h4 className='text-3xl font-serif font-bold text-green-500 mb-5'>Category</h4>

            <div>
                <button onClick={openAdd} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add +</button>
            </div>
            <div className='h-[47vh]'>
            <div class="relative overflow-x-auto border border-black border-solid rounded-xl ] max-h-max">
                <table class="w-full text-sm text-left rtl:text-right">
                    <thead class="text-xs text-gray-900 uppercase ">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                #
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                description
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorys && categorys.map((category, key) =>
                            <>
                                <tr key={key} class="bg-white">
                                    <th scope="row" class=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {key + 1}
                                    </th>
                                    <th scope="row" class=" px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {category.name}
                                    </th>
                                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        {category.description}
                                    </td>
                                    <td class=" flex gap-5 items-center">
                                        <p onClick={openEdit} href="#" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:yellow-red-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900">Edit</p>
                                        <p onClick={() => openDelete()} href="#" class="mx-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</p>
                                    </td>
                                </tr>

                                {isDelete &&
                                    <div id="popup-modal" tabindex="-1" class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                        <div class="relative p-4 w-full max-w-md max-h-full">
                                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                <button onClick={openDelete} type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                    </svg>
                                                    <span class="sr-only">Close modal</span>
                                                </button>
                                                <div class="p-4 md:p-5 text-center">
                                                    <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                    </svg>
                                                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                                                    <button onClick={() => deleteCategory(category.id)} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                                        Yes, I'm sure
                                                    </button>
                                                    <button onClick={openDelete} data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {isEdit &&
                                    <div id="crud-modal" tabindex="-1" aria-hidden="true" class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                        <div class="relative p-4 w-full max-w-md max-h-full">
                                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                                        Create New Product
                                                    </h3>
                                                    <button onClick={openEdit} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                        </svg>
                                                        <span class="sr-only">Close modal</span>
                                                    </button>
                                                </div>
                                                <div class="p-4 md:p-5">
                                                    <div class="grid gap-4 mb-4 grid-cols-2">
                                                        <div class="col-span-2">
                                                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                                            <input ref={name} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" />
                                                        </div>
                                                        <div class="col-span-2">
                                                            <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Describtion</label>
                                                            <input ref={desc} type="text" id="fname" name="fname"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"/>
                                                            </div>

                                                    </div>
                                                    <button onClick={() => editItem(category.id)} type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }

                            </>


                        )}
                    </tbody>
                </table>
            </div>
            </div>

            {isAdd &&
                <div id="crud-modal" tabindex="-1" aria-hidden="true" class="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div class="relative p-4 w-full max-w-md max-h-full">
                        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                    Create New Product
                                </h3>
                                <button onClick={openAdd} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div class="p-4 md:p-5">
                                <div class="grid gap-4 mb-4 grid-cols-2">
                                    <div class="col-span-2">
                                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                        <input ref={name} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" />
                                    </div>
                                    <div class="col-span-2">
                                        <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Describtion</label>
                                        <input ref={desc} type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" />
                                    </div>

                                </div>
                                <button onClick={addItem} type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                    Add new product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <Footer/>
        </div>
    )
}

export default Category