import { useQuery } from "@tanstack/react-query";
import  { AxiosError } from "axios";
import { axios } from "../../../api/axios"

import { Board } from "../../../types";
import { requestHeader } from "../../../api/provider";

type UseBoardsOptions = {
  boardId: string | undefined;
};
type BoardResponse = {
  data: Board[];
};
type CustomResponse = {
  data: BoardResponse;
  errors: null | string;
  statusCode: number;
  token: string | undefined;
};

const header = requestHeader();

export const getBoards = ({
  boardId,
}: {
  boardId: string | undefined;
}): Promise<CustomResponse> => {
  return axios.get(
    "/api/Board/getboard?boardId=" + boardId,
    header
  );
};

export const useBoards = ({ boardId }: UseBoardsOptions) => {
  const { data, isLoading, isError } = useQuery(
    ["boards", boardId],
    () => getBoards({ boardId }),
    {
      enabled: !!boardId,
    }
  );
  if (!boardId) {
    return { data: null, isLoading: false, isError: false };
  }
  return { data, isLoading, isError };
};
