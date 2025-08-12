import React from 'react'
import { useNotifications } from '../../contexts/NotificationContext'
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
} from 'lucide-react'
const Notifications = () => {
  const {
    notifications,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    unreadCount,
  } = useNotifications()
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-500" />
      case 'error':
        return <AlertCircle size={20} className="text-red-500" />
      case 'warning':
        return <AlertTriangle size={20} className="text-yellow-500" />
      case 'info':
      default:
        return <Info size={20} className="text-blue-500" />
    }
  }
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell size={24} className="mr-2 text-gray-500" />
            <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
            {unreadCount > 0 && (
              <span className="ml-2 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                {unreadCount} unread
              </span>
            )}
          </div>
          <div className="flex space-x-2">
            {notifications.length > 0 && (
              <>
                <button
                  onClick={markAllAsRead}
                  className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
                  disabled={unreadCount === 0}
                >
                  Mark all as read
                </button>
                <button
                  onClick={clearNotifications}
                  className="rounded-md bg-red-100 px-3 py-1 text-sm font-medium text-red-700 hover:bg-red-200"
                >
                  Clear all
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Notifications list */}
      <div className="rounded-lg bg-white shadow">
        {notifications.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <li
                key={notification.id}
                className={`p-4 ${!notification.read ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center p-8">
            <Bell size={48} className="mb-4 text-gray-300" />
            <p className="text-center text-gray-500">No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
export default Notifications
