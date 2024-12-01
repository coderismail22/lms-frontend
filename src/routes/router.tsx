// routes.tsx
import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/SharedPages/NotFound/NotFound";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home/Home";
import Blog from "../pages/Blog/Blog/Blog";
import BlogPostDetail from "../pages/Blog/BlogPostDetails/BlogPostDetails";
import Notes from "../pages/Note/Notes/Notes";
import FullNote from "../pages/Note/FullNote/FullNote";
import CourseDetailsPage from "@/CourseDetailsPage/CourseDetailsPage";
import Dashboard from "@/pages/Dashboard/Dashboard/Dashboard";
import AdminHome from "@/pages/Dashboard/Admin/AdminHome/AdminHome";
import InstructorHome from "@/pages/Dashboard/Instructor/InstructorHome/InstructorHome";
import CreateCourse from "@/pages/Dashboard/Admin/CourseManagement/Course/CreateCourse";
import AllCourses from "@/pages/Dashboard/Admin/CourseManagement/Course/AllCourses";
import CreateSubject from "@/pages/Dashboard/Admin/CourseManagement/Subject/CreateSubject";
import AllSubjects from "@/pages/Dashboard/Admin/CourseManagement/Subject/AllSubjects";
import CreateLesson from "@/pages/Dashboard/Admin/CourseManagement/Lesson/CreateLesson";
import AllLessons from "@/pages/Dashboard/Admin/CourseManagement/Lesson/AllLessons";
import RunningCourses from "@/pages/Dashboard/Instructor/CourseManagement/RunningCourses/RunningCourses";
import UpcomingCourses from "@/pages/Dashboard/Instructor/CourseManagement/UpcomingCourses/UpcomingCourses";
import CompletedCourses from "@/pages/Dashboard/Instructor/CourseManagement/CompletedCourses/CompletedCourses";
import EnrolledCourses from "@/pages/Dashboard/Student/Courses/EnrolledCourses/EnrolledCourses";
import Categories from "@/pages/Dashboard/Admin/Categories/Categories";
import Batch from "@/pages/Dashboard/Admin/Batch/Batch";
import AddBatch from "@/components/AddBatch/AddBatch";
import EditBatch from "@/components/EditBatch/EditBatch";
import EditCourse from "@/pages/Dashboard/Admin/CourseManagement/Course/EditCourse";
import EditSubject from "@/pages/Dashboard/Admin/CourseManagement/Subject/EditSubject";
import CreateTopic from "@/pages/Dashboard/Admin/CourseManagement/Topic/CreateTopic";
import AllTopics from "@/pages/Dashboard/Admin/CourseManagement/Topic/AllTopics";
import EditTopic from "@/pages/Dashboard/Admin/CourseManagement/Topic/EditTopic";
import EditLesson from "@/pages/Dashboard/Admin/CourseManagement/Lesson/EditLesson";
import AddTeacher from "@/pages/Dashboard/Admin/Teacher Management/AddTeacher";
import EditTeacher from "@/pages/Dashboard/Admin/Teacher Management/EditTeacher";
import AllTeachers from "@/pages/Dashboard/Admin/Teacher Management/AllTeachers";
import Login from "@/pages/Auth/Login/Login";
import Register from "@/pages/Auth/Register/Register";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Unauthorized from "@/components/Auth/Unauthorized/Unauthorized";
import RoleWrapper from "@/components/Auth/RoleWrapper/RoleWrapper";
import { ROLE } from "@/constants/role";
import Courses from "@/pages/Courses/Courses";
import Cart from "@/pages/Dashboard/Student/Cart/Cart";
import CourseDetailsPageForAll from "@/pages/Courses/CourseDetailsPageForAll/CourseDetailsPageForAll";
import Payment from "@/pages/Dashboard/Student/Payment/Payment";
import AllPayments from "@/pages/Dashboard/Admin/Payments/AllPayments";
import AllOrders from "@/pages/Dashboard/Admin/Orders/AllOrders";
import StudentHome from "@/pages/Dashboard/Student/StudentHome/StudentHome";
import PendingCourses from "@/pages/Dashboard/Student/Courses/PendingCourses/PendingCourses";

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
      { path: "/courses", element: <Courses /> },
      { path: "/courses/:courseId", element: <CourseDetailsPageForAll /> },
      { path: "/cart", element: <Cart /> },
    ],
  },
  // Auth
  {
    path: "auth/login",
    element: <Login />,
  },
  {
    path: "auth/signup",
    element: <Register />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />, // Fallback for unauthorized access
  },
  // {
  //   path: "/reset-password",
  //   element: <ResetPassword />,
  // },
  // {
  //   path: "/set-new-password-form",
  //   element: <SetNewPasswordForm />,
  // },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      // Role: Admin
      { path: "/dashboard/admin/home", element: <AdminHome /> },
      { path: "/dashboard/admin/orders", element: <AllOrders /> },
      { path: "/dashboard/admin/payments", element: <AllPayments /> },
      { path: "/dashboard/admin/categories", element: <Categories /> },
      { path: "/dashboard/admin/batch", element: <Batch /> },
      { path: "/dashboard/admin/batch/edit/:batchId", element: <EditBatch /> },
      { path: "/dashboard/admin/batch/add-batch", element: <AddBatch /> },
      // Teacher Management
      {
        path: "/dashboard/admin/teacher-management/create-teacher",
        element: <AddTeacher />,
      },
      {
        path: "/dashboard/admin/teacher-management/edit-teacher/:teacherId",
        element: <EditTeacher />,
      },
      {
        path: "/dashboard/admin/teacher-management/all-teachers",
        element: <AllTeachers />,
      },
      // Course Management
      // Course
      {
        path: "/dashboard/admin/course-management/create-course",
        element: <CreateCourse />,
      },
      {
        path: "/dashboard/admin/course-management/all-courses",
        element: <AllCourses />,
      },
      {
        path: "/dashboard/admin/courses/edit/:courseId",
        element: <EditCourse />,
      },
      // Subject
      {
        path: "/dashboard/admin/subject-management/create-subject",
        element: <CreateSubject />,
      },
      {
        path: "/dashboard/admin/subject-management/all-subjects",
        element: <AllSubjects />,
      },
      {
        path: "/dashboard/admin/subjects/edit/:subjectId",
        element: <EditSubject />,
      },
      // Topic
      {
        path: "/dashboard/admin/topic-management/create-topic",
        element: <CreateTopic />,
      },
      {
        path: "/dashboard/admin/topics/edit/:topicId",
        element: <EditTopic />,
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
        path: "/dashboard/admin/lesson-management/lessons/edit/:lessonId",
        element: <EditLesson />,
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
      {
        path: "/dashboard/student/home",
        element: (
          <RoleWrapper allowedRoles={[ROLE.STUDENT]}>
            {/* <Cart /> */}
            <StudentHome />
          </RoleWrapper>
        ),
      },
      {
        path: "/dashboard/student/cart",
        element: (
          <RoleWrapper allowedRoles={[ROLE.STUDENT]}>
            <Cart />
          </RoleWrapper>
        ),
      },
      {
        path: "/dashboard/student/paymentpage",
        element: (
          <RoleWrapper allowedRoles={[ROLE.STUDENT]}>
            <Payment />
          </RoleWrapper>
        ),
      },
      {
        path: "/dashboard/student/courses/enrolled-courses",
        element: (
          <RoleWrapper allowedRoles={[ROLE.STUDENT]}>
            <EnrolledCourses />
          </RoleWrapper>
        ),
      },
      {
        path: "/dashboard/student/courses/pending-courses",
        element: (
          <RoleWrapper allowedRoles={[ROLE.STUDENT]}>
            <PendingCourses />
          </RoleWrapper>
        ),
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
