import React, { useState } from 'react'
import { Search, Filter, MapPin, Clock, Wifi, User } from 'lucide-react'
// Mock data for login tracking
const mockLogins = [
  {
    id: '1',
    userName: 'John Doe',
    role: 'staff',
    date: '2023-04-17',
    time: '09:05 AM',
    location: 'Office',
    ipAddress: '192.168.1.101',
    device: 'Windows PC',
  },
  {
    id: '2',
    userName: 'Jane Smith',
    role: 'manager',
    date: '2023-04-17',
    time: '08:45 AM',
    location: 'Office',
    ipAddress: '192.168.1.102',
    device: 'MacBook Pro',
  },
  {
    id: '3',
    userName: 'Alex Johnson',
    role: 'staff',
    date: '2023-04-17',
    time: '09:15 AM',
    location: 'Remote',
    ipAddress: '72.14.192.15',
    device: 'Windows PC',
  },
  {
    id: '4',
    userName: 'Michael Brown',
    role: 'staff',
    date: '2023-04-17',
    time: '08:30 AM',
    location: 'Office',
    ipAddress: '192.168.1.105',
    device: 'iPhone',
  },
  {
    id: '5',
    userName: 'Sarah Williams',
    role: 'manager',
    date: '2023-04-16',
    time: '09:00 AM',
    location: 'Remote',
    ipAddress: '98.76.54.32',
    device: 'MacBook Air',
  },
  {
    id: '6',
    userName: 'Admin User',
    role: 'admin',
    date: '2023-04-16',
    time: '08:15 AM',
    location: 'Office',
    ipAddress: '192.168.1.100',
    device: 'Windows PC',
  },
]
const LoginTracking  = () => {
  const [logins] = useState(mockLogins)
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  // Filter logins based on search term and filters
  const filteredLogins = logins.filter((login) => {
    const matchesSearch =
      login.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      login.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      login.device.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDate = dateFilter === '' || login.date === dateFilter
    const matchesLocation =
      locationFilter === '' || login.location === locationFilter
    const matchesRole = roleFilter === '' || login.role === roleFilter
    return matchesSearch && matchesDate && matchesLocation && matchesRole
  })
  // Get unique dates, locations, and roles for filters
  const uniqueDates = [...new Set(logins.map((login) => login.date))]
  const uniqueLocations = [...new Set(logins.map((login) => login.location))]
  const uniqueRoles = [...new Set(logins.map((login) => login.role))]
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-medium text-gray-900">
          Staff Login & Punch-In Tracking
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Monitor staff login activities, including time, date, location, and IP
          address.
        </p>
      </div>
      {/* Filters */}
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
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
                placeholder="Search by name, IP..."
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="date-filter"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <select
              id="date-filter"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            >
              <option value="">All Dates</option>
              {uniqueDates.map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="location-filter"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <select
              id="location-filter"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            >
              <option value="">All Locations</option>
              {uniqueLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
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
              {uniqueRoles.map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => {
                setSearchTerm('')
                setDateFilter('')
                setLocationFilter('')
                setRoleFilter('')
              }}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <Filter size={16} className="mr-2 text-gray-500" />
              Clear Filters
            </button>
          </div>
        </div>
      </div>
      {/* Login tracking table */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Device
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredLogins.length > 0 ? (
                filteredLogins.map((login) => (
                  <tr key={login.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-200">
                          <div className="flex h-full w-full items-center justify-center">
                            <User size={16} className="text-gray-500" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {login.userName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {login.role.charAt(0).toUpperCase() +
                              login.role.slice(1)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2 text-gray-400" />
                        <div>
                          <div className="text-sm text-gray-900">
                            {login.date}
                          </div>
                          <div className="text-sm text-gray-500">
                            {login.time}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2 text-gray-400" />
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${login.location === 'Office' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                        >
                          {login.location}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <Wifi size={16} className="mr-2 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {login.ipAddress}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {login.device}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No login records found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MapPin className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Office Logins Today
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {
                      logins.filter(
                        (login) =>
                          login.location === 'Office' &&
                          login.date === '2023-04-17',
                      ).length
                    }
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Wifi className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Remote Logins Today
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {
                      logins.filter(
                        (login) =>
                          login.location === 'Remote' &&
                          login.date === '2023-04-17',
                      ).length
                    }
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Average Login Time
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    08:55 AM
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <User className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Total Active Users
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {
                      logins.filter((login) => login.date === '2023-04-17')
                        .length
                    }
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LoginTracking
