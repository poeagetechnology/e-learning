import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Login } from "./pages/auth/Login";
import { Register } from "./pages/auth/Register";
import { ForgotPassword } from "./pages/auth/ForgotPassword";
import { OTPVerification } from "./pages/auth/OTPVerification";
import { AdminDashboard } from "./pages/dashboards/AdminDashboard";
import { PrincipalDashboard } from "./pages/dashboards/PrincipalDashboard";
import { HODDashboard } from "./pages/dashboards/HODDashboard";
import { StaffDashboard } from "./pages/dashboards/StaffDashboard";
import { StudentDashboard } from "./pages/dashboards/StudentDashboard";
import { Students } from "./pages/admin/Students";
import { StaffManagement } from "./pages/admin/StaffManagement";
import { Departments } from "./pages/admin/Departments";
import { Courses } from "./pages/admin/Courses";
import { Timetable } from "./pages/common/Timetable";
import { Attendance } from "./pages/common/Attendance";
import { Assignments } from "./pages/common/Assignments";
import { Exams } from "./pages/common/Exams";
import { Fees } from "./pages/common/Fees";
import { Profile } from "./pages/common/Profile";
import { Settings } from "./pages/common/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/verify-otp",
    element: <OTPVerification />,
  },
  {
    path: "/admin",
    element: <Layout role="admin" />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "students", element: <Students /> },
      { path: "staff", element: <StaffManagement /> },
      { path: "departments", element: <Departments /> },
      { path: "courses", element: <Courses /> },
      { path: "timetable", element: <Timetable /> },
      { path: "attendance", element: <Attendance /> },
      { path: "exams", element: <Exams /> },
      { path: "fees", element: <Fees /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "/principal",
    element: <Layout role="principal" />,
    children: [
      { index: true, element: <PrincipalDashboard /> },
      { path: "students", element: <Students /> },
      { path: "staff", element: <StaffManagement /> },
      { path: "departments", element: <Departments /> },
      { path: "courses", element: <Courses /> },
      { path: "attendance", element: <Attendance /> },
      { path: "exams", element: <Exams /> },
      { path: "timetable", element: <Timetable /> },
      { path: "fees", element: <Fees /> },
      { path: "profile", element: <Profile /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "/hod",
    element: <Layout role="hod" />,
    children: [
      { index: true, element: <HODDashboard /> },
      { path: "students", element: <Students /> },
      { path: "staff", element: <StaffManagement /> },
      { path: "departments", element: <Departments /> },
      { path: "courses", element: <Courses /> },
      { path: "attendance", element: <Attendance /> },
      { path: "timetable", element: <Timetable /> },
      { path: "exams", element: <Exams /> },
      { path: "fees", element: <Fees /> },
      { path: "assignments", element: <Assignments /> },
      { path: "profile", element: <Profile /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "/staff",
    element: <Layout role="staff" />,
    children: [
      { index: true, element: <StaffDashboard /> },
      { path: "students", element: <Students /> },
      { path: "attendance", element: <Attendance /> },
      { path: "assignments", element: <Assignments /> },
      { path: "exams", element: <Exams /> },
      { path: "timetable", element: <Timetable /> },
      { path: "courses", element: <Courses /> },
      { path: "fees", element: <Fees /> },
      { path: "profile", element: <Profile /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "/student",
    element: <Layout role="student" />,
    children: [
      { index: true, element: <StudentDashboard /> },
      { path: "attendance", element: <Attendance /> },
      { path: "assignments", element: <Assignments /> },
      { path: "exams", element: <Exams /> },
      { path: "timetable", element: <Timetable /> },
      { path: "fees", element: <Fees /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);
