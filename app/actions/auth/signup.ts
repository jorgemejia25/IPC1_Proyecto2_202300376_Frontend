"use server";

import { Gender } from "@/utils/enums/gender";
import { apiUrl } from "@/utils/constants/api";
import { z } from "zod";

const schema = z.object({
  code: z
    .number()
    .min(1, { message: "El código es requerido" })
    .refine((value) => Number.isInteger(value), {
      message: "El código debe ser un número entero",
    }),
  name: z.string().min(1, { message: "El nombre es requerido" }),
  lastname: z.string().min(1, { message: "El apellido es requerido" }),
  gender: z.nativeEnum(Gender),
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

export interface SignupFormResponse {
  errors: Record<string, string>;
  message: string | null;
  success?: boolean;
}

export async function signUpUser(
  prevState: any,
  formData: FormData
): Promise<SignupFormResponse> {
  const validatedFields = schema.safeParse({
    code: Number(formData.get("code")),
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

  if (formData.get("password") !== formData.get("confirmPassword")) {
    return {
      errors: {
        confirmPassword: "Las contraseñas no coinciden",
      },
      message: "El usuario no pudo ser creado",
    };
  }

  const response = await fetch(apiUrl + "/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields.data),
  });

  if (!response.ok) {
    return {
      errors: {
        server: "Ocurrió un error en el servidor",
      },
      message: "El usuario no pudo ser creado",
    };
  }

  return {
    success: true,
    message: "El usuario fue creado exitosamente",
    errors: {},
  };
}
