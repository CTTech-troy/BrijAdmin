import React, { useState } from 'react'
import { Search, Filter, UserCog, Check, X, MessageSquare } from 'lucide-react'
import { useNotifications } from '../../contexts/NotificationContext'
// Mock data for users
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'staff',
    department: 'Marketing',
    hasCustomerCareAccess: false,
    lastActive: '2023-04-17',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'manager',
    department: 'Sales',
    hasCustomerCareAccess: true,
    lastActive: '2023-04-17',
  },
  {
    id: '3',
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    role: 'staff',
    department: 'Development',
    hasCustomerCareAccess: false,
    lastActive: '2023-04-16',
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    role: 'manager',
    department: 'HR',
    hasCustomerCareAccess: false,
    lastActive: '2023-04-17',
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    role: 'staff',
    department: 'Finance',
    hasCustomerCareAccess: true,
    lastActive: '2023-04-15',
  },
  {
    id: '6',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    department: 'Administration',
    hasCustomerCareAccess: true,
    lastActive: '2023-04-17',
  },
]
const RoleManagement = () => {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const { addNotification } = useNotifications()
  // Filter users based on search term, role, and department
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === '' || user.role === roleFilter
    const matchesDepartment =
      departmentFilter === '' || user.department === departmentFilter
    return matchesSearch && matchesRole && matchesDepartment
  })
  // Get unique departments for filter
  const uniqueDepartments = [...new Set(users.map((user) => user.department))]
  const toggleRole = (userId) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          const newRole = user.role === 'staff' ? 'manager' : 'staff'
          addNotification(
            'success',
            `${user.name}'s role changed to ${newRole}`,
          )
          return {
            ...user,
            role: newRole,
          }
        }
        return user
      }),
    )
  }
  const toggleCustomerCare = (userId) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          const newStatus = !user.hasCustomerCareAccess
          addNotification(
            'success',
            `${user.name}'s Customer Care access ${newStatus ? 'granted' : 'revoked'}`,
          )
          return {
            ...user,
            hasCustomerCareAccess: newStatus,
          }
        }
        return user
      }),
    )
  }
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-medium text-gray-900">Role Management</h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage user roles and permissions. Toggle between Staff and Manager
          roles, and assign Customer Care access.
        </p>
      </div>
      {/* Filters */}
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Search users..."
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="role-filter"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role-filter"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="department-filter"
              className="block text-sm font-medium text-gray-700"
            >
              Department
            </label>
            <select
              id="department-filter"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            >
              <option value="">All Departments</option>
              {uniqueDepartments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => {
                setSearchTerm('')
                setRoleFilter('')
                setDepartmentFilter('')
              }}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <Filter size={16} className="mr-2 text-gray-500" />
              Clear Filters
            </button>
          </div>
        </div>
      </div>
      {/* Users table */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Customer Care
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200">
                          <div className="flex h-full w-full items-center justify-center">
                            <span className="text-sm font-medium text-gray-500">
                              {user.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {user.department}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : user.role === 'manager' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      {user.hasCustomerCareAccess ? (
                        <Check size={20} className="mx-auto text-green-500" />
                      ) : (
                        <X size={20} className="mx-auto text-red-500" />
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {user.lastActive}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      <div className="flex space-x-2">
                        {user.role !== 'admin' && (
                          <button
                            onClick={() => toggleRole(user.id)}
                            className="rounded-md bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
                            title={`Change to ${user.role === 'staff' ? 'Manager' : 'Staff'}`}
                          >
                            <UserCog size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => toggleCustomerCare(user.id)}
                          className="rounded-md bg-purple-100 p-2 text-purple-600 hover:bg-purple-200"
                          title={`${user.hasCustomerCareAccess ? 'Remove' : 'Add'} Customer Care Access`}
                        >
                          <MessageSquare size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No users found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Role explanation */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="text-lg font-medium text-gray-900">Role Permissions</h3>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-md bg-gray-50 p-4">
            <h4 className="text-sm font-medium text-gray-900">Staff</h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
              <li>Upload and submit reports</li>
              <li>Submit absence requests</li>
              <li>View own reports and absence history</li>
              <li>Receive notifications</li>
            </ul>
          </div>
          <div className="rounded-md bg-blue-50 p-4">
            <h4 className="text-sm font-medium text-blue-900">Manager</h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-blue-600">
              <li>All Staff permissions</li>
              <li>Review reports from team members</li>
              <li>View team absence requests</li>
              <li>Access report analytics</li>
              <li>Optional: Customer Care access</li>
            </ul>
          </div>
          <div className="rounded-md bg-purple-50 p-4">
            <h4 className="text-sm font-medium text-purple-900">Admin</h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-purple-600">
              <li>All Manager permissions</li>
              <li>Final report approval</li>
              <li>Manage company complaints</li>
              <li>Track user logins</li>
              <li>Manage user roles</li>
              <li>Download all reports</li>
              <li>View all absence requests</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
export default RoleManagement
