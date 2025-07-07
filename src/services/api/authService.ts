import { ApiResponse, LoginResponseData } from "@/types/api";
import { apiClient } from "./apiClient";

export async function loginUser(
  username: string,
  password: string
): Promise<ApiResponse<LoginResponseData>> {
  return await apiClient<ApiResponse<LoginResponseData>>("/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function registerUser(
  email: string,
  password: string,
  username: string
): Promise<ApiResponse<LoginResponseData>> {
  return await apiClient<ApiResponse<LoginResponseData>>("/register", {
    method: "POST",
    body: JSON.stringify({ email, password, username }),
  });
}
