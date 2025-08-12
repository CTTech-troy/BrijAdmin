import React, { useState } from 'react'
import StatusBadge from '../../components/StatusBadge'
import {
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  Archive,
} from 'lucide-react'
import { useNotifications } from '../../contexts/NotificationContext'
// Mock data for reports to approve
const mockReports = [
  {
    id: '1',
    title: 'Q1 Performance Report',
    submittedBy: 'John Doe',
    managerName: 'Jane Manager',
    submittedDate: '2023-04-15',
    managerApprovalDate: '2023-04-16',
  status: 'admin_review',
    fileName: 'q1_performance.pdf',
    aiAnalysis: {
      errorCount: 0,
      warningCount: 1,
      recommendation:
        'Minor formatting issue detected, but content is high quality. Approval recommended.',
    },
  },
  {
    id: '2',
    title: 'Customer Satisfaction Survey',
    submittedBy: 'Sarah Williams',
    managerName: 'Jane Manager',
    submittedDate: '2023-04-14',
    managerApprovalDate: '2023-04-15',
  status: 'admin_review',
    fileName: 'customer_satisfaction.pdf',
    aiAnalysis: {
      errorCount: 0,
      warningCount: 0,
      recommendation:
        'No issues detected. High quality report. Approval recommended.',
    },
  },
  {
    id: '3',
    title: 'Project Proposal',
    submittedBy: 'Alex Johnson',
    managerName: 'Michael Manager',
    submittedDate: '2023-04-13',
    managerApprovalDate: '2023-04-14',
  status: 'admin_review',
    fileName: 'project_proposal.pdf',
    aiAnalysis: {
      errorCount: 2,
      warningCount: 3,
      recommendation:
        'Multiple issues detected. Recommend rejection or backup for further review.',
    },
  },
]
const FinalApproval = () => {
  const [reports, setReports] = useState(mockReports)
  const [selectedReport, setSelectedReport] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [showRejectModal, setShowRejectModal] = useState(false)
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
              status: 'approved',
            }
          : report,
      ),
    )
    // Add notification
    addNotification(
      'success',
      `Report "${selectedReport.title}" has been approved`,
    )
    // Reset selection
    setSelectedReport(null)
    setFeedback('')
  }
  const handleBackup = () => {
    if (!selectedReport) return
    // Update report status
    setReports((prev) =>
      prev.map((report) =>
        report.id === selectedReport.id
          ? {
              ...report,
              status: 'backup',
            }
          : report,
      ),
    )
    // Add notification
    addNotification(
      'info',
      `Report "${selectedReport.title}" has been backed up for further review`,
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
      'error',
      `Report "${selectedReport.title}" has been rejected`,
    )
    // Close modal and reset selection
    setShowRejectModal(false)
    setSelectedReport(null)
    setFeedback('')
  }
  const pendingReports = reports.filter(
    (report) => report.status === 'admin_review',
  )
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-medium text-gray-900">
          Final Report Approval
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Review and provide final approval for reports that have been approved
          by managers. AI analysis is provided to help with your decision.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Reports list */}
        <div className="lg:col-span-1">
          <div className="rounded-lg bg-white shadow">
            <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Pending Final Approval ({pendingReports.length})
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
                          Approved by {report.managerName}
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
                  No reports pending final approval
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
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Manager approval by {selectedReport.managerName} on{' '}
                  {selectedReport.managerApprovalDate}
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
                        Final AI Verification
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
                            AI Recommendation:{' '}
                            {selectedReport.aiAnalysis.recommendation}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Action buttons */}
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowRejectModal(true)}
                    className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    <XCircle className="-ml-1 mr-2 h-5 w-5" />
                    Reject
                  </button>
                  <button
                    type="button"
                    onClick={handleBackup}
                    className="inline-flex items-center rounded-md border border-transparent bg-yellow-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                  >
                    <Archive className="-ml-1 mr-2 h-5 w-5" />
                    Backup
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
                  Select a report from the list for final review
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Reject modal */}
      {showRejectModal && selectedReport && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <XCircle
                    className="h-6 w-6 text-red-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Reject Report
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to reject "{selectedReport.title}"?
                      This will reset the report status to "Rejected" and send
                      notifications to the staff member and their manager.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <label
                  htmlFor="feedback"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rejection Feedback (Required)
                </label>
                <textarea
                  id="feedback"
                  rows={3}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                  placeholder="Provide detailed feedback about why this report is being rejected"
                  required
                />
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  onClick={handleReject}
                  disabled={!feedback.trim()}
                  className={`inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm ${feedback.trim() ? 'bg-red-600 hover:bg-red-700' : 'bg-red-300 cursor-not-allowed'}`}
                >
                  Reject Report
                </button>
                <button
                  type="button"
                  onClick={() => setShowRejectModal(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default FinalApproval
