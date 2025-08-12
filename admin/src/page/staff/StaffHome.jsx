import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, Calendar, Bell, ChevronRight } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useNotifications } from '../../contexts/NotificationContext'
import StatusBadge from '../../components/StatusBadge'
const StaffHome = () => {
  const { user } = useAuth()
  const { unreadCount } = useNotifications()
  // Mock recent reports data
  const recentReports = [
    {
      id: '1',
      title: 'Q1 Performance Report',
      status: 'review',
      date: '2023-04-15',
    },
    {
      id: '2',
      title: 'Customer Satisfaction Survey',
      status: 'rejected',
      date: '2023-04-10',
    },
    {
      id: '3',
      title: 'Weekly Progress Report',
      status: 'approved',
      date: '2023-04-05',
    },
  ]
  // Mock recent absences
  const recentAbsences = [
    {
      id: '1',
      reason: 'Doctor Appointment',
      date: '2023-04-20',
      status: 'approved',
    },
    {
      id: '2',
      reason: 'Family Emergency',
      date: '2023-04-12',
      status: 'approved',
    },
  ]
  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome back, {user?.name}
        </h2>
        <p className="mt-2 text-gray-600">
          This is your staff dashboard where you can upload reports, submit
          absence requests, and track your submissions.
        </p>
      </div>
      {/* Quick actions */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/staff/upload-report"
          className="flex items-center rounded-lg bg-white p-6 shadow transition hover:bg-gray-50"
        >
          <div className="mr-4 rounded-full bg-blue-100 p-3">
            <FileText size={24} className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Upload Report</h3>
            <p className="text-sm text-gray-500">
              Submit a new report for review
            </p>
          </div>
          <ChevronRight size={20} className="ml-auto text-gray-400" />
        </Link>
        <Link
          to="/staff/absence"
          className="flex items-center rounded-lg bg-white p-6 shadow transition hover:bg-gray-50"
        >
          <div className="mr-4 rounded-full bg-green-100 p-3">
            <Calendar size={24} className="text-green-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Submit Absence</h3>
            <p className="text-sm text-gray-500">
              Request time off or report absence
            </p>
          </div>
          <ChevronRight size={20} className="ml-auto text-gray-400" />
        </Link>
        <Link
          to="/staff/notifications"
          className="flex items-center rounded-lg bg-white p-6 shadow transition hover:bg-gray-50"
        >
          <div className="mr-4 rounded-full bg-red-100 p-3">
            <Bell size={24} className="text-red-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Notifications</h3>
            <p className="text-sm text-gray-500">
              {unreadCount} unread notifications
            </p>
          </div>
          <ChevronRight size={20} className="ml-auto text-gray-400" />
        </Link>
      </div>
      {/* Recent reports */}
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-800">Recent Reports</h3>
          <Link
            to="/staff/my-reports"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            View all
          </Link>
        </div>
        {recentReports.length > 0 ? (
          <div className="overflow-hidden rounded-md border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {recentReports.map((report) => (
                  <tr key={report.id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {report.title}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-500">{report.date}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <StatusBadge status={report.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No reports submitted yet</p>
        )}
      </div>
      {/* Recent absences */}
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-800">Recent Absences</h3>
          <Link
            to="/staff/my-absences"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            View all
          </Link>
        </div>
        {recentAbsences.length > 0 ? (
          <div className="overflow-hidden rounded-md border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Reason
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {recentAbsences.map((absence) => (
                  <tr key={absence.id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {absence.reason}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {absence.date}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <StatusBadge status={absence.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No absences submitted yet</p>
        )}
      </div>
    </div>
  )
}
export default StaffHome
