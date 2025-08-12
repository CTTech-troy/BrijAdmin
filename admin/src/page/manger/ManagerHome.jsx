import React from 'react'
import { Link } from 'react-router-dom'
import {
  CheckSquare,
  Calendar,
  Users,
  BarChart,
  ChevronRight,
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
const ManagerHome = () => {
  const { user } = useAuth()
  // Mock data for dashboard stats
  const stats = [
    {
      name: 'Reports Pending Review',
      value: 4,
      change: '+2',
      changeType: 'increase',
    },
    {
      name: 'Team Absence Requests',
      value: 3,
      change: '0',
      changeType: 'neutral',
    },
    {
      name: 'Team Members',
      value: 8,
      change: '+1',
      changeType: 'increase',
    },
    {
      name: 'Reports This Month',
      value: 12,
      change: '+5',
      changeType: 'increase',
    },
  ]
  // Mock data for recent activity
  const recentActivity = [
    {
      id: '1',
      type: 'report_review',
      user: 'John Doe',
      action: 'approved report',
      time: '2 hours ago',
    },
    {
      id: '2',
      type: 'absence_approved',
      user: 'Jane Smith',
      action: 'submitted absence request',
      time: '5 hours ago',
    },
    {
      id: '3',
      type: 'report_rejected',
      user: 'Alex Johnson',
      action: 'needs to update report',
      time: '1 day ago',
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
          This is your manager dashboard where you can review reports, approve
          absences, and monitor team performance.
        </p>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="overflow-hidden rounded-lg bg-white shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {stat.name.includes('Reports') ? (
                    <CheckSquare className="h-6 w-6 text-gray-400" />
                  ) : stat.name.includes('Absence') ? (
                    <Calendar className="h-6 w-6 text-gray-400" />
                  ) : stat.name.includes('Members') ? (
                    <Users className="h-6 w-6 text-gray-400" />
                  ) : (
                    <BarChart className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">
                      {stat.name}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {stat.value}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div
              className={`bg-gray-50 px-5 py-3 ${stat.changeType === 'increase' ? 'text-green-600' : stat.changeType === 'decrease' ? 'text-red-600' : 'text-gray-500'}`}
            >
              <div className="text-sm">
                {stat.change === '+0' || stat.change === '0'
                  ? 'No change from yesterday'
                  : `${stat.change} from yesterday`}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Quick actions */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/manager/report-review"
          className="flex items-center rounded-lg bg-white p-6 shadow transition hover:bg-gray-50"
        >
          <div className="mr-4 rounded-full bg-blue-100 p-3">
            <CheckSquare size={24} className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Review Reports</h3>
            <p className="text-sm text-gray-500">
              Review and process submitted reports
            </p>
          </div>
          <ChevronRight size={20} className="ml-auto text-gray-400" />
        </Link>
        <Link
          to="/manager/absence-review"
          className="flex items-center rounded-lg bg-white p-6 shadow transition hover:bg-gray-50"
        >
          <div className="mr-4 rounded-full bg-green-100 p-3">
            <Calendar size={24} className="text-green-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Review Absences</h3>
            <p className="text-sm text-gray-500">View team absence requests</p>
          </div>
          <ChevronRight size={20} className="ml-auto text-gray-400" />
        </Link>
        <Link
          to="/manager/report-analytics"
          className="flex items-center rounded-lg bg-white p-6 shadow transition hover:bg-gray-50"
        >
          <div className="mr-4 rounded-full bg-purple-100 p-3">
            <BarChart size={24} className="text-purple-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Report Analytics</h3>
            <p className="text-sm text-gray-500">
              View report statistics and trends
            </p>
          </div>
          <ChevronRight size={20} className="ml-auto text-gray-400" />
        </Link>
      </div>
      {/* Recent activity */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        <div className="mt-6 flow-root">
          <ul className="-mb-8">
            {recentActivity.map((activity, activityIdx) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {activityIdx !== recentActivity.length - 1 ? (
                    <span
                      className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${activity.type.includes('approved') ? 'bg-green-100' : activity.type.includes('rejected') ? 'bg-red-100' : 'bg-blue-100'}`}
                      >
                        {activity.type.includes('report') ? (
                          <CheckSquare
                            size={16}
                            className={`${activity.type.includes('approved') ? 'text-green-600' : activity.type.includes('rejected') ? 'text-red-600' : 'text-blue-600'}`}
                          />
                        ) : (
                          <Calendar
                            size={16}
                            className={`${activity.type.includes('approved') ? 'text-green-600' : activity.type.includes('rejected') ? 'text-red-600' : 'text-blue-600'}`}
                          />
                        )}
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-500">
                          <span className="font-medium text-gray-900">
                            {activity.user}
                          </span>{' '}
                          {activity.action}
                        </p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500">
                        {activity.time}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
export default ManagerHome
