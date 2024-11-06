// routes.tsx
import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/SharedPages/NotFound/NotFound";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Projects from "../pages/Projects/Projects/Projects";
import Blog from "../pages/Blog/Blog/Blog";
import BlogPostDetail from "../pages/Blog/BlogPostDetails/BlogPostDetails";
import Notes from "../pages/Note/Notes/Notes";
import FullNote from "../pages/Note/FullNote/FullNote";
import Contact from "../pages/Contact/Contact/Contact";
import Login from "../pages/SharedPages/Login/Login";
// import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import DashboardLayout from "@/layout/DashboardLayout/DashboardLayout";
import EnrolledCourses from "@/pages/Dashboard/Student/Courses/EnrolledCourses/EnrolledCourses";
import CourseDetailsPage from "@/CourseDetailsPage/CourseDetailsPage";
import Dashboard from "@/pages/Dashboard/Dashboard/Dashboard";
import AdminHome from "@/pages/Dashboard/Admin/AdminHome/AdminHome";
import StudentHome from "@/pages/Dashboard/Student/StudentHome/StudentHome";
import InstructorHome from "@/pages/Dashboard/Instructor/InstructorHome/InstructorHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/projects", element: <Projects /> },
      { path: "/blog", element: <Blog /> },
      { path: "/blog/:id", element: <BlogPostDetail /> },
      { path: "/notes", element: <Notes /> },
      { path: "/note/:id", element: <FullNote /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      { path: "/dashboard/admin/home", element: <AdminHome /> },
      { path: "/dashboard/instructor/home", element: <InstructorHome /> },
      { path: "/dashboard/student/home", element: <StudentHome /> },
      // { path: "/dashboard/test", element: <EnrolledCourses /> },
      {
        path: "/dashboard/courses/:courseId",
        element: <CourseDetailsPage />,
      },
    ],
  },
  {
    path: "/dashboard/admin",
    element: (
      // <ProtectedRoute>
      <DashboardLayout role="admin" />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/instructor",
    element: (
      // <ProtectedRoute>
      <DashboardLayout role="instructor" />
      // </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/student",
    element: (
      // <ProtectedRoute>
      <DashboardLayout role="student" />
      // </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard/student/courses/enrolled-courses",
        element: <EnrolledCourses />,
      },
      // {
      //   path: "/dashboard/student/courses/:courseId",
      //   element: <CourseDetailsPage />,
      // },
      // Add more student-specific routes here
    ],
  },
  {
    path: "*",
    element: <NotFound />, // Render NotFound component within MainLayout
  },
]);
