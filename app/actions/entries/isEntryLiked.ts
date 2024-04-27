"use server";

import { Entry } from "@/utils/interfaces/entry";
import { cookies } from "next/headers";

export const isEntryLikes = async (entry: Entry) => {
  const userId = cookies().get("id")?.value;

  return entry.likes.some((like) => like === userId);
};
