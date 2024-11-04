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
              label: "Create A Course",
              path: "/dashboard/admin/course-management/create-course/web-development",
            },
            {
              label: "Create Data Science Course",
              path: "/dashboard/admin/course-management/create-course/data-science",
            },
          ],
        },
        {
          label: "Create Subject",
          path: "/dashboard/admin/course-management/create-subject",
        },
        {
          label: "Create Topic",
          path: "/dashboard/admin/course-management/create-topic",
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
          path: "/dashboard/student/courses/enrolled",
        },
      ],
    },
  ],
};
