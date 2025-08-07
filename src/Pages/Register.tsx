import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Button from '../Components/Button'
import toast from 'react-hot-toast'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const validateForm = () => {
    if (username.length < 6) {
      setError('Username must be at least 6 characters long.')
      return false
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return false
    }
    const hasDigit = /\d/.test(password)
    if (!hasDigit) {
      setError('Password must contain at least one number.')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) return

    try {
      const response = await axios.post('http://localhost:5168/api/Writer/Register', {
        username,
        password,
      })

      if (response.status === 200 || response.status === 201) {
        toast.success('Registration successful!')
        setTimeout(() => {
          navigate('/')
        }, 1000)
      }
    } catch (err: any) {
      const message = err.response?.data

      if (typeof message === 'string') {
        setError(message)
      } else {
        setError('Registration failed. Please try again.')
      }
    }
  }

  return (
    <div className="flex justify-center items-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-pink-600 text-center">Register</h2>

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
          Register
        </Button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-pink-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  )
}
