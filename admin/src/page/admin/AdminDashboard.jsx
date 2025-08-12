import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Bell,
  Users,
  MessageSquare,
  CheckSquare,
  Download,
  AlertTriangle,
  UserCog,
} from 'lucide-react'
import DashboardLayout from '../../components/DashboardLayout'
import AdminHome from './AdminHome'
import FinalApproval from './FinalApproval'
import CompanyComplaints from './CompanyComplaints'
import LoginTracking from './LoginTracking'
import RoleManagement from './RoleManagement'
import ReportManagement from './ReportManagement'
import AbsenceOverview from './AbsenceOverview'
import Notifications from '../common/Notifications'
import { useAuth } from '../../contexts/AuthContext'
const AdminDashboard = () => {
  useAuth()
  const navItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: 'Dashboard',
      to: '/admin',
      role: ['admin'],
    },
    {
      icon: <CheckSquare size={20} />,
      label: 'Final Approval',
      to: '/admin/final-approval',
      role: ['admin'],
    },
    {
      icon: <AlertTriangle size={20} />,
      label: 'Company Complaints',
      to: '/admin/complaints',
      role: ['admin'],
    },
    {
      icon: <Users size={20} />,
      label: 'Login Tracking',
      to: '/admin/login-tracking',
      role: ['admin'],
    },
    {
      icon: <UserCog size={20} />,
      label: 'Role Management',
      to: '/admin/role-management',
      role: ['admin'],
    },
    {
      icon: <Download size={20} />,
      label: 'Report Management',
      to: '/admin/report-management',
      role: ['admin'],
    },
    {
      icon: <Calendar size={20} />,
      label: 'Absence Overview',
      to: '/admin/absence-overview',
      role: ['admin'],
    },
    {
      icon: <Bell size={20} />,
      label: 'Notifications',
      to: '/admin/notifications',
      role: ['admin'],
    },
  ]
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DashboardLayout title="Admin Dashboard" navItems={navItems}>
            <AdminHome />
          </DashboardLayout>
        }
      />
      <Route
        path="/final-approval"
        element={
          <DashboardLayout title="Final Approval" navItems={navItems}>
            <FinalApproval />
          </DashboardLayout>
        }
      />
      <Route
        path="/complaints"
        element={
          <DashboardLayout title="Company Complaints" navItems={navItems}>
            <CompanyComplaints />
          </DashboardLayout>
        }
      />
      <Route
        path="/login-tracking"
        element={
          <DashboardLayout title="Login Tracking" navItems={navItems}>
            <LoginTracking />
          </DashboardLayout>
        }
      />
      <Route
        path="/role-management"
        element={
          <DashboardLayout title="Role Management" navItems={navItems}>
            <RoleManagement />
          </DashboardLayout>
        }
      />
      <Route
        path="/report-management"
        element={
          <DashboardLayout title="Report Management" navItems={navItems}>
            <ReportManagement />
          </DashboardLayout>
        }
      />
      <Route
        path="/absence-overview"
        element={
          <DashboardLayout title="Absence Overview" navItems={navItems}>
            <AbsenceOverview />
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
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  )
}
export default AdminDashboard
