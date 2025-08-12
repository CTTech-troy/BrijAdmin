import React, { useState } from 'react'
import { Calendar, ChevronLeft, ChevronRight, User } from 'lucide-react'
// Mock data for team absences
const mockAbsences = [
  {
    id: '1',
    employeeName: 'John Doe',
    startDate: '2023-04-20',
    endDate: '2023-04-20',
    reason: 'Doctor Appointment',
    status: 'approved',
  },
  {
    id: '2',
    employeeName: 'Jane Smith',
    startDate: '2023-04-22',
    endDate: '2023-04-24',
    reason: 'Vacation',
    status: 'approved',
  },
  {
    id: '3',
    employeeName: 'Alex Johnson',
    startDate: '2023-05-01',
    endDate: '2023-05-03',
    reason: 'Personal Leave',
    status: 'review',
  },
  {
    id: '4',
    employeeName: 'Sarah Williams',
    startDate: '2023-05-10',
    endDate: '2023-05-10',
    reason: 'Family Emergency',
    status: 'approved',
  },
  {
    id: '5',
    employeeName: 'Michael Brown',
    startDate: '2023-05-15',
    endDate: '2023-05-19',
    reason: 'Vacation',
    status: 'review',
  },
]
// Mock team members
const teamMembers = [
  {
    id: '1',
    name: 'John Doe',
  },
  {
    id: '2',
    name: 'Jane Smith',
  },
  {
    id: '3',
    name: 'Alex Johnson',
  },
  {
    id: '4',
    name: 'Sarah Williams',
  },
  {
    id: '5',
    name: 'Michael Brown',
  },
  {
    id: '6',
    name: 'Emily Davis',
  },
  {
    id: '7',
    name: 'David Wilson',
  },
  {
    id: '8',
    name: 'Lisa Taylor',
  },
]
const TeamAbsences = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedEmployee, setSelectedEmployee] = useState('')
  // Helper to get month name
  const getMonthName = (date) => {
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
  // Filter absences by month and employee
  const filteredAbsences = mockAbsences.filter((absence) => {
    const absenceStartDate = new Date(absence.startDate)
    const isInCurrentMonth =
      absenceStartDate.getMonth() === currentMonth.getMonth() &&
      absenceStartDate.getFullYear() === currentMonth.getFullYear()
    const matchesEmployee =
      !selectedEmployee || absence.employeeName === selectedEmployee
    return isInCurrentMonth && matchesEmployee
  })
  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }
  // Create calendar data
  const calendarDays = []
  const daysInMonth = getDaysInMonth(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
  )
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1,
  ).getDay()
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push({
      day: '',
      isCurrentMonth: false,
    })
  }
  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: true,
    })
  }
  // Check if a day has absences
  const getAbsencesForDay = (day) => {
    return filteredAbsences.filter((absence) => {
      const startDate = new Date(absence.startDate)
      const endDate = new Date(absence.endDate)
      const currentDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day,
      )
      return currentDate >= startDate && currentDate <= endDate
    })
  }
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-medium text-gray-900">Team Absences</h2>
        <p className="mt-1 text-sm text-gray-500">
          View and manage your team's absence calendar.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Filters */}
        <div className="rounded-lg bg-white p-6 shadow lg:col-span-1">
          <h3 className="text-md font-medium text-gray-900">Filters</h3>
          <div className="mt-4">
            <label
              htmlFor="employee-filter"
              className="block text-sm font-medium text-gray-700"
            >
              Team Member
            </label>
            <select
              id="employee-filter"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            >
              <option value="">All Team Members</option>
              {teamMembers.map((member) => (
                <option key={member.id} value={member.name}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700">Team Overview</h4>
            <ul className="mt-2 divide-y divide-gray-200">
              {teamMembers.map((member) => {
                const memberAbsences = mockAbsences.filter(
                  (absence) => absence.employeeName === member.name,
                )
                return (
                  <li key={member.id} className="py-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User size={16} className="mr-2 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          {member.name}
                        </span>
                      </div>
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                        {memberAbsences.length} absence(s)
                      </span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        {/* Calendar */}
        <div className="rounded-lg bg-white p-6 shadow lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              {getMonthName(currentMonth)} {currentMonth.getFullYear()}
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
          <div className="overflow-hidden rounded-md border border-gray-200">
            <div className="grid grid-cols-7 gap-px border-b border-gray-200 bg-gray-200 text-center text-xs font-semibold">
              <div className="bg-white py-2">Sun</div>
              <div className="bg-white py-2">Mon</div>
              <div className="bg-white py-2">Tue</div>
              <div className="bg-white py-2">Wed</div>
              <div className="bg-white py-2">Thu</div>
              <div className="bg-white py-2">Fri</div>
              <div className="bg-white py-2">Sat</div>
            </div>
            <div className="grid grid-cols-7 gap-px bg-gray-200">
              {calendarDays.map((calendarDay, index) => {
                const absencesForDay =
                  calendarDay.isCurrentMonth && calendarDay.day
                    ? getAbsencesForDay(calendarDay.day)
                    : []
                return (
                  <div
                    key={index}
                    className={`min-h-24 bg-white p-2 ${!calendarDay.isCurrentMonth ? 'bg-gray-50' : ''}`}
                  >
                    {calendarDay.day && (
                      <>
                        <p
                          className={`text-sm font-medium ${absencesForDay.length > 0 ? 'text-blue-600' : 'text-gray-500'}`}
                        >
                          {calendarDay.day}
                        </p>
                        <div className="mt-1 space-y-1">
                          {absencesForDay.map((absence) => (
                            <div
                              key={absence.id}
                              className={`rounded-md px-2 py-1 text-xs ${absence.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                            >
                              <p className="font-medium truncate">
                                {absence.employeeName}
                              </p>
                              <p className="truncate">{absence.reason}</p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Upcoming absences */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="text-lg font-medium text-gray-900">Upcoming Absences</h3>
        <div className="mt-4 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Employee
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
              {filteredAbsences.length > 0 ? (
                filteredAbsences.map((absence) => (
                  <tr key={absence.id}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {absence.employeeName}
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
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${absence.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}
                      >
                        {absence.status.charAt(0).toUpperCase() +
                          absence.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No absences found for the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default TeamAbsences
