import React, { useEffect, useState } from 'react'
import { url } from '../../helpers/url';
import axios from 'axios';
import { config } from '../../helpers/token';

function Users() {
    const [users, setUsers] = useState(null)

    function getUsers() {
        axios.get(`${url}user/list`, config)
        .then(res => {
            console.log(res)
            setUsers(res.data.body)
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getUsers()
    }, [])

    function deleteUser(id) {
        axios.delete(`${url}user/delete/${id}`, config)
        .then(res => {
            console.log(res)
            getUsers()
        }).catch(err => {
            console.log(err);
        })
    }
  return (
    <div className='container m-auto my-5'>
      <div className="relative overflow-x-auto border border-black border-solid rounded-xl">
          <table className="w-full text-sm text-left rtl:text-right  ">
              <thead className="text-xs text-gray-900 uppercase ">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          id
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
                            {item.id}
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
                          <button onClick={() => deleteUser(item.id)} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                      </tr>
                  ) : <tr ><td className='px-6 py-4'>data is empty...</td></tr>
                }
              </tbody>
              
          </table>
      </div>
    </div>
  )
}

export default Users
