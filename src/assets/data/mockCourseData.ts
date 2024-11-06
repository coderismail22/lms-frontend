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
        name: "English 1st",
        description: "A powerful frontend library by Facebook.",
        courseId: "67270d2a8481df2630cb2bd1",
        topics: [
          {
            _id: "67274a4c8fc9b9516a06e088",
            name: "Nelson Mandela",
            description: "Single Page Application",
            subjectId: "67272e215a79bcfccd9bc9ef",
            lessons: [
              {
                _id: "672751f8b3feb7cdadd5a845",
                name: "Who is Nelson Mandela?",
                content: "https://www.youtube.com/watch?v=WZuRkn-LzvE",
                type: "video",
              },
              {
                _id: "672754f8b3feb7cdadd5a845",
                name: "Vision of Nelson Mandela.",
                content: "Destruction of Apartheid.",
                type: "text",
              },
            ],
          },
        ],
      },
      {
        _id: "67272e215a79bcfccd9bc9ec",
        name: "English 2nd",
        description: "A powerful frontend library by Facebook.",
        courseId: "67270d2a8481df2630cb2bd1",
        topics: [
          {
            _id: "67274a4c8fc9b9516a06e083",
            name: "Parts of Speech",
            description: "Single Page Application",
            subjectId: "67272e215a79bcfccd9bc9ef",
            lessons: [
              {
                _id: "672751f8b3feb7c3add5a8s5",
                name: "What is noun ?",
                content: "https://www.youtube.com/watch?v=WZuRkn-LzvE",
                type: "video",
              },
              {
                _id: "67275138b3feb7cdadsd5a845",
                name: "What adjective",
                content: "Modifies noun,pronoun.",
                type: "text",
              },
            ],
          },
        ],
      },
    ],
  },
  // Add more courses if needed
];
