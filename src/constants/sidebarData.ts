import {
  FaBook,
  FaBookReader,
  FaChalkboardTeacher,
  FaHome,
  FaLink,
  FaRegListAlt,
  FaUserGraduate,
} from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { CiBoxList } from "react-icons/ci";
import { GiProgression } from "react-icons/gi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineDownloading, MdOutlinePlayLesson } from "react-icons/md";

export const sidebarData = {
  admin: [
    { label: "Home", path: "/dashboard/admin/home", icon: FaHome },
    {
      label: "Add Category",
      path: "/dashboard/admin/categories",
      icon: BiCategory,
    },
    { label: "Add Batch", path: "/dashboard/admin/batch", icon: FaBookReader },
    { label: "Add Route/Outline", path: "/dashboard/admin/home", icon: FaHome },
    {
      label: "Course Management",
      icon: FaBook,
      children: [
        {
          icon: CiBoxList,
          label: "Course",
          path: "/dashboard/admin/course-management/create-course",
          children: [
            {
              icon: IoMdAddCircleOutline,
              label: "Create Course",
              path: "/dashboard/admin/course-management/create-course",
            },
            // {
            //   icon: FaLink,
            //   label: "Link Subject To Course",
            //   path: "/dashboard/admin/course-management/link-subject-to-course",
            // },
            {
              icon: FaRegListAlt,
              label: "All Courses",
              path: "/dashboard/admin/course-management/all-courses",
            },
          ],
        },
        {
          icon: CiBoxList,
          label: "Subject",
          path: "/dashboard/admin/subject-management/create-subject",
          children: [
            {
              icon: IoMdAddCircleOutline,
              label: "Create Subject",
              path: "/dashboard/admin/subject-management/create-subject",
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
          icon: CiBoxList,
          path: "/dashboard/admin/topic-management/create-topic",
          children: [
            {
              icon: IoMdAddCircleOutline,
              label: "Create Topic",
              path: "/dashboard/admin/topic-management/create-topic",
            },
            {
              icon: FaRegListAlt,
              label: "All Topics",
              path: "/dashboard/admin/topic-management/all-topics",
            },
          ],
        },
        {
          icon: CiBoxList,
          label: "Lesson",
          path: "/dashboard/admin/lesson-management/create-lesson",
          children: [
            {
              icon: IoMdAddCircleOutline,
              label: "Create Lesson",
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
    { label: "Home", path: "/dashboard/instructor/home", icon: FaHome },
    {
      label: "Course Management",
      icon: FaChalkboardTeacher,
      children: [
        {
          icon: GiProgression,
          label: "Running Courses",
          path: "/dashboard/instructor/course-management/running",
        },
        {
          icon: MdOutlineDownloading,
          label: "Upcoming Courses",
          path: "/dashboard/instructor/course-management/upcoming",
        },
        {
          icon: IoCheckmarkDoneSharp,
          label: "Completed Courses",
          path: "/dashboard/instructor/course-management/completed",
        },
      ],
    },
  ],
  student: [
    { label: "Home", path: "/dashboard/student/home", icon: FaHome },
    {
      label: "Courses",
      icon: FaUserGraduate,
      children: [
        {
          icon: MdOutlinePlayLesson,
          label: "Enrolled Courses",
          path: "/dashboard/student/courses/enrolled-courses",
        },
      ],
    },
  ],
};
