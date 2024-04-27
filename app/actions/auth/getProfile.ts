"use server";

import { User } from "@/utils/interfaces/user";
import { cookies } from "next/headers";
import fetchWithCredentials from "@/utils/auth/fetchWithCredentials";

export const getProfile = async () => {
  const response = await fetchWithCredentials<User>(
    "/users/profile",
    {},
    undefined,
    cookies().get("token")?.value
  );

  return response.data;
};
