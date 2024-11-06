import {
  FaBook,
  FaChalkboardTeacher,
  FaHome,
  FaLink,
  FaRegListAlt,
  FaUserGraduate,
} from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";

export const sidebarData = {
  admin: [
    { label: "Home", path: "/dashboard/admin/home", icon: FaHome },
    {
      label: "Course Management",
      icon: FaBook,
      children: [
        {
          label: "Course",
          path: "/dashboard/admin/course-management/create-course",
          children: [
            {
              icon: IoMdAddCircleOutline,
              label: "Create Course",
              path: "/dashboard/admin/course-management/create-course",
            },
            {
              icon: FaLink,
              label: "Link Subject To Course",
              path: "/dashboard/admin/course-management/link-subject-to-course",
            },
            {
              icon: FaRegListAlt,
              label: "All Courses",
              path: "/dashboard/admin/course-management/all-courses",
            },
          ],
        },
        {
          label: "Subject",
          path: "/dashboard/admin/subject-management/create-subject",
          children: [
            {
              icon: IoMdAddCircleOutline,
              label: "Create Subject",
              path: "/dashboard/admin/subject-management/create-subject",
            },
            {
              icon: FaLink,
              label: "Link Topic To Subject",
              path: "/dashboard/admin/subject-management/link-topic-to-subject",
            },
            {
              icon: FaRegListAlt,
              label: "All Subjects",
              path: "/dashboard/admin/subject-management/all-subjects",
            },
          ],
        },
        {
          label: "Topic",
          path: "/dashboard/admin/topic-management/create-topic",
          children: [
            {
              icon: IoMdAddCircleOutline,
              label: "Create A Topic",
              path: "/dashboard/admin/topic-management/create-topic",
            },
            {
              icon: FaLink,
              label: "Link Lesson To Topic",
              path: "/dashboard/admin/topic-management/link-lesson-to-topic",
            },
            {
              icon: FaRegListAlt,
              label: "All Topics",
              path: "/dashboard/admin/topic-management/all-topics",
            },
          ],
        },
        {
          label: "Lesson",
          path: "/dashboard/admin/lesson-management/create-lesson",
          children: [
            {
              icon: IoMdAddCircleOutline,
              label: "Create A Lesson",
              path: "/dashboard/admin/lesson-management/create-lesson",
            },
            {
              icon: FaRegListAlt,
              label: "All Lessons",
              path: "/dashboard/admin/lesson-management/all-lessons",
            },
          ],
        },
      ],
    },
  ],
  instructor: [
    { label: "Home", path: "/dashboard/instructor", icon: FaHome },
    {
      label: "Course Management",
      icon: FaChalkboardTeacher,
      children: [
        {
          label: "Running Courses",
          path: "/dashboard/instructor/course-management/running",
        },
        {
          label: "Upcoming Courses",
          path: "/dashboard/instructor/course-management/upcoming",
        },
        {
          label: "Completed Courses",
          path: "/dashboard/instructor/course-management/completed",
        },
      ],
    },
  ],
  student: [
    { label: "Home", path: "/dashboard/student", icon: FaHome },
    {
      label: "Courses",
      icon: FaUserGraduate,
      children: [
        {
          label: "Enrolled Courses",
          path: "courses/enrolled-courses",
        },
      ],
    },
  ],
};
