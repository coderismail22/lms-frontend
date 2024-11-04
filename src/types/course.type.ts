// src/assets/data/types.ts
export interface Lesson {
  _id: string;
  name: string;
  content: string;
  type: string;
}

export interface Topic {
  _id: string;
  name: string;
  description: string;
  lessons: Lesson[];
}

export interface Subject {
  _id: string;
  name: string;
  description: string;
  topics: Topic[];
}

export interface Course {
  _id: string;
  name: string;
  description: string;
  subjects: Subject[];
}
