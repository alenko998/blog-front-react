import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

export const getToken = () => {
  return Cookies.get('token') || null
}

export const isAuthenticated = () => {
  return !!getToken()
}

export const getUserRole = (): string | null => {
  const token = getToken()
  if (!token) return null

  try {
    const decoded: any = jwtDecode(token)
    return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null
  } catch {
    return null
  }
}

export const isAdmin = () => {
  return getUserRole() === 'Admin'
}

export const isUser = () => {
  return getUserRole() === 'User'
}

export const logout = () => {
  Cookies.remove('token')
}
