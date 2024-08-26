import axios from 'axios'
import React, { useRef } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { url } from '../../helpers/url'
import { useNavigate } from 'react-router-dom'
function Login() {
  // const userName = useRef('')
  // const [login, setLogin] = useState([])
  // const password = useRef('')
  // const navigate = useNavigate()

  const registerPage = () => {
    navigate('/register')

  }
  // const userLogin = () => {
  //   const login = {
  //     "login": userName.current.value,
  //     "password": password.current.value
  //   }
    
  //   axios.post(url + 'auth/login', login)
  //     .then(res => {
  //       setLogin(res.config.data)
  //       toast.success("Success")
  //       localStorage.setItem('token', res.data.token)
  //       console.log(res);
  //       if (res.status == 200) {
  //         navigate("/")
  //       }
  //       console.log(res.status);
  //     }).catch(err => {
  //       toast.error("User Not Found")
  //       console.error(err);
  //     })
  // }

  const name = useRef('')
    const password = useRef('')

    const navigate = useNavigate();


    function login() {
        let userData = {
            "login": name.current.value,
            "password": password.current.value
        }

        if (userData.login !== '' || userData.password !== '') {
            axios.post(`${url}auth/login`, userData)
                .then(response => {
                  console.log(response);
                  localStorage.setItem('token', response.data.token);
                    if (response.data.role === 'ROLE_ADMIN') {
                      navigate('/admin');
                    }
                    else if (response.data.role === 'ROLE_SELLER') {
                      navigate('/seller');
                    }
                    else if (response.data.role === 'ROLE_BUYER') {
                      navigate('/buyer');
                    }
                }).catch(error => {
                    toast.error(error.response.data.message, 'Error logging in');

                })
        } else {
            toast.error('Please fill in all fields');
            if (name.current.value === '') name.current.style.borderColor = 'red';
            if (password.current.value === '') password.current.style.borderColor = 'red';
        }
    }
  return (
    <div className='relative flex items-center justify-center top-24 container mx-auto '>
      <div className='w-[500px] h-[420px] border border-black border-solid rounded-xl px-20'>
        <div className='flex justify-center items-center py-5'>
          <h1 className='text-3xl text-black'>Login</h1>
        </div>
        <div className='flex flex-col gap-3'>
          <div>
            <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 ">User Name</label>
            <input ref={name} placeholder='Enter User Name' type="text" id="small-input" class="block w-[350px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-white text-xs focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-700  " />
          </div>
          <div>
            <label for="smallinput" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
            <input ref={password} placeholder='Enter Password' type="text" id="smallinput" class="block w-[350px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-white text-xs focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-700  " />
          </div>
          <button type="reset" onClick={login} className='btn w-[350px] rounded-3xl text-white bg-orange-700 py-3 border'>Sign in</button>
          <div className='flex justify-between '>
            <button onClick={registerPage} className='px-5 py-2 border rounded-full text-black'>Create account</button>
            <button className='underline text-blue-900 hover:text-blue-600'>Forgot password?</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Login