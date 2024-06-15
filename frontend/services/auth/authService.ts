import { apiService } from "../apiService";
import { authEndpoints } from "./auth.endpoints";

export const loginUser = async (email: string, password: string) => {
  const res = await apiService.post(authEndpoints.login, { email, password });
  return res.data;
};
