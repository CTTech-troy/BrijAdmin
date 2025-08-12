import React, { useState } from 'react'
import StatusBadge from '../../components/StatusBadge'
import { FileText, Download, RefreshCw } from 'lucide-react'
// Mock data for reports
const mockReports = [
  {
    id: '1',
    title: 'Q1 Performance Report',
    submittedDate: '2023-04-15',
    status: 'review',
    fileName: 'q1_performance.pdf',
  },
  {
    id: '2',
    title: 'Customer Satisfaction Survey',
    submittedDate: '2023-04-10',
    status: 'rejected',
    fileName: 'customer_satisfaction.pdf',
    feedback: 'Please include more detailed analysis of customer feedback.',
  },
  {
    id: '3',
    title: 'Weekly Progress Report',
    submittedDate: '2023-04-05',
    status: 'approved',
    fileName: 'weekly_progress.pdf',
  },
  {
    id: '4',
    title: 'Project Proposal',
    submittedDate: '2023-03-28',
    status: 'admin_review',
    fileName: 'project_proposal.pdf',
  },
]
const MyReports = () => {
  const [reports] = useState(mockReports)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  // Filter reports based on search term and status
  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === '' || report.status === statusFilter
    return matchesSearch && matchesStatus
  })
  const handleResubmit = (id) => {
    // In a real app, this would open a form to upload a new version
    alert(`Resubmit report ${id}`)
  }
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-medium text-gray-900">My Reports</h2>
        <p className="mt-1 text-sm text-gray-500">
          View and manage all your submitted reports and their current status.
        </p>
        {/* Search and filter */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="search" className="sr-only">
              Search Reports
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="status-filter" className="sr-only">
              Filter by Status
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">All Statuses</option>
              <option value="review">Review</option>
              <option value="rejected">Rejected</option>
              <option value="admin_review">Admin Review</option>
              <option value="approved">Approved</option>
            </select>
          </div>
        </div>
      </div>
      {/* Reports list */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Report Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Submitted Date
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
                  <tr key={report.id}>
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
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {report.submittedDate}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <StatusBadge status={report.status} />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <div className="flex space-x-2">
                        <button
                          className="rounded-md bg-gray-100 p-1 text-gray-700 hover:bg-gray-200"
                          title="Download Report"
                        >
                          <Download size={18} />
                        </button>
                        {report.status === 'rejected' && (
                          <button
                            onClick={() => handleResubmit(report.id)}
                            className="rounded-md bg-blue-100 p-1 text-blue-700 hover:bg-blue-200"
                            title="Resubmit Report"
                          >
                            <RefreshCw size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
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
      {/* Rejected reports with feedback */}
      {reports.some(
        (report) => report.status === 'rejected' && report.feedback,
      ) && (
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium text-gray-900">
            Feedback on Rejected Reports
          </h3>
          <div className="mt-4 space-y-4">
            {reports
              .filter(
                (report) => report.status === 'rejected' && report.feedback,
              )
              .map((report) => (
                <div
                  key={report.id}
                  className="rounded-md border border-red-100 bg-red-50 p-4"
                >
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">
                        {report.title}
                      </h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>{report.feedback}</p>
                      </div>
                      <div className="mt-4">
                        <div className="-mx-2 -my-1.5 flex">
                          <button
                            onClick={() => handleResubmit(report.id)}
                            className="rounded-md bg-red-50 px-2 py-1.5 text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                          >
                            Resubmit Report
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
export default MyReports
