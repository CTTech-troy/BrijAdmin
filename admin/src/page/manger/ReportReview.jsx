import React, { useState } from 'react'
import StatusBadge from '../../components/StatusBadge'
import { FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { useNotifications } from '../../contexts/NotificationContext'
// Mock data for reports to review
const mockReports = [
  {
    id: '1',
    title: 'Q1 Performance Report',
    submittedBy: 'John Doe',
    submittedDate: '2023-04-15',
  status: 'review',
    fileName: 'q1_performance.pdf',
    aiAnalysis: {
      errorCount: 2,
      warningCount: 3,
      recommendation: 'Minor issues detected, review recommended',
    },
  },
  {
    id: '2',
    title: 'Customer Satisfaction Survey',
    submittedBy: 'Jane Smith',
    submittedDate: '2023-04-14',
  status: 'review',
    fileName: 'customer_satisfaction.pdf',
    aiAnalysis: {
      errorCount: 8,
      warningCount: 5,
      recommendation: 'Multiple errors detected, rejection recommended',
    },
  },
  {
    id: '3',
    title: 'Project Proposal',
    submittedBy: 'Alex Johnson',
    submittedDate: '2023-04-13',
  status: 'review',
    fileName: 'project_proposal.pdf',
    aiAnalysis: {
      errorCount: 0,
      warningCount: 1,
      recommendation: 'No significant issues found, approval recommended',
    },
  },
]
const ReportReview = () => {
  const [reports, setReports] = useState(mockReports)
  const [selectedReport, setSelectedReport] = useState(null)
  const [feedback, setFeedback] = useState('')
  const { addNotification } = useNotifications()
  const handleSelectReport = (report) => {
    setSelectedReport(report)
    setFeedback('')
  }
  const handleApprove = () => {
    if (!selectedReport) return
    // Update report status
    setReports((prev) =>
      prev.map((report) =>
        report.id === selectedReport.id
          ? {
              ...report,
              status: 'admin_review',
            }
          : report,
      ),
    )
    // Add notification
    addNotification(
      'success',
      `Report "${selectedReport.title}" approved and sent for admin review`,
    )
    // Reset selection
    setSelectedReport(null)
    setFeedback('')
  }
  const handleReject = () => {
    if (!selectedReport || !feedback.trim()) return
    // Update report status
    setReports((prev) =>
      prev.map((report) =>
        report.id === selectedReport.id
          ? {
              ...report,
              status: 'rejected',
            }
          : report,
      ),
    )
    // Add notification
    addNotification(
      'info',
      `Report "${selectedReport.title}" rejected with feedback`,
    )
    // Reset selection
    setSelectedReport(null)
    setFeedback('')
  }
  const pendingReports = reports.filter((report) => report.status === 'review')
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-medium text-gray-900">Report Review</h2>
        <p className="mt-1 text-sm text-gray-500">
          Review and approve or reject submitted reports. AI analysis is
          provided to help with your decision.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Reports list */}
        <div className="lg:col-span-1">
          <div className="rounded-lg bg-white shadow">
            <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Pending Reports ({pendingReports.length})
              </h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {pendingReports.length > 0 ? (
                pendingReports.map((report) => (
                  <li
                    key={report.id}
                    className={`cursor-pointer p-4 hover:bg-gray-50 ${selectedReport?.id === report.id ? 'bg-blue-50' : ''}`}
                    onClick={() => handleSelectReport(report)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <FileText size={24} className="text-gray-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {report.title}
                        </p>
                        <p className="truncate text-sm text-gray-500">
                          By {report.submittedBy}
                        </p>
                        <p className="text-xs text-gray-500">
                          {report.submittedDate}
                        </p>
                      </div>
                      <div>
                        <StatusBadge status={report.status} />
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="p-4 text-center text-sm text-gray-500">
                  No reports pending review
                </li>
              )}
            </ul>
          </div>
        </div>
        {/* Report details and review */}
        <div className="lg:col-span-2">
          {selectedReport ? (
            <div className="rounded-lg bg-white shadow">
              <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {selectedReport.title}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Submitted by {selectedReport.submittedBy} on{' '}
                  {selectedReport.submittedDate}
                </p>
              </div>
              <div className="px-4 py-5 sm:px-6">
                {/* PDF preview placeholder */}
                <div className="mb-6 flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
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
                {/* AI Analysis */}
                <div className="mb-6 rounded-md bg-blue-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle
                        className="h-5 w-5 text-blue-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <h3 className="text-sm font-medium text-blue-800">
                        AI Analysis
                      </h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <ul className="list-disc space-y-1 pl-5">
                          <li>
                            Errors detected:{' '}
                            {selectedReport.aiAnalysis.errorCount}
                          </li>
                          <li>
                            Warnings detected:{' '}
                            {selectedReport.aiAnalysis.warningCount}
                          </li>
                          <li>
                            Recommendation:{' '}
                            {selectedReport.aiAnalysis.recommendation}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Feedback form */}
                <div className="mb-6">
                  <label
                    htmlFor="feedback"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Feedback (required for rejection)
                  </label>
                  <textarea
                    id="feedback"
                    rows={3}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter feedback for the report submitter"
                  />
                </div>
                {/* Action buttons */}
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleReject}
                    disabled={!feedback.trim()}
                    className={`inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${feedback.trim() ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-red-300 cursor-not-allowed'}`}
                  >
                    <XCircle className="-ml-1 mr-2 h-5 w-5" />
                    Reject
                  </button>
                  <button
                    type="button"
                    onClick={handleApprove}
                    className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    <CheckCircle className="-ml-1 mr-2 h-5 w-5" />
                    Approve
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg bg-white p-6 shadow">
              <div className="text-center">
                <FileText size={48} className="mx-auto text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No Report Selected
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Select a report from the list to review
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default ReportReview
