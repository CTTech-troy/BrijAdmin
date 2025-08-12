import React, { useState } from 'react'
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Filter,
  Users,
} from 'lucide-react'
// Mock data for department absences
const mockDepartmentAbsences = [
  {
    department: 'Marketing',
    employeeCount: 8,
    absentToday: 1,
    totalAbsenceRequests: 5,
    absentEmployees: [
      {
        name: 'John Doe',
        reason: 'Sick Leave',
        startDate: '2023-04-20',
        endDate: '2023-04-20',
      },
    ],
  },
  {
    department: 'Sales',
    employeeCount: 12,
    absentToday: 2,
    totalAbsenceRequests: 8,
    absentEmployees: [
      {
        name: 'Jane Smith',
        reason: 'Vacation',
        startDate: '2023-04-18',
        endDate: '2023-04-22',
      },
      {
        name: 'Mike Johnson',
        reason: 'Doctor Appointment',
        startDate: '2023-04-20',
        endDate: '2023-04-20',
      },
    ],
  },
  {
    department: 'Development',
    employeeCount: 15,
    absentToday: 1,
    totalAbsenceRequests: 10,
    absentEmployees: [
      {
        name: 'Alex Johnson',
        reason: 'Personal Leave',
        startDate: '2023-04-19',
        endDate: '2023-04-21',
      },
    ],
  },
  {
    department: 'HR',
    employeeCount: 5,
    absentToday: 0,
    totalAbsenceRequests: 3,
    absentEmployees: [],
  },
  {
    department: 'Finance',
    employeeCount: 7,
    absentToday: 1,
    totalAbsenceRequests: 4,
    absentEmployees: [
      {
        name: 'Michael Brown',
        reason: 'Family Emergency',
        startDate: '2023-04-20',
        endDate: '2023-04-22',
      },
    ],
  },
]
// Mock data for upcoming absences
const mockUpcomingAbsences = [
  {
    id: '1',
    employeeName: 'John Doe',
    department: 'Marketing',
    startDate: '2023-05-01',
    endDate: '2023-05-05',
    reason: 'Vacation',
    status: 'approved',
  },
  {
    id: '2',
    employeeName: 'Jane Smith',
    department: 'Sales',
    startDate: '2023-05-03',
    endDate: '2023-05-03',
    reason: 'Doctor Appointment',
    status: 'approved',
  },
  {
    id: '3',
    employeeName: 'Alex Johnson',
    department: 'Development',
    startDate: '2023-05-10',
    endDate: '2023-05-15',
    reason: 'Vacation',
    status: 'approved',
  },
  {
    id: '4',
    employeeName: 'Sarah Williams',
    department: 'HR',
    startDate: '2023-05-08',
    endDate: '2023-05-09',
    reason: 'Personal Leave',
    status: 'approved',
  },
]
const AbsenceOverview = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [departmentFilter, setDepartmentFilter] = useState('')
  // Helper to get month name
  const getMonthName = (date ) => {
    return date.toLocaleString('default', {
      month: 'long',
    })
  }
  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    )
  }
  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    )
  }
  // Filter departments based on the selected filter
  const filteredDepartments = departmentFilter
    ? mockDepartmentAbsences.filter(
        (dept) => dept.department === departmentFilter,
      )
    : mockDepartmentAbsences
  // Get unique departments for filter
  const uniqueDepartments = [
    ...new Set(mockDepartmentAbsences.map((dept) => dept.department)),
  ]
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-medium text-gray-900">Absence Overview</h2>
        <p className="mt-1 text-sm text-gray-500">
          Monitor and manage absence requests across all departments.
        </p>
      </div>
      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Total Employees
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {mockDepartmentAbsences.reduce(
                      (total, dept) => total + dept.employeeCount,
                      0,
                    )}
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
                <Calendar className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Absent Today
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {mockDepartmentAbsences.reduce(
                      (total, dept) => total + dept.absentToday,
                      0,
                    )}
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
                <Calendar className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Total Absence Requests
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {mockDepartmentAbsences.reduce(
                      (total, dept) => total + dept.totalAbsenceRequests,
                      0,
                    )}
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
                <Calendar className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">
                    Absence Rate
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {Math.round(
                      (mockDepartmentAbsences.reduce(
                        (total, dept) => total + dept.absentToday,
                        0,
                      ) /
                        mockDepartmentAbsences.reduce(
                          (total, dept) => total + dept.employeeCount,
                          0,
                        )) *
                        100,
                    )}
                    %
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Department filters */}
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            Department Absence Breakdown
          </h3>
          <div className="flex items-center">
            <label
              htmlFor="department-filter"
              className="mr-2 text-sm font-medium text-gray-700"
            >
              Filter by Department:
            </label>
            <select
              id="department-filter"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="rounded-md border border-gray-300 py-1 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            >
              <option value="">All Departments</option>
              {uniqueDepartments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Department cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDepartments.map((dept) => (
          <div key={dept.department} className="rounded-lg bg-white p-6 shadow">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                {dept.department}
              </h3>
              <span
                className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${dept.absentToday > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}
              >
                {dept.absentToday} Absent Today
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Total Employees</p>
                <p className="text-lg font-medium text-gray-900">
                  {dept.employeeCount}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Absences</p>
                <p className="text-lg font-medium text-gray-900">
                  {dept.totalAbsenceRequests}
                </p>
              </div>
            </div>
            {dept.absentEmployees.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700">
                  Currently Absent
                </h4>
                <ul className="mt-2 space-y-2">
                  {dept.absentEmployees.map((employee, index) => (
                    <li
                      key={index}
                      className="rounded-md bg-gray-50 p-2 text-sm"
                    >
                      <div className="font-medium text-gray-900">
                        {employee.name}
                      </div>
                      <div className="text-gray-500">{employee.reason}</div>
                      <div className="text-xs text-gray-500">
                        {employee.startDate === employee.endDate
                          ? employee.startDate
                          : `${employee.startDate} - ${employee.endDate}`}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Calendar view */}
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">
            {getMonthName(currentMonth)} {currentMonth.getFullYear()} Upcoming
            Absences
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={prevMonth}
              className="rounded-md border border-gray-300 bg-white p-2 text-gray-500 hover:bg-gray-50"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={nextMonth}
              className="rounded-md border border-gray-300 bg-white p-2 text-gray-500 hover:bg-gray-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        {/* Upcoming absences table */}
        <div className="overflow-hidden rounded-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Date Range
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {mockUpcomingAbsences.map((absence) => (
                <tr key={absence.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    {absence.employeeName}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {absence.department}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {absence.startDate === absence.endDate
                      ? absence.startDate
                      : `${absence.startDate} - ${absence.endDate}`}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {absence.reason}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${absence.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                    >
                      {absence.status.charAt(0).toUpperCase() +
                        absence.status.slice(1)}
                    </span>
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
export default AbsenceOverview
