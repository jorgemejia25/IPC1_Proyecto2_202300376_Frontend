"use server";

import { PostCategory } from "@/utils/enums/post-category";
import { cookies } from "next/headers";
import fetchWithCredentials from "@/utils/auth/fetchWithCredentials";
import { z } from "zod";

const schema = z.object({
  description: z.string().min(1, { message: "La descripción es requerida" }),
  // message

  category: z.nativeEnum(PostCategory, {
    errorMap: () => ({
      message: "La categoría es requerida",
    }),
  }),
  anonymous: z.string().optional(),
});

export interface CreatePostResponse {
  errors: Record<string, string>;
  message: string | null;
  success?: boolean;
}

export async function createEntry(
  _: any,
  formData: FormData
): Promise<CreatePostResponse> {
  if (formData.get("anonymous") === "") {
    formData.set("anonymous", "true");
  } else {
    formData.set("anonymous", "false");
  }

  const validatedFields = schema.safeParse({
    description: formData.get("description"),
    category: formData.get("category"),
    anonymous: formData.get("anonymous"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors as Record<
        string,
        string
      >,
      message: null,
    };
  }

  const token = cookies().get("token")?.value;

  const response = await fetchWithCredentials(
    "/entries",
    {
      method: "POST",
      body: formData,
    },
    undefined,
    token
  );

  return {
    errors: {},
    message: "Post creado exitosamente",
    success: true,
  };
}
