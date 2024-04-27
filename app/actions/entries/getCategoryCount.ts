"use server";

import { cookies } from "next/headers";
import fetchWithCredentials from "@/utils/auth/fetchWithCredentials";

export interface CategoryCountResponse {
  _id: string;
  count: number;
}

export const getCategoryCount = async (): Promise<CategoryCountResponse[]> => {
  const response = await fetchWithCredentials<CategoryCountResponse[]>(
    "/entries/categories",
    {},
    undefined,
    cookies().get("token")?.value
  );

  return response.data;
};
