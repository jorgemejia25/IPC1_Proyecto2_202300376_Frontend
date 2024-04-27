"use server";

import { cookies } from "next/headers";
import fetchWithCredentials from "@/utils/auth/fetchWithCredentials";

export interface DeleteUserResponse {
  message: string;
  success: boolean;
  state?: boolean;
}

export async function deleteUser(userId: string) {
  try {
    const response = await fetchWithCredentials<DeleteUserResponse>(
      `/users?id=${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
      undefined,
      cookies().get("token")?.value
    );

    console.log(response);

    return {
      message: "User deleted",
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
