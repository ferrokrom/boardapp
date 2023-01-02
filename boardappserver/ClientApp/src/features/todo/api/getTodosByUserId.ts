import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Todo } from "../../../types";
import { requestHeader } from "../../../api/provider";

type UseUsersOptions = {
  userId: string;
};
type TodoResponse = {
  data: Todo[];
};
type CustomResponse = {
  data: TodoResponse;
  errors: null | string;
  statusCode: number;
  token: string | undefined;
};
const header = requestHeader();
export const getTodosByUserId = ({
  userId,
}: {
  userId: string;
}): Promise<CustomResponse> => {
  return axios.get(
    "https://localhost:7170/todo/gettodosbyuserid?userId=" + userId,
    header
  );
};

export const useGetTodosByUser = ({ userId }: UseUsersOptions) => {
  const { data, isLoading, isError, isFetched } = useQuery({
    queryKey: ["getTodosByUserId", userId],
    queryFn: () => getTodosByUserId({ userId }),
  });

  return { data, isLoading, isError, isFetched };
};
