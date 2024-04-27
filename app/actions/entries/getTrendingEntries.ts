"use server";

import { Entry } from "@/utils/interfaces/entry";
import { cookies } from "next/headers";
import fetchWithCredentials from "@/utils/auth/fetchWithCredentials";

export const getTrendingEntries = async (): Promise<Entry[]> => {
  const response = await fetchWithCredentials<Entry[]>(
    "/entries/trending",
    {},
    undefined,
    cookies().get("token")?.value
  );

  return response.data;
};
