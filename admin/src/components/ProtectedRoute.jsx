import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
// interface ProtectedRouteProps {
//   children: React.ReactNode
//   allowedRoles: string[]
// }
const ProtectedRoute = ({
  children,
  allowedRoles,
}) => {
  const { user, isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  if (user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />
    } else if (user.role === 'manager') {
      return <Navigate to="/manager" replace />
    } else {
      return <Navigate to="/staff" replace />
    }
  }
  return <>{children}</>
}
export default ProtectedRoute
