import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from './Button'
import { getUserRole, isAuthenticated, logout } from '../Utils/Auth'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [role, setRole] = useState<string | null>(null)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path: string) => location.pathname === path

  useEffect(() => {
    if (isAuthenticated()) {
      setRole(getUserRole())
    } else {
      setRole(null)
    }
  }, [location.pathname]) // Refetch role when route changes

  return (
    <nav className="bg-white shadow-lg border-b border-pink-200 py-4 px-6 flex justify-between items-center">
      {/* Left side: Logo + Admin/User Panel */}
      <div className="flex items-center space-x-3">
        <Link to="/">
          <Button className={isActive('/') ? 'ring-2 ring-pink-400' : ''}>
            Blog Application
          </Button>
        </Link>

        {role === 'Admin' && (
          <Link to="/admin">
            <Button className={isActive('/admin') ? 'ring-2 ring-pink-400' : ''}>
              Admin Panel
            </Button>
          </Link>
        )}

        {role === 'User' && (
          <Link to="/user">
            <Button className={isActive('/user') ? 'ring-2 ring-pink-400' : ''}>
              User Panel
            </Button>
          </Link>
        )}
      </div>

      {/* Right side: Login/Register or Logout */}
      <div className="space-x-3 flex items-center">
        {!isAuthenticated() && (
          <>
            <Link to="/login">
              <Button className={isActive('/login') ? 'ring-2 ring-pink-400' : ''}>
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className={isActive('/register') ? 'ring-2 ring-pink-400' : ''}>
                Register
              </Button>
            </Link>
          </>
        )}
        {isAuthenticated() && (
          <Button
            onClick={handleLogout}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300"
          >
            Logout
          </Button>
        )}
      </div>
    </nav>
  )
}
