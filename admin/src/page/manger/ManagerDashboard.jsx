import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Bell,
  Users,
  MessageSquare,
  FileUp,
  CheckSquare,
  BarChart,
} from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import ManagerHome from './ManagerHome'
import ReportReview from './ReportReview'
import AbsenceReview from './AbsenceReview'
import AbsenceForm from '../staff/AbsenceForm'
import CustomerCare from './CustomerCare'
import ReportAnalytics from './ReportAnalytics'
import TeamAbsences from './TeamAbsences'
import Notifications from '../common/Notifications'
import { useAuth } from '../../contexts/AuthContext'
const ManagerDashboard = () => {
  const { user } = useAuth()
  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: 'Dashboard',
      to: '/manager',
      role: ['manager', 'admin'],
    },
    {
      icon: <CheckSquare size={20} />,
      label: 'Report Review',
      to: '/manager/report-review',
      role: ['manager', 'admin'],
    },
    {
      icon: <Calendar size={20} />,
      label: 'Absence Review',
      to: '/manager/absence-review',
      role: ['manager', 'admin'],
    },
    {
      icon: <FileUp size={20} />,
      label: 'Submit Absence',
      to: '/manager/absence',
      role: ['manager', 'admin'],
    },
    {
      icon: <BarChart size={20} />,
      label: 'Report Analytics',
      to: '/manager/report-analytics',
      role: ['manager', 'admin'],
    },
    {
      icon: <Users size={20} />,
      label: 'Team Absences',
      to: '/manager/team-absences',
      role: ['manager', 'admin'],
    },
    {
      icon: <Bell size={20} />,
      label: 'Notifications',
      to: '/manager/notifications',
      role: ['manager', 'admin'],
    },
    ...(user?.hasCustomerCareAccess
      ? [
          {
            icon: <MessageSquare size={20} />,
            label: 'Customer Care',
            to: '/manager/customer-care',
            role: ['manager', 'admin'],
          },
        ]
      : []),
  ]
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DashboardLayout title="Manager Dashboard" navItems={navItems}>
            <ManagerHome />
          </DashboardLayout>
        }
      />
      <Route
        path="/report-review"
        element={
          <DashboardLayout title="Report Review" navItems={navItems}>
            <ReportReview />
          </DashboardLayout>
        }
      />
      <Route
        path="/absence-review"
        element={
          <DashboardLayout title="Absence Review" navItems={navItems}>
            <AbsenceReview />
          </DashboardLayout>
        }
      />
      <Route
        path="/absence"
        element={
          <DashboardLayout title="Submit Absence" navItems={navItems}>
            <AbsenceForm />
          </DashboardLayout>
        }
      />
      <Route
        path="/report-analytics"
        element={
          <DashboardLayout title="Report Analytics" navItems={navItems}>
            <ReportAnalytics />
          </DashboardLayout>
        }
      />
      <Route
        path="/team-absences"
        element={
          <DashboardLayout title="Team Absences" navItems={navItems}>
            <TeamAbsences />
          </DashboardLayout>
        }
      />
      <Route
        path="/notifications"
        element={
          <DashboardLayout title="Notifications" navItems={navItems}>
            <Notifications />
          </DashboardLayout>
        }
      />
      {user?.hasCustomerCareAccess && (
        <Route
          path="/customer-care"
          element={
            <DashboardLayout title="Customer Care" navItems={navItems}>
              <CustomerCare />
            </DashboardLayout>
          }
        />
      )}
      <Route path="*" element={<Navigate to="/manager" replace />} />
    </Routes>
  )
}
export default ManagerDashboard
