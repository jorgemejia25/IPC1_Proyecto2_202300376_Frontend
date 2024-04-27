import { Entry } from "./entry";
import { User } from "./user";

export interface PostComment {
  _id: string;
  content: string;
  createdAt: Date;
  user: User;
  post: Entry;
}
