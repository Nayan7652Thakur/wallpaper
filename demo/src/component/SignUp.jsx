import React, { useState } from 'react'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify()
      })


      const data = await res.json();

      if (data.success === false) {
        setError(data.message)
        return;
      }

      setLoading(false)
      setError(null)
      dispatch(signInSuccess(data))
      navigate('/')

    } catch (error) {
      console.log(error);
    }


  }


  return (
    <div className='p-3 max-w-lg mx-auto'>

      <h1 className='text-center font-semibold text-3xl my-7'>
        Create account...
      </h1>

      <div>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input type="username" className='border rounded-lg p-1' placeholder='username' />
          <input type="email" className='border rounded-lg p-1' placeholder='email' />
          <input type="password" name="" id="" className='border rounded-lg p-1' placeholder='password' />
          <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Signup
          </button>
        </form>
      </div>
    </div>

  )
}

export default SignUp
