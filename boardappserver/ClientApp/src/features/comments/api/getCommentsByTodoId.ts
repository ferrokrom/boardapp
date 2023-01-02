import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../api/axios"

import { Comment, Todo } from "../../../types";
import { requestHeader } from "../../../api/provider";

type UseBoardsOptions = {
  todoId: string;
};
type TodoResponse = {
  data: Comment[];
};
type CustomResponse = {
  data: TodoResponse;
  errors: null | string;
  statusCode: number;
  token: string | undefined;
};
const header = requestHeader();
export const getCommentsByTodoId = ({
  todoId,
}: {
  todoId: string;
}): Promise<CustomResponse> => {
  return axios.get(
    "/api/Comment/getcommentsbytodoid?todoId=" + todoId,
    header
  );
};

export const useGetCommentsByTodo = ({ todoId }: UseBoardsOptions) => {
  const { data, isLoading, isError, isFetched } = useQuery({
    queryKey: ["getCommentsByTodoId", todoId],
    queryFn: () => getCommentsByTodoId({ todoId }),
  });

  return { data, isLoading, isError, isFetched };
};
