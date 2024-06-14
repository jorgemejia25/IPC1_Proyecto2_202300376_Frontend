"use server";

import { Entry } from "@/utils/interfaces/entry";
import { cookies } from "next/headers";
import fetchWithCredentials from "@/utils/auth/fetchWithCredentials";

export const getEntries = async (): Promise<Entry[]> => {
  const response = await fetchWithCredentials<Entry[]>(
    "/entries",
    {},
    undefined,
    cookies().get("token")?.value
  );

  console.log(response.data);

  return response.data;
};
