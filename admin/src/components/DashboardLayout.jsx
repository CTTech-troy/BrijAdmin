import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Bell,
  Users,
  MessageSquare,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useNotifications } from '../contexts/NotificationContext'

const DashboardLayout = ({
  children,
  title,
  navItems,
}) => {
  const { user, logout } = useAuth()
  const { unreadCount } = useNotifications()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for larger screens */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex items-center justify-between px-4 py-5">
            <div className="flex items-center">
              <div className="text-xl font-bold text-gray-800">Dashboard</div>
            </div>
            <button
              onClick={toggleSidebar}
              className="rounded-md p-1 text-gray-500 hover:bg-gray-100 md:hidden"
            >
              <X size={20} />
            </button>
          </div>
          {/* User info */}
          <div className="border-b border-gray-200 px-4 py-4">
            <div className="font-medium text-gray-800">{user?.name}</div>
            <div className="text-sm text-gray-500">
              {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
            </div>
          </div>
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-2 py-4">
            <ul className="space-y-1">
              {navItems
                .filter((item) => item.role.includes(user?.role || ''))
                .map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.to}
                      className="flex items-center rounded-md px-4 py-3 text-gray-700 hover:bg-gray-100"
                    >
                      <span className="mr-3 text-gray-500">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
          {/* Logout button */}
          <div className="border-t border-gray-200 px-4 py-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center rounded-md px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              <LogOut size={20} className="mr-3 text-gray-500" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="rounded-md p-1 text-gray-500 hover:bg-gray-100 md:hidden"
              >
                <Menu size={20} />
              </button>
              <h1 className="ml-4 text-xl font-semibold text-gray-800">
                {title}
              </h1>
            </div>
            {/* Notifications */}
            <div className="flex items-center">
              <div className="relative mr-4">
                <button
                  onClick={() => navigate('/notifications')}
                  className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
                >
                  <Bell size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>
        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
export default DashboardLayout
