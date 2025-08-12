import React from 'react'
import { Link } from 'react-router-dom'
import {
  CheckSquare,
  AlertTriangle,
  Users,
  UserCog,
  Download,
  Calendar,
  ChevronRight,
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
const AdminHome = () => {
  const { user } = useAuth()
  // Mock data for dashboard stats
  const stats = [
    {
      name: 'Reports Pending Approval',
      value: 8,
      change: '+3',
      changeType: 'increase',
    },
    {
      name: 'Company Complaints',
      value: 5,
      change: '-2',
      changeType: 'decrease',
    },
    {
      name: 'Active Users',
      value: 24,
      change: '+1',
      changeType: 'increase',
    },
    {
      name: 'Absence Requests',
      value: 12,
      change: '+4',
      changeType: 'increase',
    },
  ]
  // Mock data for recent activity
  const recentActivity = [
    {
      id: '1',
      type: 'report_approved',
      user: 'Admin',
      action: 'approved Q1 Performance Report',
      time: '1 hour ago',
    },
    {
      id: '2',
      type: 'role_changed',
      user: 'Admin',
      action: "changed Jane Smith's role to Manager",
      time: '3 hours ago',
    },
    {
      id: '3',
      type: 'complaint_resolved',
      user: 'Admin',
      action: 'resolved a company complaint',
      time: '1 day ago',
    },
    {
      id: '4',
      type: 'user_login',
      user: 'John Doe',
      action: 'logged in from a new location',
      time: '2 days ago',
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
          This is your admin dashboard where you can manage the entire platform,
          approve reports, handle complaints, and manage user roles.
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
                  ) : stat.name.includes('Complaints') ? (
                    <AlertTriangle className="h-6 w-6 text-gray-400" />
                  ) : stat.name.includes('Users') ? (
                    <Users className="h-6 w-6 text-gray-400" />
                  ) : (
                    <Calendar className="h-6 w-6 text-gray-400" />
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
              className={`bg-gray-50 px-5 py-3 ${stat.changeType === 'increase' ? (stat.name.includes('Complaints') ? 'text-red-600' : 'text-green-600') : stat.changeType === 'decrease' ? (stat.name.includes('Complaints') ? 'text-green-600' : 'text-red-600') : 'text-gray-500'}`}
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
          to="/admin/final-approval"
          className="flex items-center rounded-lg bg-white p-6 shadow transition hover:bg-gray-50"
        >
          <div className="mr-4 rounded-full bg-blue-100 p-3">
            <CheckSquare size={24} className="text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Final Approval</h3>
            <p className="text-sm text-gray-500">Review and approve reports</p>
          </div>
          <ChevronRight size={20} className="ml-auto text-gray-400" />
        </Link>
        <Link
          to="/admin/complaints"
          className="flex items-center rounded-lg bg-white p-6 shadow transition hover:bg-gray-50"
        >
          <div className="mr-4 rounded-full bg-red-100 p-3">
            <AlertTriangle size={24} className="text-red-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Company Complaints</h3>
            <p className="text-sm text-gray-500">
              Manage and resolve complaints
            </p>
          </div>
          <ChevronRight size={20} className="ml-auto text-gray-400" />
        </Link>
        <Link
          to="/admin/role-management"
          className="flex items-center rounded-lg bg-white p-6 shadow transition hover:bg-gray-50"
        >
          <div className="mr-4 rounded-full bg-purple-100 p-3">
            <UserCog size={24} className="text-purple-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Role Management</h3>
            <p className="text-sm text-gray-500">
              Manage user roles and permissions
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
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${activity.type.includes('approved') ? 'bg-green-100' : activity.type.includes('complaint') ? 'bg-red-100' : activity.type.includes('role') ? 'bg-purple-100' : 'bg-blue-100'}`}
                      >
                        {activity.type.includes('report') ? (
                          <CheckSquare
                            size={16}
                            className={`${activity.type.includes('approved') ? 'text-green-600' : 'text-blue-600'}`}
                          />
                        ) : activity.type.includes('complaint') ? (
                          <AlertTriangle size={16} className="text-red-600" />
                        ) : activity.type.includes('role') ? (
                          <UserCog size={16} className="text-purple-600" />
                        ) : (
                          <Users size={16} className="text-blue-600" />
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
      {/* System status */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="text-lg font-medium text-gray-900">System Status</h3>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="overflow-hidden rounded-lg bg-green-50 px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-green-500">
              AI Model Status
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-green-900">
              Operational
            </dd>
            <dd className="mt-2 text-sm text-green-600">
              All AI services are running normally
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-green-50 px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-green-500">
              Database Status
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-green-900">
              Healthy
            </dd>
            <dd className="mt-2 text-sm text-green-600">
              Last backup: Today at 02:00 AM
            </dd>
          </div>
          <div className="overflow-hidden rounded-lg bg-green-50 px-4 py-5 shadow sm:p-6">
            <dt className="truncate text-sm font-medium text-green-500">
              API Status
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-green-900">
              100%
            </dd>
            <dd className="mt-2 text-sm text-green-600">
              All endpoints responding normally
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
export default AdminHome
