"use server";

import { User } from "@/utils/interfaces/user";
import { cookies } from "next/headers";
import fetchWithCredentials from "@/utils/auth/fetchWithCredentials";

export const getUsers = async (): Promise<User[]> => {
  const response = await fetchWithCredentials<User[]>(
    "/users",
    {},
    undefined,
    cookies().get("token")?.value
  );

  return response.data;
};
