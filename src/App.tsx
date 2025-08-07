import { Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'


function App() {
  return (
    <div className="min-h-screen bg-pink-50">
      <Navbar />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
