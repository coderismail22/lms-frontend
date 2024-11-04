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
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import MyDashboard from "../pages/MyDashboard/MyDashboard/MyDashboard";
import MyProfile from "../pages/MyDashboard/MyProfile/MyProfile";
import MyProjectEditor from "../pages/MyDashboard/MyProjectEditor/MyProjectEditor";
import PublishNewPost from "../pages/MyDashboard/PublishNewPost/PublishNewPost";
import MyMarkdownEditor from "../pages/MyDashboard/MyMarkdownEditor/MyMarkdownEditor";
import MyProjects from "../pages/MyDashboard/MyProjects/MyProjects";
import MyBlogPosts from "../pages/MyDashboard/MyBlogPosts/MyBlogPosts";
import MyNotes from "../pages/MyDashboard/MyNotes/MyNotes";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:id",
        element: <BlogPostDetail />,
      },
      {
        path: "/notes",
        element: <Notes />,
      },
      {
        path: "/note/:id",
        element: <FullNote />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard/admin",
    element: <MyDashboard />,
    children: [
      {
        path: "my-profile",
        element: <MyProfile />,
      },
    ],
  },
  {
    path: "/dashboard/instructor",
    element: <MyDashboard />,
    children: [
      {
        path: "my-profile",
        element: <MyProfile />,
      },
    ],
  },
  {
    path: "/dashboard/student",
    element: <MyDashboard />,
    children: [
      {
        path: "my-profile",
        element: <MyProfile />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />, // Render NotFound component within MainLayout
  },
]);
