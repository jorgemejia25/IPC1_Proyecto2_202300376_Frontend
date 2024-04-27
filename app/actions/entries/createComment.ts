"use server";

import { cookies } from "next/headers";
import fetchWithCredentials from "@/utils/auth/fetchWithCredentials";

export interface PostCommentResponse {
  errors: Record<string, string>;
  message: string | null;
  success?: boolean;
}

export async function createComment(postId: string, content: string) {
  const token = cookies().get("token")?.value;

  const response = await fetchWithCredentials(
    `/entries/comments?id=${postId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    },
    undefined,
    token
  );

  if (response.statusCode !== 201) {
    return {
      errors: {
        server: "Ocurrió un error en el servidor",
      },
      message: "El comentario no pudo ser creado",
    };
  }

  return {
    errors: {},
    message: "Comentario creado exitosamente",
    success: true,
  };
}
