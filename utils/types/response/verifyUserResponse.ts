import { Role } from "@/utils/enums/role";

export interface VerifyUserResponse {
  code: number;
  role: Role;
  _id: string; 
}
