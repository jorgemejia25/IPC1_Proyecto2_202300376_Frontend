"use server";

import { cookies } from "next/headers";
import fetchWithCredentials from "@/utils/auth/fetchWithCredentials";

export interface LikeEntryResponse {
  message: string;
  success: boolean;
  state?: boolean;
}

export async function likeEntry(postId: string) {
  try {
    const response = await fetchWithCredentials<LikeEntryResponse>(
      `/entries/like?id=${postId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      },
      undefined,
      cookies().get("token")?.value
    );

    return {
      message: "Like toggled",
      success: true,
      state: response.data.state,
    };
  } catch (error) {
    return {
      message: "An error occurred",
      success: false,
    };
  }
}
