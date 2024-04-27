"use server";

import { cookies } from "next/headers";
import fetchWithCredentials from "@/utils/auth/fetchWithCredentials";

export interface JsonEntryResponse {
  errors: Record<string, string>;
  message: string | null;
  success?: boolean;
}

export async function loadEntriesFromJson(
  _: any,
  formData: FormData
): Promise<JsonEntryResponse> {
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
      "/entries/json",
      {
        method: "POST",
        body: formData,
      },
      undefined,
      token
    );

    return {
      errors: {},
      message: "Entradas cargadas correctamente",
      success: true,
    };
  } catch (error) {
    return {
      errors: {},
      message: "Ocurrió un error al cargar las entradas",
    };
  }
}
