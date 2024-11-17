// routes.tsx
import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/SharedPages/NotFound/NotFound";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Blog from "../pages/Blog/Blog/Blog";
import BlogPostDetail from "../pages/Blog/BlogPostDetails/BlogPostDetails";
import Notes from "../pages/Note/Notes/Notes";
import FullNote from "../pages/Note/FullNote/FullNote";
import Contact from "../pages/Contact/Contact/Contact";
import Login from "../pages/SharedPages/Login/Login";
// import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import CourseDetailsPage from "@/CourseDetailsPage/CourseDetailsPage";
import Dashboard from "@/pages/Dashboard/Dashboard/Dashboard";
import AdminHome from "@/pages/Dashboard/Admin/AdminHome/AdminHome";
import StudentHome from "@/pages/Dashboard/Student/StudentHome/StudentHome";
import InstructorHome from "@/pages/Dashboard/Instructor/InstructorHome/InstructorHome";
import CreateCourse from "@/pages/Dashboard/Admin/CourseManagement/Course/CreateCourse";
import LinkSubjectToCourse from "@/pages/Dashboard/Admin/CourseManagement/Course/LinkSubjectToCourse";
import AllCourses from "@/pages/Dashboard/Admin/CourseManagement/Course/AllCourses";
import CreateSubject from "@/pages/Dashboard/Admin/CourseManagement/Subject/CreateSubject";
import LinkTopicToSubject from "@/pages/Dashboard/Admin/CourseManagement/Subject/LinkTopicToSubject";
import AllSubjects from "@/pages/Dashboard/Admin/CourseManagement/Subject/AllSubjects";
import CreateTopic from "@/pages/Dashboard/Admin/CourseManagement/Topic/CreateTopic";
import LinkLessonToTopic from "@/pages/Dashboard/Admin/CourseManagement/Topic/LinkLessonToTopic";
import AllTopics from "@/pages/Dashboard/Admin/CourseManagement/Topic/AllTopics";
import CreateLesson from "@/pages/Dashboard/Admin/CourseManagement/Lesson/CreateLesson";
import AllLessons from "@/pages/Dashboard/Admin/CourseManagement/Lesson/AllLessons";
import RunningCourses from "@/pages/Dashboard/Instructor/CourseManagement/RunningCourses/RunningCourses";
import UpcomingCourses from "@/pages/Dashboard/Instructor/CourseManagement/UpcomingCourses/UpcomingCourses";
import CompletedCourses from "@/pages/Dashboard/Instructor/CourseManagement/CompletedCourses/CompletedCourses";
import EnrolledCourses from "@/pages/Dashboard/Student/Courses/EnrolledCourses/EnrolledCourses";
import Categories from "@/pages/Dashboard/Admin/Categories/Categories";
import Batch from "@/pages/Dashboard/Admin/Batch/Batch";
import AddBatch from "@/components/AddBatch/AddBatch";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
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
      // Role: Admin
      { path: "/dashboard/admin/home", element: <AdminHome /> },
      { path: "/dashboard/admin/categories", element: <Categories /> },
      { path: "/dashboard/admin/batch", element: <Batch /> },
      { path: "/dashboard/admin/batch/add-batch", element: <AddBatch /> },
      // Course Management
      // Course
      {
        path: "/dashboard/admin/course-management/create-course",
        element: <CreateCourse />,
      },
      {
        path: "/dashboard/admin/course-management/link-subject-to-course",
        element: <LinkSubjectToCourse />,
      },
      {
        path: "/dashboard/admin/course-management/all-courses",
        element: <AllCourses />,
      },
      // Subject
      {
        path: "/dashboard/admin/subject-management/create-subject",
        element: <CreateSubject />,
      },
      {
        path: "/dashboard/admin/subject-management/link-topic-to-subject",
        element: <LinkTopicToSubject />,
      },
      {
        path: "/dashboard/admin/subject-management/all-subjects",
        element: <AllSubjects />,
      },
      // Topic
      {
        path: "/dashboard/admin/topic-management/create-topic",
        element: <CreateTopic />,
      },
      {
        path: "/dashboard/admin/topic-management/link-lesson-to-topic",
        element: <LinkLessonToTopic />,
      },
      {
        path: "/dashboard/admin/topic-management/all-topics",
        element: <AllTopics />,
      },
      // Lesson
      {
        path: "/dashboard/admin/lesson-management/create-lesson",
        element: <CreateLesson />,
      },
      {
        path: "/dashboard/admin/lesson-management/all-lessons",
        element: <AllLessons />,
      },
      // Role: Instructor
      { path: "/dashboard/instructor/home", element: <InstructorHome /> },
      // Course Management
      {
        path: "/dashboard/instructor/course-management/running",
        element: <RunningCourses />,
      },
      {
        path: "/dashboard/instructor/course-management/upcoming",
        element: <UpcomingCourses />,
      },
      {
        path: "/dashboard/instructor/course-management/completed",
        element: <CompletedCourses />,
      },
      // Role: Student
      { path: "/dashboard/student/home", element: <StudentHome /> },
      {
        path: "/dashboard/student/courses/enrolled-courses",
        element: <EnrolledCourses />,
      },
      {
        path: "/dashboard/student/:studentId/courses/:courseId",
        element: <CourseDetailsPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />, // Render NotFound component within MainLayout
  },
]);
