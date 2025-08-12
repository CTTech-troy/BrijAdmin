import React, { useState } from 'react'
import StatusBadge from '../../components/StatusBadge'
import { Calendar } from 'lucide-react'
// Mock data for absences
const mockAbsences = [
  {
    id: '1',
    startDate: '2023-04-20',
    endDate: '2023-04-20',
    reason: 'Doctor Appointment',
    details: 'Annual checkup',
  status: 'approved',
  },
  {
    id: '2',
    startDate: '2023-04-12',
    endDate: '2023-04-14',
    reason: 'Family Emergency',
    details: 'Need to travel out of town for a family emergency',
  status: 'approved',
  },
  {
    id: '3',
    startDate: '2023-05-10',
    endDate: '2023-05-15',
    reason: 'Vacation',
    details: 'Annual leave',
  status: 'review',
  },
]
const MyAbsences = () => {
  const [absences] = useState(mockAbsences)
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-medium text-gray-900">My Absences</h2>
        <p className="mt-1 text-sm text-gray-500">
          View all your submitted absence requests and their current status.
        </p>
      </div>
      {/* Absences list */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Date Range
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {absences.length > 0 ? (
                absences.map((absence) => (
                  <tr key={absence.id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <Calendar size={20} className="mr-3 text-gray-400" />
                        <div>
                          <div className="font-medium text-gray-900">
                            {absence.startDate === absence.endDate
                              ? absence.startDate
                              : `${absence.startDate} - ${absence.endDate}`}
                          </div>
                          <div className="text-sm text-gray-500">
                            {absence.startDate === absence.endDate
                              ? '1 day'
                              : calculateDays(
                                  absence.startDate,
                                  absence.endDate,
                                ) + ' days'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                      {absence.reason}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {absence.details}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <StatusBadge status={absence.status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No absence requests found.
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
// Helper function to calculate days between dates
const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  return diffDays
}
export default MyAbsences
