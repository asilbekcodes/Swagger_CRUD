import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'

function Test() {
    const [count, setCount] = useState(0)
    const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/users')
    const getProduct = useCallback(() => {
        axios.get(url)
        .then(res => {
            console.log(res.data)
            
        }).catch(err => {
            console.error(err)
        })
    }, [url])

    useEffect(() => {
        getProduct()
    }, [getProduct])

  return (
    <div>
      <button onClick={() => setUrl('https://jsonplaceholder.typicode.com/todos')}></button>
    </div>
  )
}

export default Test
