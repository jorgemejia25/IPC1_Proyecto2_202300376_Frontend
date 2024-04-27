import { Gender } from "../enums/gender";
import { Role } from "../enums/role";

export interface User {
  role?: Role;
  code: number;
  name: string;
  lastname: string;
  gender: Gender;
  faculty: string;
  career: string;
  email: string;
  password: string;
  _id?: string;
}
