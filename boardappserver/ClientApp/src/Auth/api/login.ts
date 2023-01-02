import axios, { AxiosResponse } from "axios";
import { LoginCredentialsDTO } from "./types";
import storage from "../../utils/storage";

export const loginWithUsernameAndPassword = (
  data: LoginCredentialsDTO
): Promise<AxiosResponse> => {
  const { username, password } = data;
  return axios.post("https://localhost:7170/api/login", {
    username,
    password,
  });
};
export async function loginHandle(data: LoginCredentialsDTO) {
  console.log(data);

  const response = await loginWithUsernameAndPassword(data);
  console.log(response);

  if (response.status === 200) {
    const token = response.data.token;
    storage.setToken(token);
    storage.setUser(response.data.data);
  }
  return response.data.data;
}
export async function logoutHandle() {
  await storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
}
export async function getCurrentUser() {
  return storage.getUser();
}
