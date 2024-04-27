import { User } from "./user";

export interface Entry {
  _id: string;
  description: string;
  category: string;
  image?: string;
  anonymous?: boolean;
  createdAt: Date;
  user: User;
  likes: User[] | String[];
  postComments: Comment[];
}
