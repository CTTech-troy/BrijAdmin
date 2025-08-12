import React, { useState } from 'react'
import {
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  TrendingUp,
  Filter,
  FileText,
  ChevronRight,
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react'
// Mock data for individual reports
const mockReportDetails = [
  {
    id: '1',
    title: 'Q1 Performance Report',
    submittedBy: 'John Doe',
    submittedDate: '2023-04-05',
    reviewDate: '2023-04-06',
    status: 'approved',
    processingTime: '1 day',
    fileName: 'q1_performance.pdf',
    pageCount: 12,
    fileSize: '2.4 MB',
    aiAnalysis: {
      errorCount: 0,
      warningCount: 1,
      recommendation: 'Approved with minor suggestions',
      contentQuality: 95,
      formatConsistency: 92,
      dataAccuracy: 98,
    },
    reviewHistory: [
      {
        action: 'Submitted',
        date: '2023-04-05',
        user: 'John Doe',
      },
      {
        action: 'AI Review',
        date: '2023-04-05',
        user: 'System',
      },
      {
        action: 'Manager Approval',
        date: '2023-04-06',
        user: 'Jane Manager',
      },
      {
        action: 'Admin Approval',
        date: '2023-04-07',
        user: 'Admin User',
      },
    ],
  },
  {
    id: '2',
    title: 'Customer Satisfaction Survey',
    submittedBy: 'Jane Smith',
    submittedDate: '2023-04-08',
    reviewDate: '2023-04-10',
    status: 'approved',
    processingTime: '2 days',
    fileName: 'customer_satisfaction.pdf',
    pageCount: 8,
    fileSize: '1.8 MB',
    aiAnalysis: {
      errorCount: 0,
      warningCount: 0,
      recommendation: 'Excellent report, approval recommended',
      contentQuality: 98,
      formatConsistency: 97,
      dataAccuracy: 99,
    },
    reviewHistory: [
      {
        action: 'Submitted',
        date: '2023-04-08',
        user: 'Jane Smith',
      },
      {
        action: 'AI Review',
        date: '2023-04-08',
        user: 'System',
      },
      {
        action: 'Manager Approval',
        date: '2023-04-10',
        user: 'Jane Manager',
      },
      {
        action: 'Admin Approval',
        date: '2023-04-11',
        user: 'Admin User',
      },
    ],
  },
  {
    id: '3',
    title: 'Project Proposal',
    submittedBy: 'Alex Johnson',
    submittedDate: '2023-04-12',
    reviewDate: '2023-04-13',
    status: 'rejected',
    processingTime: '1 day',
    fileName: 'project_proposal.pdf',
    pageCount: 15,
    fileSize: '3.2 MB',
    aiAnalysis: {
      errorCount: 8,
      warningCount: 5,
      recommendation: 'Multiple issues detected, rejection recommended',
      contentQuality: 65,
      formatConsistency: 70,
      dataAccuracy: 60,
    },
    reviewHistory: [
      {
        action: 'Submitted',
        date: '2023-04-12',
        user: 'Alex Johnson',
      },
      {
        action: 'AI Review',
        date: '2023-04-12',
        user: 'System',
      },
      {
        action: 'Manager Rejection',
        date: '2023-04-13',
        user: 'Jane Manager',
      },
    ],
  },
  {
    id: '4',
    title: 'Weekly Progress Report',
    submittedBy: 'Michael Brown',
    submittedDate: '2023-04-14',
    reviewDate: '2023-04-15',
    status: 'approved',
    processingTime: '1 day',
    fileName: 'weekly_progress.pdf',
    pageCount: 5,
    fileSize: '1.1 MB',
    aiAnalysis: {
      errorCount: 1,
      warningCount: 2,
      recommendation: 'Minor issues, but approval recommended',
      contentQuality: 88,
      formatConsistency: 85,
      dataAccuracy: 92,
    },
    reviewHistory: [
      {
        action: 'Submitted',
        date: '2023-04-14',
        user: 'Michael Brown',
      },
      {
        action: 'AI Review',
        date: '2023-04-14',
        user: 'System',
      },
      {
        action: 'Manager Approval',
        date: '2023-04-15',
        user: 'Jane Manager',
      },
      {
        action: 'Admin Approval',
        date: '2023-04-16',
        user: 'Admin User',
      },
    ],
  },
]
const ReportAnalytics = () => {
  const [timeRange, setTimeRange] = useState('month')
  const [selectedReport, setSelectedReport] = useState(null)
  // Mock data for charts
  const submissionData = [
    {
      week: 'Week 1',
      count: 5,
    },
    {
      week: 'Week 2',
      count: 8,
    },
    {
      week: 'Week 3',
      count: 12,
    },
    {
      week: 'Week 4',
      count: 10,
    },
  ]
  const statusData = [
    {
      name: 'Approved',
      value: 65,
      color: 'bg-green-500',
    },
    {
      name: 'Rejected',
      value: 15,
      color: 'bg-red-500',
    },
    {
      name: 'Review',
      value: 12,
      color: 'bg-blue-500',
    },
    {
      name: 'Admin Review',
      value: 8,
      color: 'bg-purple-500',
    },
  ]
  const employeeData = [
    {
      name: 'John Doe',
      count: 8,
    },
    {
      name: 'Jane Smith',
      count: 6,
    },
    {
      name: 'Alex Johnson',
      count: 5,
    },
    {
      name: 'Sarah Williams',
      count: 4,
    },
    {
      name: 'Michael Brown',
      count: 3,
    },
  ]
  const handleReportSelect = (report) => {
    setSelectedReport(report)
  }
  const handleBackToOverview = () => {
    setSelectedReport(null)
  }
  // If a report is selected, show detailed view
  if (selectedReport) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow">
          <div>
            <button
              onClick={handleBackToOverview}
              className="mb-2 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Overview
            </button>
            <h2 className="text-lg font-medium text-gray-900">
              Report Analysis: {selectedReport.title}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Detailed analytics for this specific report
            </p>
          </div>
        </div>

        {/* Report info */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="text-md font-medium text-gray-900">
              Report Details
            </h3>
            <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Submitted By
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {selectedReport.submittedBy}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Submission Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {selectedReport.submittedDate}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Review Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {selectedReport.reviewDate}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">
                  Processing Time
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {selectedReport.processingTime}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">File Name</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {selectedReport.fileName}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1">
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${selectedReport.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                  >
                    {selectedReport.status.charAt(0).toUpperCase() +
                      selectedReport.status.slice(1)}
                  </span>
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Pages</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {selectedReport.pageCount}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">File Size</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {selectedReport.fileSize}
                </dd>
              </div>
            </dl>
          </div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="text-md font-medium text-gray-900">AI Analysis</h3>
            <div className="mt-4 space-y-4">
              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle
                      className="h-5 w-5 text-blue-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">
                      AI Recommendation
                    </h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>{selectedReport.aiAnalysis.recommendation}</p>
                    </div>
                    <div className="mt-2">
                      <div className="-mx-2 -my-1.5 flex">
                        <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                          Errors: {selectedReport.aiAnalysis.errorCount}
                        </span>
                        <span className="ml-2 inline-flex items-center rounded-md bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                          Warnings: {selectedReport.aiAnalysis.warningCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">
                  Content Quality
                </h4>
                <div className="mt-2 flex items-center">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-2 bg-green-500"
                      style={{
                        width: `${selectedReport.aiAnalysis.contentQuality}%`,
                      }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {selectedReport.aiAnalysis.contentQuality}%
                  </span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">
                  Format Consistency
                </h4>
                <div className="mt-2 flex items-center">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-2 bg-blue-500"
                      style={{
                        width: `${selectedReport.aiAnalysis.formatConsistency}%`,
                      }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {selectedReport.aiAnalysis.formatConsistency}%
                  </span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700">
                  Data Accuracy
                </h4>
                <div className="mt-2 flex items-center">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-2 bg-purple-500"
                      style={{
                        width: `${selectedReport.aiAnalysis.dataAccuracy}%`,
                      }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {selectedReport.aiAnalysis.dataAccuracy}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PDF preview placeholder */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 text-md font-medium text-gray-900">
            Report Preview
          </h3>
          <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
            <div className="text-center">
              <FileText size={48} className="mx-auto text-gray-400" />
              <p className="mt-2 text-sm font-medium text-gray-900">
                {selectedReport.fileName}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                PDF preview would appear here
              </p>
            </div>
          </div>
        </div>

        {/* Review history timeline */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="mb-4 text-md font-medium text-gray-900">
            Review History
          </h3>
          <div className="flow-root">
            <ul className="-mb-8">
              {selectedReport.reviewHistory.map((event, eventIdx) => (
                <li key={eventIdx}>
                  <div className="relative pb-8">
                    {eventIdx !== selectedReport.reviewHistory.length - 1 ? (
                      <span
                        className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${event.action.includes('Submitted') ? 'bg-blue-100' : event.action.includes('AI') ? 'bg-purple-100' : event.action.includes('Approval') ? 'bg-green-100' : 'bg-red-100'}`}
                        >
                          {event.action.includes('Submitted') ? (
                            <FileText size={16} className="text-blue-600" />
                          ) : event.action.includes('AI') ? (
                            <AlertCircle
                              size={16}
                              className="text-purple-600"
                            />
                          ) : event.action.includes('Approval') ? (
                            <CheckCircle size={16} className="text-green-600" />
                          ) : (
                            <XCircle size={16} className="text-red-600" />
                          )}
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">
                            <span className="font-medium text-gray-900">
                              {event.action}
                            </span>{' '}
                            by {event.user}
                          </p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-gray-500">
                          {event.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end">
          <button
            onClick={handleBackToOverview}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            Back to Overview
          </button>
        </div>
      </div>
    )
  }
  // Otherwise show the overview analytics
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow">
        <div>
          <h2 className="text-lg font-medium text-gray-900">
            Report Analytics
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            View statistics and trends for report submissions and reviews. Click
            on a report to see detailed analytics.
          </p>
        </div>
        <div className="flex items-center">
          <Filter size={20} className="mr-2 text-gray-400" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BarChartIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Total Reports
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">35</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <span className="font-medium text-green-600">+12%</span>
              <span className="text-gray-500"> from last month</span>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Approval Rate
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">76%</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <span className="font-medium text-green-600">+5%</span>
              <span className="text-gray-500"> from last month</span>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <PieChartIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Rejection Rate
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">15%</dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <span className="font-medium text-red-600">+2%</span>
              <span className="text-gray-500"> from last month</span>
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
                    Avg. Processing Time
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    1.8 days
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <span className="font-medium text-green-600">-0.5 days</span>
              <span className="text-gray-500"> from last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports List */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="text-lg font-medium text-gray-900">Recent Reports</h3>
        <p className="mt-1 text-sm text-gray-500">
          Click on a report to view detailed analytics
        </p>
        <div className="mt-4 divide-y divide-gray-200">
          {mockReportDetails.map((report) => (
            <div
              key={report.id}
              className="flex cursor-pointer items-center justify-between py-4 hover:bg-gray-50"
              onClick={() => handleReportSelect(report)}
            >
              <div className="flex items-center">
                <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-md bg-gray-100">
                  <FileText size={24} className="text-gray-500" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    {report.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Submitted by {report.submittedBy} on {report.submittedDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <span
                  className={`mr-4 inline-flex rounded-full px-2 py-1 text-xs font-semibold ${report.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                >
                  {report.status.charAt(0).toUpperCase() +
                    report.status.slice(1)}
                </span>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Submission trend */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium text-gray-900">
            Submissions by Week
          </h3>
          <div className="mt-4 h-64">
            {/* Simple bar chart visualization */}
            <div className="flex h-48 items-end space-x-6">
              {submissionData.map((item, index) => (
                <div key={index} className="flex flex-1 flex-col items-center">
                  <div
                    className="w-full bg-blue-500"
                    style={{
                      height: `${(item.count / Math.max(...submissionData.map((d) => d.count))) * 100}%`,
                    }}
                  ></div>
                  <div className="mt-2 text-xs font-medium text-gray-600">
                    {item.week}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status distribution */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h3 className="text-lg font-medium text-gray-900">
            Report Status Distribution
          </h3>
          <div className="mt-4 space-y-4">
            {statusData.map((status, index) => (
              <div key={index}>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-600">
                    {status.name}
                  </span>
                  <span className="ml-auto text-sm font-medium text-gray-900">
                    {status.value}%
                  </span>
                </div>
                <div className="mt-1 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={`h-2 ${status.color}`}
                    style={{
                      width: `${status.value}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top submitters */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="text-lg font-medium text-gray-900">
          Top Report Submitters
        </h3>
        <div className="mt-4 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Reports Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Distribution
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {employeeData.map((employee, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    {employee.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {employee.count}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-2 bg-blue-500"
                          style={{
                            width: `${(employee.count / Math.max(...employeeData.map((d) => d.count))) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-500">
                        {Math.round(
                          (employee.count /
                            employeeData.reduce(
                              (acc, curr) => acc + curr.count,
                              0,
                            )) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default ReportAnalytics
