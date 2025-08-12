import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { NotificationProvider } from './contexts/NotificationContext'
import Login from './page/Login'
import StaffDashboard from './page/staff/StaffDashboard'
import ManagerDashboard from './page/manger/ManagerDashboard'
import AdminDashboard from './page/admin/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Staff Routes */}
          <Route
            path="/staff/*"
            element={
              <ProtectedRoute allowedRoles={['staff', 'manager', 'admin']}>
                <StaffDashboard />
              </ProtectedRoute>
            }
          />
          {/* Manager Routes */}
          <Route
            path="/manager/*"
            element={
              <ProtectedRoute allowedRoles={['manager', 'admin']}>
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />
          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App
