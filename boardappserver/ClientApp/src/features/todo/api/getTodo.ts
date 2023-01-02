import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { axios } from "../../../api/axios"
import { Board, Todo } from "../../../types";
import { requestHeader } from "../../../api/provider";

type UseTodoOptions = {
  todoId: string;
};
type TodoResponse = {
  data: Todo;
};
type CustomResponse = {
  data: TodoResponse;
  errors: null | string;
  statusCode: number;
  token: string | undefined;
};
const header = requestHeader();
export const getTodo = ({
  todoId,
}: {
  todoId: string;
}): Promise<CustomResponse> => {
  return axios.get(
    "/todo/getTodo?todoId=" + todoId,
    header
  );
};

export const useGetTodo = ({ todoId }: UseTodoOptions) => {
  const { data, isLoading, isError } = useQuery(
    ["getTodo", todoId],
    () => getTodo({ todoId }),
    {
      enabled: !!todoId,
    }
  );
  if (!todoId) {
    return { data: null, isLoading: false, isError: false };
  }
  return { data, isLoading, isError };
};
