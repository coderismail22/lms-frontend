// Course Type Definitions

export type CourseLesson = {
  lessonId: string;
  isAccessible: boolean;
  isCompleted: boolean;
  completedAt: string | null;
  _id: string;
};

export type CourseTopic = {
  topicId: string;
  lessons: CourseLesson[];
};

export type CourseSubject = {
  subjectId: string;
  topics: CourseTopic[];
};

export type FullPopulatedCourse = {
  courseId: {
    _id: string;
    name: string;
    description: string;
    language: string;
    category: string;
    coursePrice: number;
    courseLength: string;
    skillLevel: string;
    courseType: string;
    subjects: string[]; // Array of subjectIds
    careerOpportunities: string[];
    curriculum: string[];
    jobPositions: string[];
    softwareList: string[];
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    img: string; // URL for the course image
  };
  subjects: CourseSubject[];
};

// Student Type Definitions

// export type Student = {
//   studentId: string;
//   name: string;
//   email: string;
//   enrolledCourses: Course[]; // List of courses the student is enrolled in
//   createdAt: string;
//   updatedAt: string;
// };
