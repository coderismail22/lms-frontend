export const mockCourses = [
  {
    _id: "67270d2a8481df2630cb2bd1",
    name: "Frontend Web Development With Ismail",
    description:
      "Learn the fundamentals of Frontend Web Development with professional guidance.",
    instructor: "6726522e2dbe687b774c337b",
    subjects: [
      {
        _id: "67272e215a79bcfccd9bc9ef",
        name: "React JS",
        description: "A powerful frontend library by Facebook.",
        courseId: "67270d2a8481df2630cb2bd1",
        topics: [
          {
            _id: "67274a4c8fc9b9516a06e088",
            name: "SPA",
            description: "Single Page Application",
            subjectId: "67272e215a79bcfccd9bc9ef",
            lessons: [
              {
                _id: "672751f8b3feb7cdadd5a845",
                name: "What is JSX?",
                content: "https://www.youtube.com/watch?v=WZuRkn-LzvE",
                type: "video",
              },
            ],
          },
        ],
      },
    ],
  },
  // Add more courses if needed
];
