"use server";

import { Entry } from "@/utils/interfaces/entry";
import { cookies } from "next/headers";
import fetchWithCredentials from "@/utils/auth/fetchWithCredentials";

export const getEntry = async (id: string): Promise<Entry> => {
  const response = await fetchWithCredentials<Entry>(
    `/entries/id?id=${id}`,
    {},
    undefined,
    cookies().get("token")?.value
  );

  return response.data;
};
