export interface TNote {
  _id: string;
  title: string;
  image: string;
  author: string;
  body: string;
  category: string[];
  tags: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
