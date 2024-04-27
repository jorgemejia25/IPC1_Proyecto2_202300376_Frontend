import { NextRequest } from "next/server";
import { apiUrl } from "../constants/api";

interface FetchResponse<T> {
  statusCode: number;
  data: T;
  message?: string;
}

export const fetchWithCredentials = async <T>(
  path: string,
  options: RequestInit | undefined = {},
  req: NextRequest | { cookies: any } | undefined,
  userToken?: string
): Promise<FetchResponse<T>> => {
  const token = userToken ? userToken : req!.cookies.get("token")?.value;

  const response = await makeFetch(
    path,
    {
      ...options,
    },
    token!
  );

  return {
    statusCode: response.status,
    data: response.data,
    message: response.data.message,
  };
};

const makeFetch = async (
  path: string,
  options: RequestInit,
  token: string
): Promise<{
  data: any;
  status: number;
}> => {
  const headers = new Headers(options.headers);

  headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(`${apiUrl}${path}`, { ...options, headers });
  return {
    data: await res.json(),
    status: res.status,
  };
};

export default fetchWithCredentials;
