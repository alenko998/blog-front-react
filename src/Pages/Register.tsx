import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Components/Button'


export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ username, password })
  }

  return (
    <div className="flex justify-center items-center mt-10">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-pink-600 text-center">Register</h2>
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
