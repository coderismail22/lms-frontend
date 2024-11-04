// Project Type
export type TProject = {
  _id: string;
  title: string;
  technologies: string[];
  coverImage: string;
  detailedImages: string[];
  description: string;
  duration: string;
  liveLink: string;
  githubLink: string;
  priorityMarkId: string;
  tags: string[];
  comments: string[];
  isDeleted: boolean;
};

export type Projects = TProject[];
