import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Board, Todo, User } from "../../../types";
import { requestHeader } from "../../../api/provider";

type TodoResponse = {
  data: User[];
};
type CustomResponse = {
  data: TodoResponse;
  errors: null | string;
  statusCode: number;
  token: string | undefined;
};
const header = requestHeader();
export const getUsers = (): Promise<CustomResponse> => {
  return axios.get("https://localhost:7170/user/get", header);
};

export const useGetUsers = () => {
  const { data, isLoading, isError } = useQuery(["users"], () => getUsers());

  return { data, isLoading, isError };
};
