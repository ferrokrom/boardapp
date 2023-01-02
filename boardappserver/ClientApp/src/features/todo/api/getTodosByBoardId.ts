import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../api/axios"

import { Todo } from "../../../types";
import { requestHeader } from "../../../api/provider";

type UseBoardsOptions = {
  boardId: string;
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
export const getTodosByBoardId = ({
  boardId,
}: {
  boardId: string;
}): Promise<CustomResponse> => {
  return axios.get(
    "/todo/gettodosbyboardid?boardId=" + boardId,
    header
  );
};

export const useGetTodosByBoard = ({ boardId }: UseBoardsOptions) => {
  const { data, isLoading, isError, isFetched } = useQuery({
    queryKey: ["getTodosByBoardId", boardId],
    queryFn: () => getTodosByBoardId({ boardId }),
  });

  return { data, isLoading, isError, isFetched };
};
