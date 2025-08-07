import { Link } from 'react-router-dom'
import Button from './Button'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg border-b border-pink-200 py-4 px-6 flex justify-between items-center">
      <Link to="/" className="text-2xl font-extrabold text-pink-600 tracking-wide">
        Blog Application
      </Link>
      <div className="space-x-3 flex">
        <Link to="/login">
          <Button>Login</Button>
        </Link>
        <Link to="/register">
          <Button>Register</Button>
        </Link>
      </div>
    </nav>
  )
}
