import { USER } from "@/types/user.types";
import { apiService } from "../apiService";
import { authEndpoints } from "./auth.endpoints";

export const loginUser = async (email: string, password: string) => {
  const res = await apiService.post(authEndpoints.login, { email, password });
  return res.data;
};

export const createUser = async (user: Partial<USER>) => {
  const res = await apiService.post(authEndpoints.signUp, user);
  return res.data;
};
