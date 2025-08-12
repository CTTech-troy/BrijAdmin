import React, { useCallback, useState, createContext, useContext } from 'react'
export const useNotifications = () => useContext(NotificationContext);

const NotificationContext = createContext({
  notifications: [],
  addNotification: () => {},
  markAsRead: () => {},
  markAllAsRead: () => {},
  clearNotifications: () => {},
  unreadCount: 0,
})
// Remove useNotifications export from this file
// Mock notifications for demonstration
const initialNotifications = [
  {
    id: '1',
    type: 'info',
    message: 'Welcome to the dashboard',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
  {
    id: '2',
    type: 'success',
    message: 'Your report was successfully submitted',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
]
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(initialNotifications)
  const addNotification = useCallback((type, message) => {
    const newNotification = {
      id: Date.now().toString(),
      type,
      message,
      read: false,
      timestamp: new Date(),
    }
    setNotifications((prev) => [newNotification, ...prev])
  }, [])
  const markAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification,
      ),
    )
  }, [])
  const markAllAsRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }, [])
  const clearNotifications = useCallback(() => {
    setNotifications([])
  }, [])
  const unreadCount = notifications.filter((n) => !n.read).length
  const value = {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    unreadCount,
  }
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}
