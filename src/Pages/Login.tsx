import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '../Components/Button'
import toast from 'react-hot-toast'
import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await axios.post('http://localhost:5168/api/Writer/login', {
        username,
        password,
      })

      if (response.status === 200) {
        const token = response.data.token

        Cookies.set('token', token, { expires: 7 })

        const decoded: any = jwtDecode(token)
        const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
        console.log('User role:', role)

        toast.success('Login successful!')
        setUsername('')
        setPassword('')

        setTimeout(() => {
          navigate('/')
        }, 1000)
      }
    } catch (err: any) {
      const message = err.response?.data

      if (typeof message === 'string') {
        setError(message)
      } else {
        setError('Login failed. Please try again.')
      }
    }
  }

  return (
    <div className="flex justify-center items-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-pink-600 text-center">Login</h2>

        {error && <p className="text-red-600 mb-4 text-sm text-center">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-pink-300"
          required
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
        <p className="mt-4 text-sm text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-pink-600 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  )
}
