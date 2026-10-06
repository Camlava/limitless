import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'
import RequireAuth from './auth/RequireAuth.jsx'
import Splash from './pages/auth/Splash.jsx'
import Login from './pages/auth/Login.jsx'
import RequestAccess from './pages/auth/RequestAccess.jsx'
import RequestSubmitted from './pages/auth/RequestSubmitted.jsx'
import {
  IdentifyAccount,
  PasswordUpdated,
  ResetPassword,
  SecurityQuestions,
} from './pages/auth/ForgotPassword.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import Users from './pages/admin/Users.jsx'
import CreateUser from './pages/admin/CreateUser.jsx'
import EditUser from './pages/admin/EditUser.jsx'
import { PendingRequests, ReviewRequest } from './pages/admin/AccessRequests.jsx'
import { AllUsersReport, ExpiredPasswordsReport, ReportsHome } from './pages/admin/Reports.jsx'
import Email from './pages/admin/Email.jsx'

// Numbers match the frames on "03 - Final Screens & Prototype" in Figma.
function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} /> {/* 01 */}
      <Route path="/welcome" element={<Splash reveal />} /> {/* 02 */}

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} /> {/* 03 */}
        <Route path="/request-access" element={<RequestAccess />} /> {/* 04 */}
        <Route path="/request-access/submitted" element={<RequestSubmitted />} /> {/* 05 */}
        <Route path="/forgot-password" element={<IdentifyAccount />} /> {/* 06 */}
        <Route path="/forgot-password/verify" element={<SecurityQuestions />} /> {/* 07 */}
        <Route path="/forgot-password/reset" element={<ResetPassword />} /> {/* 08 */}
        <Route path="/forgot-password/done" element={<PasswordUpdated />} /> {/* 09 */}
      </Route>

      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} /> {/* Manager / accountant landing page */}
        </Route>
      </Route>

      <Route element={<RequireAuth role="ADMINISTRATOR" />}>
        <Route path="/admin" element={<AppLayout />}>
          <Route index element={<Dashboard />} /> {/* 10 */}
          <Route path="users" element={<Users />} /> {/* 11 */}
          <Route path="users/new" element={<CreateUser />} /> {/* 19 */}
          <Route path="users/:id" element={<EditUser />} /> {/* 12 */}
          <Route path="access-requests" element={<PendingRequests />} /> {/* 13 */}
          <Route path="access-requests/:id" element={<ReviewRequest />} /> {/* 14 */}
          <Route path="reports" element={<ReportsHome />} /> {/* 15 */}
          <Route path="reports/users" element={<AllUsersReport />} /> {/* 16 */}
          <Route path="reports/expired-passwords" element={<ExpiredPasswordsReport />} /> {/* 17 */}
          <Route path="email" element={<Email />} /> {/* 18 */}
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
