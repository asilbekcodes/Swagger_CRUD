import axios from 'axios'
import React, { useRef, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { url } from '../../helpers/url'
function Register() {
  const [add, setAdd] = useState([])
  const firstname = useRef('')
  const lastname = useRef('')
  const userName = useRef('')
  const password = useRef('')
  const prePassword = useRef('')
  const navigate = useNavigate()

  const loginPage = () => {
    navigate('/x  ')
  }

  const addUser = () => {
    const user = {
      "firstname": firstname.current.value,
      "lastname": lastname.current.value,
      "userName": userName.current.value,
      "password": password.current.value,
      "prePassword": prePassword.current.value
    }
    axios.post(url + 'auth/register', user)
      .then(res => {
        console.log(res);
        setAdd(res.config.data)
        toast.success("Ro'yxatdan o'tdingiz")
        if(res.status === 200 || res.status === 201){
          navigate("/login")
        }else {
          navigate("/register")
          toast.error("Iltimos ro'yxatdan o'ting")
        }
      }).catch(err => {
        console.error(err);
        toast.error("Iltimos ro'yxatdan o'ting")
      })

  }


  return (
    <div className='relative flex items-center justify-center h-[100vh] container mx-auto'>
      <div className='w-[500px] h-[560px] rounded-xl border border-black px-20'>
        <div className='flex justify-center items-center py-5'>
          <h1 className='text-3xl text-black'>Register</h1>
        </div>
        <div className='flex flex-col gap-3'>
          <div>
            <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 ">First Name</label>
            <input ref={firstname} type="text" id="small-input" class="block w-[350px] p-2 text-gray-900 border border-gray-300 rounded-lg  text-xs  dark:placeholder-gray-400" />
          </div>
          <div>
            <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 ">Last Name</label>
            <input ref={lastname} type="text" id="small-input" class="block w-[350px] p-2 text-gray-900 border border-gray-300 rounded-lg  text-xs  dark:placeholder-gray-400" />
          </div>
          <div>
            <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
            <input ref={userName} type="text" id="small-input" class="block w-[350px] p-2 text-gray-900 border border-gray-300 rounded-lg  text-xs  dark:placeholder-gray-400" />
          </div>
          <div>
            <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
            <input ref={password} type="text" id="small-input" class="block w-[350px] p-2 text-gray-900 border border-gray-300 rounded-lg  text-xs  dark:placeholder-gray-400" />
          </div>
          <div>
            <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 ">Prew Password</label>
            <input ref={prePassword} type="text" id="small-input" class="block w-[350px] p-2 text-gray-900 border border-gray-300 rounded-lg  text-xs  dark:placeholder-gray-400" />
          </div>
          <button type="reset" onClick={addUser} className='btn w-[350px] rounded-3xl text-white bg-black py-2 border'>Sign in</button>
          <button onClick={loginPage} className='w-[350px] py-2 border rounded-full text-black'>Login</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Register