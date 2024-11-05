// utils/sidebarData.ts
import {
  //   FaUser,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaHome,
  FaBook,
} from "react-icons/fa";

export const sidebarData = {
  admin: [
    { label: "Home", path: "/dashboard/admin", icon: FaHome },
    {
      label: "Course Management",
      icon: FaBook,
      children: [
        {
          label: "Course",
          path: "/dashboard/admin/course-management/create-course",
          children: [
            {
              icon: FaHome,
              label: "Create A Course",
              path: "/dashboard/admin/course-management/create-course",
            },
            {
              icon: FaHome,
              label: "Link Subject To Course",
              path: "/dashboard/admin/course-management/link-subject-to-course",
            },
            {
              icon: FaHome,
              label: "All Courses",
              path: "/dashboard/admin/course-management/create-course/all-courses",
            },
          ],
        },
        {
          label: "Subject",
          path: "/dashboard/admin/subject-management/create-subject",
          children: [
            {
              label: "Create A Subject",
              path: "/dashboard/admin/subject-management/create-subject",
            },
            {
              label: "Link Topic To Subject",
              path: "/dashboard/admin/subject-management/link-topic-to-subject",
            },
            {
              label: "All Subjects",
              path: "/dashboard/admin/subject-management/create-subject/all-subjects",
            },
          ],
        },
        {
          label: "Topic",
          path: "/dashboard/admin/topic-management/create-topic",
          children: [
            {
              label: "Create A Topic",
              path: "/dashboard/admin/topic-management/create-topic",
            },
            {
              label: "Link Lesson To Topic",
              path: "/dashboard/admin/topic-management/link-lesson-to-topic",
            },
            {
              label: "All Topics",
              path: "/dashboard/admin/topic-management/create-topic/all-topics",
            },
          ],
        },
        {
          label: "Lesson",
          path: "/dashboard/admin/lesson-management/create-lesson",
          children: [
            {
              label: "Create A Lesson",
              path: "/dashboard/admin/lesson-management/create-lesson",
            },
            {
              label: "All Lessons",
              path: "/dashboard/admin/lesson-management/create-lesson/all-lessons",
            },
          ],
        },
      ],
    },
    // later on use this profile menu
    // {
    //   label: "Profile",
    //   icon: FaUser,
    //   children: [
    //     { label: "Update Profile", path: "/dashboard/admin/profile/update" },
    //     { label: "Delete Profile", path: "/dashboard/admin/profile/delete" },
    //     {
    //       label: "Change Image",
    //       path: "/dashboard/admin/profile/change-image",
    //     },
    //   ],
    // },
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
