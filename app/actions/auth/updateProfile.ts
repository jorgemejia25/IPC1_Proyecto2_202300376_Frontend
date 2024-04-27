"use server";

import { Gender } from "@/utils/enums/gender";
import { cookies } from "next/headers";
import fetchWithCredentials from "@/utils/auth/fetchWithCredentials";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  lastname: z.string().min(1, { message: "El apellido es requerido" }),
  faculty: z.string().optional(),
  career: z.string().optional(),
  email: z.string().email({ message: "El correo electrónico no es válido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .refine(
      (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        ),
      {
        message: "La contraseña es muy débil",
      }
    ),
});

export interface UpdateProfileResponse {
  errors: Record<string, string>;
  message: string | null;
  success?: boolean;
}

export async function updateProfile(
  prevState: any,
  formData: FormData
): Promise<UpdateProfileResponse> {
  const validatedFields = schema.safeParse({
    name: formData.get("name"),
    lastname: formData.get("lastname"),
    gender: formData.get("gender"),
    faculty: formData.get("faculty"),
    career: formData.get("career"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors as Record<
        string,
        string
      >,
      message: "El usuario no pudo ser creado",
    };
  }

  const token = cookies().get("token")?.value;

  const response = await fetchWithCredentials(
    "/users/profile",
    {
      method: "POST",
      body: JSON.stringify(validatedFields.data),
      headers: {
        "Content-Type": "application/json",
      },
    },
    undefined,
    token
  );

  if (response.statusCode !== 201) {
    return {
      errors: {},
      message: "El usuario no pudo ser actualizado",
    };
  }

  return {
    errors: {},
    message: "Usuario actualizado correctamente",
    success: true,
  };
}
