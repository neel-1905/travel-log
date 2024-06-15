import axios from "axios";
import { getSession } from "next-auth/react";

export const apiService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

apiService.interceptors.request.use(async function (config) {
  const session = await getSession();
  const token = session?.user?.access_token;
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
