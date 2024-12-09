export type TBatch = {
  _id?: string; // Optional _id field
  batchName: string;
  courseName: string;
  courseId?: TCourse;
  isActive?: boolean; // Optional field
  couponCode?: string; // Optional field
  discountPrice?: number; // Optional field
  maxStudentNumber: number; // Must be a number greater than 0
  batchImg?: string; // Optional field, should be a valid URL if provided
  trainers: string[]; // Array of non-empty strings (trainer names)
  startDate: string; // Should be a valid date string (e.g., YYYY-MM-DD)
  endDate: string; // Should be a valid date string (e.g., YYYY-MM-DD)
  enrolledStudents: TStudent[]; // Array of course IDs (strings)
};

export type TLesson = {
  lessonId: string;
  isAccessible: boolean;
  isCompleted: boolean;
  completedAt: string | null;
  _id: string;
};

export type TTopic = {
  topicId: string;
  lessons: TLesson[];
  _id: string;
};

export type TSubject = {
  subjectId: string;
  topics: TTopic[];
  _id: string;
};

export type TCourse = {
  courseId: string;
  subjects: TSubject[];
  _id: string;
};

export type TStudent = {
  _id: string;
  name: string;
  email: string;
  password: string;
  courses: TCourse[];
  __v: number;
};
