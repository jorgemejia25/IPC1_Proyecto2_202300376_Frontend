"use server";

import { PostComment } from "@/utils/interfaces/comment";
import { cookies } from "next/headers";
import fetchWithCredentials from "@/utils/auth/fetchWithCredentials";

export const getComments = async (postId: string): Promise<PostComment[]> => {
  const response = await fetchWithCredentials<PostComment[]>(
    `/entries/comments?id=${postId}`,
    {},
    undefined,
    cookies().get("token")?.value
  );

  return response.data;
};
