import React, { useState } from 'react'
import { Calendar, User } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'
// Mock data for absence requests
const mockAbsences = [
  {
    id: '1',
    employeeName: 'John Doe',
    startDate: '2023-04-20',
    endDate: '2023-04-20',
    reason: 'Doctor Appointment',
    details: 'Annual checkup',
  status: 'review',
  },
  {
    id: '2',
    employeeName: 'Jane Smith',
    startDate: '2023-04-22',
    endDate: '2023-04-24',
    reason: 'Vacation',
    details: 'Family trip',
  status: 'review',
  },
  {
    id: '3',
    employeeName: 'Alex Johnson',
    startDate: '2023-05-01',
    endDate: '2023-05-03',
    reason: 'Personal Leave',
    details: 'Need to handle some personal matters',
  status: 'review',
  },
]
const AbsenceReview = () => {
  const [absences] = useState(mockAbsences)
  const [selectedAbsence, setSelectedAbsence] = useState(null)
  const handleSelectAbsence = (absence) => {
    setSelectedAbsence(absence)
  }
  // Helper function to calculate days between dates
  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
    return diffDays
  }
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-medium text-gray-900">Absence Review</h2>
        <p className="mt-1 text-sm text-gray-500">
          Review absence requests from your team members. As a manager, you can
          view but not modify these requests.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Absences list */}
        <div className="lg:col-span-1">
          <div className="rounded-lg bg-white shadow">
            <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Absence Requests ({absences.length})
              </h3>
            </div>
            <ul className="divide-y divide-gray-200">
              {absences.length > 0 ? (
                absences.map((absence) => (
                  <li
                    key={absence.id}
                    className={`cursor-pointer p-4 hover:bg-gray-50 ${selectedAbsence?.id === absence.id ? 'bg-blue-50' : ''}`}
                    onClick={() => handleSelectAbsence(absence)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <Calendar size={24} className="text-gray-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {absence.employeeName}
                        </p>
                        <p className="truncate text-sm text-gray-500">
                          {absence.reason}
                        </p>
                        <p className="text-xs text-gray-500">
                          {absence.startDate === absence.endDate
                            ? absence.startDate
                            : `${absence.startDate} - ${absence.endDate}`}
                        </p>
                      </div>
                      <div>
                        <StatusBadge status={absence.status} />
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="p-4 text-center text-sm text-gray-500">
                  No absence requests to review
                </li>
              )}
            </ul>
          </div>
        </div>
        {/* Absence details */}
        <div className="lg:col-span-2">
          {selectedAbsence ? (
            <div className="rounded-lg bg-white shadow">
              <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Absence Request Details
                </h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Employee
                    </dt>
                    <dd className="mt-1 flex items-center text-sm text-gray-900">
                      <User size={16} className="mr-1 text-gray-400" />
                      {selectedAbsence.employeeName}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Status
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <StatusBadge status={selectedAbsence.status} />
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Start Date
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {selectedAbsence.startDate}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      End Date
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {selectedAbsence.endDate}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Duration
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {calculateDays(
                        selectedAbsence.startDate,
                        selectedAbsence.endDate,
                      )}{' '}
                      days
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Reason
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {selectedAbsence.reason}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">
                      Details
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {selectedAbsence.details ||
                        'No additional details provided'}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <p className="text-sm text-gray-500">
                  As a manager, you can only view absence requests. No action is
                  required.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg bg-white p-6 shadow">
              <div className="text-center">
                <Calendar size={48} className="mx-auto text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No Absence Selected
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Select an absence request from the list to view details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default AbsenceReview
