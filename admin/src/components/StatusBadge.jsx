import React from 'react'
// Allowed status values: 'review', 'rejected', 'admin_review', 'approved', 'backup'
const StatusBadge = ({
  status,
  className = '',
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'review':
        return 'bg-blue-100 text-blue-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'admin_review':
        return 'bg-purple-100 text-purple-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'backup':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }
  const getStatusLabel = () => {
    switch (status) {
      case 'review':
        return 'Review'
      case 'rejected':
        return 'Rejected'
      case 'admin_review':
        return 'Admin Review'
      case 'approved':
        return 'Approved'
      case 'backup':
        return 'Backup'
      default:
        return 'Unknown'
    }
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusStyles()} ${className}`}
    >
      {getStatusLabel()}
    </span>
  )
}
export default StatusBadge
