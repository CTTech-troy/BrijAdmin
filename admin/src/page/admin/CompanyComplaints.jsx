import React, { useState } from 'react'
import {
  AlertTriangle,
  CheckCircle,
  Archive,
  Trash2,
  Search,
  Filter,
} from 'lucide-react'
// Mock data for company complaints
const mockComplaints = [
  {
    id: '1',
    title: 'Office Equipment Issues',
    description:
      'Several computers in the marketing department are outdated and slow, affecting productivity.',
    submittedBy: 'Marketing Team',
    submittedDate: '2023-04-15',
    status: 'pending',
    priority: 'medium',
  },
  {
    id: '2',
    title: 'Air Conditioning Problems',
    description:
      "The air conditioning in the main conference room is not working properly. It's either too hot or too cold.",
    submittedBy: 'Office Manager',
    submittedDate: '2023-04-14',
    status: 'pending',
    priority: 'high',
  },
  {
    id: '3',
    title: 'Parking Space Shortage',
    description:
      'There are not enough parking spaces for all employees, especially during peak hours.',
    submittedBy: 'HR Department',
    submittedDate: '2023-04-10',
    status: 'pending',
    priority: 'low',
  },
  {
    id: '4',
    title: 'Cafeteria Food Quality',
    description:
      'Many employees have complained about the declining quality of food in the company cafeteria.',
    submittedBy: 'Employee Welfare Committee',
    submittedDate: '2023-04-08',
    status: 'resolved',
    priority: 'medium',
    resolution: 'New catering service has been contracted starting next month.',
  },
  {
    id: '5',
    title: 'Internet Connection Issues',
    description:
      'Frequent internet outages are disrupting work in the development department.',
    submittedBy: 'IT Department',
    submittedDate: '2023-04-05',
    status: 'archived',
    priority: 'high',
    resolution:
      'New ISP contract signed, installation scheduled for next week.',
  },
]
const CompanyComplaints = () => {
  const [complaints, setComplaints] = useState(mockComplaints)
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [resolutionText, setResolutionText] = useState('')
  // Filter complaints based on search term, status, and priority
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.submittedBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === '' || complaint.status === statusFilter
    const matchesPriority =
      priorityFilter === '' || complaint.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })
  const handleSelectComplaint = (complaint) => {
    setSelectedComplaint(complaint)
    setResolutionText(complaint.resolution || '')
  }
  const handleResolveComplaint = () => {
    if (!selectedComplaint || !resolutionText.trim()) return
    // Update complaint status
    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === selectedComplaint.id
          ? {
              ...complaint,
              status: 'resolved',
              resolution: resolutionText,
            }
          : complaint,
      ),
    )
    // Reset selection
    setSelectedComplaint(null)
    setResolutionText('')
  }
  const handleArchiveComplaint = () => {
    if (!selectedComplaint) return
    // Update complaint status
    setComplaints((prev) =>
      prev.map((complaint) =>
        complaint.id === selectedComplaint.id
          ? {
              ...complaint,
              status: 'archived',
            }
          : complaint,
      ),
    )
    // Reset selection
    setSelectedComplaint(null)
    setResolutionText('')
  }
  const handleDeleteComplaint = () => {
    if (!selectedComplaint) return
    // Remove complaint
    setComplaints((prev) =>
      prev.filter((complaint) => complaint.id !== selectedComplaint.id),
    )
    // Reset selection
    setSelectedComplaint(null)
    setResolutionText('')
  }
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return (
          <span className="inline-flex rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
            High
          </span>
        )
      case 'medium':
        return (
          <span className="inline-flex rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
            Medium
          </span>
        )
      case 'low':
        return (
          <span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
            Low
          </span>
        )
      default:
        return null
    }
  }
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
            Pending
          </span>
        )
      case 'resolved':
        return (
          <span className="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
            Resolved
          </span>
        )
      case 'archived':
        return (
          <span className="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
            Archived
          </span>
        )
      default:
        return null
    }
  }
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-medium text-gray-900">
          Company Complaints
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage and resolve complaints submitted by employees and departments.
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
                placeholder="Search complaints..."
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="status-filter"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="priority-filter"
              className="block text-sm font-medium text-gray-700"
            >
              Priority
            </label>
            <select
              id="priority-filter"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            >
              <option value="">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => {
                setSearchTerm('')
                setStatusFilter('')
                setPriorityFilter('')
              }}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <Filter size={16} className="mr-2 text-gray-500" />
              Clear Filters
            </button>
          </div>
        </div>
      </div>
      {/* Complaints table */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Submitted By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map((complaint) => (
                  <tr
                    key={complaint.id}
                    className={
                      selectedComplaint?.id === complaint.id
                        ? 'bg-blue-50'
                        : 'hover:bg-gray-50'
                    }
                  >
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {complaint.title}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {complaint.submittedBy}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {complaint.submittedDate}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {getPriorityBadge(complaint.priority)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {getStatusBadge(complaint.status)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      <button
                        onClick={() => handleSelectComplaint(complaint)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No complaints found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Selected complaint details */}
      {selectedComplaint && (
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-6 border-b border-gray-200 pb-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {selectedComplaint.title}
              </h3>
              <div className="flex items-center space-x-2">
                {getPriorityBadge(selectedComplaint.priority)}
                {getStatusBadge(selectedComplaint.status)}
              </div>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Submitted by {selectedComplaint.submittedBy} on{' '}
              {selectedComplaint.submittedDate}
            </p>
          </div>
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700">Description</h4>
            <p className="mt-2 text-sm text-gray-900">
              {selectedComplaint.description}
            </p>
          </div>
          {selectedComplaint.status === 'resolved' &&
            selectedComplaint.resolution && (
              <div className="mb-6 rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle
                      className="h-5 w-5 text-green-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Resolution
                    </h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>{selectedComplaint.resolution}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          {selectedComplaint.status === 'pending' && (
            <div className="mb-6">
              <label
                htmlFor="resolution"
                className="block text-sm font-medium text-gray-700"
              >
                Resolution
              </label>
              <textarea
                id="resolution"
                rows={3}
                value={resolutionText}
                onChange={(e) => setResolutionText(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter resolution details..."
              />
            </div>
          )}
          <div className="flex justify-end space-x-3">
            {selectedComplaint.status === 'pending' && (
              <>
                <button
                  type="button"
                  onClick={handleDeleteComplaint}
                  className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <Trash2 className="-ml-1 mr-2 h-5 w-5" />
                  Delete
                </button>
                <button
                  type="button"
                  onClick={handleArchiveComplaint}
                  className="inline-flex items-center rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                >
                  <Archive className="-ml-1 mr-2 h-5 w-5" />
                  Archive
                </button>
                <button
                  type="button"
                  onClick={handleResolveComplaint}
                  disabled={!resolutionText.trim()}
                  className={`inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${resolutionText.trim() ? 'bg-green-600 hover:bg-green-700' : 'bg-green-300 cursor-not-allowed'}`}
                >
                  <CheckCircle className="-ml-1 mr-2 h-5 w-5" />
                  Resolve
                </button>
              </>
            )}
            {(selectedComplaint.status === 'resolved' ||
              selectedComplaint.status === 'archived') && (
              <button
                type="button"
                onClick={handleArchiveComplaint}
                className="inline-flex items-center rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              >
                <Archive className="-ml-1 mr-2 h-5 w-5" />
                {selectedComplaint.status === 'archived'
                  ? 'Already Archived'
                  : 'Archive'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default CompanyComplaints
