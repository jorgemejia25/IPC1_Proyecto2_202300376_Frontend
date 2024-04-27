"use server";

import { apiUrl } from "@/utils/constants/api";
import { cookies } from "next/headers";

export interface LoginResponse {
  message: string | null;
  success?: boolean;
}

export async function login(
  prevState: any,
  formData: FormData
): Promise<LoginResponse> {
  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: +formData.get("code")!,
        password: formData.get("password"),
      }),
      cache: "no-store",
    });

    const data = await response.json();

    cookies().set("token", data.token);

    if (response.ok) {
      return {
        message: data.message,
        success: true,
      };
    }

    return {
      message: data.message,
    };
  } catch (error) {
    console.log(error);

    return {
      message: "Error al iniciar sesión",
    };
  }
}
