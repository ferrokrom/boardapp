import { LoginResponseDTO } from "../Auth/api/types";

const storagePrefix = "boardapp";

const storage = {
  getToken: () => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}token`) as string
    );
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
    window.localStorage.removeItem(`${storagePrefix}user`);
  },
  setUser: (user: LoginResponseDTO) => {
    window.localStorage.setItem(`${storagePrefix}user`, JSON.stringify(user));
  },
  getUser: () => {
    return JSON.parse(
      window.localStorage.getItem(`${storagePrefix}user`) as string
    );
  },
};

export default storage;
