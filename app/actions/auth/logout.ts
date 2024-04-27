"use server"

import { cookies } from "next/headers";

export const logout = () => {
  cookies().set("token", "");
};
