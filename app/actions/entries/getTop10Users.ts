"use server";

import { User } from "@/utils/interfaces/user";
import { cookies } from "next/headers";
import fetchWithCredentials from "@/utils/auth/fetchWithCredentials";

export interface UserCountResponse {
  _id: string;
  count: number;
}

export const getTop10Users = async (): Promise<UserCountResponse[]> => {
  const response = await fetchWithCredentials<UserCountResponse[]>(
    "/entries/users",
    {},
    undefined,
    cookies().get("token")?.value
  );

  console.log(response.data);

  return response.data;
};
