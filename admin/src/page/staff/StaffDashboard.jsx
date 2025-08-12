import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { LayoutDashboard, FileText, Calendar, Bell, FileUp } from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import StaffHome from './StaffHome'
import UploadReport from './UploadReport'
import AbsenceForm from './AbsenceForm'
import MyReports from './MyReports'
import MyAbsences from './MyAbsences'
import Notifications from '../common/Notifications'
const navItems = [
  {
    icon: <LayoutDashboard size={20} />,
    label: 'Dashboard',
    to: '/staff',
    role: ['staff', 'manager', 'admin'],
  },
  {
    icon: <FileUp size={20} />,
    label: 'Upload Report',
    to: '/staff/upload-report',
    role: ['staff', 'manager', 'admin'],
  },
  {
    icon: <Calendar size={20} />,
    label: 'Submit Absence',
    to: '/staff/absence',
    role: ['staff', 'manager', 'admin'],
  },
  {
    icon: <FileText size={20} />,
    label: 'My Reports',
    to: '/staff/my-reports',
    role: ['staff', 'manager', 'admin'],
  },
  {
    icon: <Calendar size={20} />,
    label: 'My Absences',
    to: '/staff/my-absences',
    role: ['staff', 'manager', 'admin'],
  },
  {
    icon: <Bell size={20} />,
    label: 'Notifications',
    to: '/staff/notifications',
    role: ['staff', 'manager', 'admin'],
  },
]
const StaffDashboard = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DashboardLayout title="Staff Dashboard" navItems={navItems}>
            <StaffHome />
          </DashboardLayout>
        }
      />
      <Route
        path="/upload-report"
        element={
          <DashboardLayout title="Upload Report" navItems={navItems}>
            <UploadReport />
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
        path="/my-reports"
        element={
          <DashboardLayout title="My Reports" navItems={navItems}>
            <MyReports />
          </DashboardLayout>
        }
      />
      <Route
        path="/my-absences"
        element={
          <DashboardLayout title="My Absences" navItems={navItems}>
            <MyAbsences />
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
      <Route path="*" element={<Navigate to="/staff" replace />} />
    </Routes>
  )
}
export default StaffDashboard
