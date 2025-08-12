import React, { useState } from 'react'
import {
  FileText,
  Download,
  Search,
  Filter,
  Calendar,
  User,
  Tag,
} from 'lucide-react'
// Mock data for reports
const mockReports = [
  {
    id: '1',
    title: 'Q1 Performance Report',
    submittedBy: 'John Doe',
    department: 'Marketing',
    submittedDate: '2023-04-15',
    status: 'approved',
    fileName: 'q1_performance.pdf',
  },
  {
    id: '2',
    title: 'Customer Satisfaction Survey',
    submittedBy: 'Jane Smith',
    department: 'Sales',
    submittedDate: '2023-04-14',
    status: 'approved',
    fileName: 'customer_satisfaction.pdf',
  },
  {
    id: '3',
    title: 'Project Proposal',
    submittedBy: 'Alex Johnson',
    department: 'Development',
    submittedDate: '2023-04-13',
    status: 'admin_review',
    fileName: 'project_proposal.pdf',
  },
  {
    id: '4',
    title: 'Monthly Financial Statement',
    submittedBy: 'Michael Brown',
    department: 'Finance',
    submittedDate: '2023-04-10',
    status: 'approved',
    fileName: 'financial_statement.pdf',
  },
  {
    id: '5',
    title: 'Employee Onboarding Guide',
    submittedBy: 'Sarah Williams',
    department: 'HR',
    submittedDate: '2023-04-05',
    status: 'approved',
    fileName: 'onboarding_guide.pdf',
  },
  {
    id: '6',
    title: 'System Architecture Overview',
    submittedBy: 'Alex Johnson',
    department: 'Development',
    submittedDate: '2023-03-28',
    status: 'approved',
    fileName: 'system_architecture.pdf',
  },
]
const ReportManagement = () => {
  const [reports] = useState(mockReports)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  // Filter reports based on search term, status, department, and date
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === '' || report.status === statusFilter
    const matchesDepartment =
      departmentFilter === '' || report.department === departmentFilter
    const matchesDate = dateFilter === '' || report.submittedDate === dateFilter
    return matchesSearch && matchesStatus && matchesDepartment && matchesDate
  })
  // Get unique departments and dates for filters
  const uniqueDepartments = [
    ...new Set(reports.map((report) => report.department)),
  ]
  const uniqueDates = [
    ...new Set(reports.map((report) => report.submittedDate)),
  ]
  const handleDownload = (reportId) => {
    const report = reports.find((r) => r.id === reportId)
    if (report) {
      alert(`Downloading ${report.fileName}...`)
    }
  }
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-medium text-gray-900">Report Management</h2>
        <p className="mt-1 text-sm text-gray-500">
          Browse and download all reports submitted by staff members.
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
                placeholder="Search reports..."
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
              <option value="review">Review</option>
              <option value="rejected">Rejected</option>
              <option value="admin_review">Admin Review</option>
              <option value="approved">Approved</option>
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
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => {
                setSearchTerm('')
                setStatusFilter('')
                setDepartmentFilter('')
                setDateFilter('')
              }}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <Filter size={16} className="mr-2 text-gray-500" />
              Clear Filters
            </button>
          </div>
        </div>
      </div>
      {/* Reports table */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Report
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Submitted By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Date
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
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <FileText size={20} className="mr-3 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900">
                            {report.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {report.fileName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <User size={16} className="mr-2 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {report.submittedBy}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <Tag size={16} className="mr-2 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {report.department}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          {report.submittedDate}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${report.status === 'approved' ? 'bg-green-100 text-green-800' : report.status === 'rejected' ? 'bg-red-100 text-red-800' : report.status === 'admin_review' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}
                      >
                        {report.status === 'admin_review'
                          ? 'Admin Review'
                          : report.status.charAt(0).toUpperCase() +
                            report.status.slice(1)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      <button
                        onClick={() => handleDownload(report.id)}
                        className="inline-flex items-center rounded-md bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-200"
                      >
                        <Download size={16} className="mr-1" />
                        Download
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
                    No reports found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Department statistics */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="text-lg font-medium text-gray-900">
          Department Report Statistics
        </h3>
        <div className="mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {uniqueDepartments.map((department) => {
              const departmentReports = reports.filter(
                (r) => r.department === department,
              )
              return (
                <div
                  key={department}
                  className="overflow-hidden rounded-md bg-gray-50 p-4"
                >
                  <h4 className="font-medium text-gray-900">{department}</h4>
                  <p className="text-sm text-gray-500">
                    {departmentReports.length} reports
                  </p>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-2 bg-blue-500"
                      style={{
                        width: `${(departmentReports.length / reports.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ReportManagement
