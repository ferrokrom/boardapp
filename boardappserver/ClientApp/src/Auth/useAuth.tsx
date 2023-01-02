import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../types";
import * as usersApi from "./api/login";

interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: any;
  update: (user: User) => void;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) setError(null);
  }, [location.pathname]);

  useEffect(() => {
    usersApi
      .getCurrentUser()
      .then((user: User) => setUser(user))
      .catch((_error: string) => {})
      .finally(() => setLoadingInitial(false));
  }, []);

  function login(username: string, password: string) {
    setLoading(true);
    usersApi
      .loginHandle({ username, password })
      .then((user) => {
        setUser(user);
        navigate("/app");
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }
  function update(updatedUser: User) {
    setUser(updatedUser);
  }

  function logout() {
    usersApi.logoutHandle().then(() => setUser(undefined));
  }
  const memoedValue = useMemo(
    () => ({
      user,
      update,
      loading,
      error,
      login,
      logout,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
