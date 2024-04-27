"use server";

import { cookies } from "next/headers";
import fetchWithCredentials from "@/utils/auth/fetchWithCredentials";

export interface JsonUserResponse {
  errors: Record<string, string>;
  message: string | null;
  success?: boolean;
}

export async function loadUsersFromJson(
  _: any,
  formData: FormData
): Promise<JsonUserResponse> {
  try {
    const token = cookies().get("token")?.value;

    const file = formData.get("file");

    if (!file) {
      return {
        errors: {},
        message: "No se ha enviado el archivo",
      };
    }

    await fetchWithCredentials(
      "/users/json",
      {
        method: "POST",
        body: formData,
      },
      undefined,
      token
    );

    return {
      errors: {},
      message: "Usuarios cargados correctamente",
      success: true,
    };
  } catch (error) {
    return {
      errors: {},
      message: "Ocurrió un error al cargar los usuarios",
    };
  }
}
