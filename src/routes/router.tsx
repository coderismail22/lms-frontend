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
import MyProfile from "../pages/MyDashboard/MyProfile/MyProfile";
import DashboardLayout from "@/layout/DashboardLayout/DashboardLayout";

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
    path: "/dashboard/admin",
    element: (
      // <ProtectedRoute>
      <DashboardLayout role="admin" />
      // </ProtectedRoute>
    ),
    children: [
      { path: "my-profile", element: <MyProfile /> },
      // Add more admin-specific routes here
    ],
  },
  {
    path: "/dashboard/instructor",
    element: (
      // <ProtectedRoute>
      <DashboardLayout role="instructor" />
      // </ProtectedRoute>
    ),
    children: [
      { path: "my-profile", element: <MyProfile /> },
      // Add more instructor-specific routes here
    ],
  },
  {
    path: "/dashboard/student",
    element: (
      // <ProtectedRoute>
      <DashboardLayout role="student" />
      // </ProtectedRoute>
    ),
    children: [
      { path: "my-profile", element: <MyProfile /> },
      // Add more student-specific routes here
    ],
  },
  {
    path: "*",
    element: <NotFound />, // Render NotFound component within MainLayout
  },
]);
