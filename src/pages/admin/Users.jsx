import React, { useEffect, useRef, useState } from 'react'
import { url } from '../../helpers/url';
import axios from 'axios';
import { config } from '../../helpers/token';
import AdminHeader from '../../components/adminHeader';
import Footer from '../../components/Footer';

function Users() {
    const [users, setUsers] = useState(null)
    const [editRole, setEditRole] = useState(false)
    const openEditRole = () => setEditRole(!editRole)

    const [selectedUserID, setSelectedUserID] = useState(null)
    const selectedRole = useRef('')

    const [selectID, setSelectID] = useState(null)
    const [deleteModal, setDeleteModal] = useState(false)
    const openDelete = () => setDeleteModal(!deleteModal)


    function getUsers() {
        axios.get(`${url}user/list`, config)
        .then(res => {
            console.log(res)
            if (res.data.success === true) {
              let checkedUsers = res.data.body.filter((item) => item.role !== 'ROLE_ADMIN')
              setUsers(checkedUsers)
            }else{
                setUsers([])
            }
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getUsers()
    }, [])

    function deleteUser() {
        axios.delete(`${url}user/delete/${selectID}`, config)
        .then(res => {
            console.log(res)
            getUsers()
            setDeleteModal(false)
        }).catch(err => {
            console.log(err);
        })
    }
    
    function editUserRole() {
      if (selectedUserID && selectedRole.current.value !== 'Choose a role') {
        axios.put(`${url}user/update/role/${selectedUserID}?role=${selectedRole.current.value}`, {}, config)
          .then(res => {
            console.log(res.data);
            getUsers()
            setEditRole(false)
          }).catch(err => {
            console.log(err);
          })
        }
    }
  return (
    <>
      <AdminHeader />
    <div className='container m-auto my-5'>
      <h4 className='text-3xl font-serif font-bold text-green-500 mb-5'>Users</h4>
      <div className="relative overflow-x-auto border border-black border-solid rounded-xl">
          <table className="w-full text-sm text-left rtl:text-right  ">
              <thead className="text-xs text-gray-900 uppercase ">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          #
                      </th>
                      <th scope="col" className="px-6 py-3">
                        fullName
                      </th>
                      <th scope="col" className="px-6 py-3">
                        userName
                      </th>
                      <th scope="col" className="px-6 py-3">
                        role
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                  </tr>
              </thead>
              <tbody >
                {
                  users && users.length > 0 ? users.map((item, key) => 
                      <tr key={key} className="bg-white " >
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            {key + 1}
                          </th>
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            {item.fullName}
                          </th>
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            {item.userName}
                          </th>
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            {item.role}
                          </th>
                          <button onClick={() => {openDelete(); setSelectID(item.id)}} type="button" class="mx-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                          <button onClick={() => {openEditRole(); setSelectedUserID(item.id)}} type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:yellow-red-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-900">Edit role</button>
                      </tr>
                  ) : <tr ><td className='px-6 py-4'>data is empty...</td></tr>
                }
              </tbody>
              
          </table>
      </div>
    </div>
    { editRole &&
            <div id="authentication-modal" tabindex="-1" aria-hidden="true" className="flex  fixed top-0 right-0 left-0 z-50 justify-center items-center  md:inset-0 ">
            <div className="relative  p-4 w-[450px] max-w-2xl">
                <div className="relative bg-slate-100 rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Edit category
                        </h3>
                        <button onClick={openEditRole} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        <div className="space-y-4" action="#">
                        <select ref={selectedRole} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          <option selected desabled>Choose a role</option>
                          <option value="ROLE_SELLER">Seller</option>
                          <option value="ROLE_BUYER">Buyer</option>
                        </select>
                            <div>
                              <button onClick={editUserRole} type="submit" className="mt-7 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
       }
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
                      <button onClick={deleteUser} data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                          Yes, I'm sure
                      </button>
                      <button onClick={openDelete} data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                  </div>
              </div>
          </div>
      </div>
       }
       <Footer />
    </>
  )
}

export default Users
