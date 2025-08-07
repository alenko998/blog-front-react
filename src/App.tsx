import { Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import { isAuthenticated, isAdmin, isUser } from './Utils/Auth'
import UserPanel from './Pages/UserPanel'
import AdminPanel from './Pages/AdminPanel'

function App() {
  return (
    <div className="min-h-screen bg-pink-50">
      <Navbar />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected User Route */}
          <Route
            path="/user"
            element={
              isAuthenticated() && isUser() ? (
                <UserPanel />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Protected Admin Route */}
          <Route
            path="/admin"
            element={
              isAuthenticated() && isAdmin() ? (
                <AdminPanel />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
