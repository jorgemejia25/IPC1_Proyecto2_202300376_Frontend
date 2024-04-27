"use server";

import { User } from "@/utils/interfaces/user";
import { cookies } from "next/headers";
import fetchWithCredentials from "@/utils/auth/fetchWithCredentials";

export const getUser = async (id: string): Promise<User> => {
  const response = await fetchWithCredentials<User>(
    `/users/id?id=${id}`,
    {},
    undefined,
    cookies().get("token")?.value
  );

  return response.data;
};
