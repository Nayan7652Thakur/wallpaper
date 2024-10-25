import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../redux/user/userSlice' // Import correct action from your slice


const SignUp = () => {
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const res = await fetch('/api/auth/signup', { // Use correct backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(input) // Send form data as JSON
      })

      const data = await res.json()

      if (!res.ok) { // Check if the response is not OK
        setError(data.message || 'Something went wrong')
        setLoading(false)
        return
      }

      setLoading(false)
      setError(null)

      // Dispatch the correct Redux action with user data
      dispatch(setCurrentUser({ username: input.username, email: input.email }))
      navigate("/") // Navigate to the homepage
      setInput({
        username: '',
        email: '',
        password: ''
      })
    } catch (error) {
      setLoading(false)
      setError('Failed to sign up')
      console.log(error)
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-center font-semibold text-3xl my-7'>
        Create account...
      </h1>

      <div>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            name='username'
            value={input.username}
            type="text"
            className='border rounded-lg p-3'
            placeholder='username'
          />
          <input
            onChange={handleChange}
            name='email'
            value={input.email}
            type="email"
            className='border rounded-lg p-3'
            placeholder='email'
          />
          <input
            onChange={handleChange}
            name='password'
            value={input.password}
            type="password"
            className='border rounded-lg p-3'
            placeholder='password'
          />
          <button
            type="submit"
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Signing up...' : 'Signup'}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <div className='flex gap-2 mt-5'>
            <p>
              have an account...
            </p>
            <Link to={'/sign-in'}>
              <span className='text-blue-700'>Sign in</span>
            </Link>
          </div>
      </div>
    </div>
  )
}

export default SignUp
