import { useQuery } from "@tanstack/react-query";
import  { AxiosError } from "axios";
import { axios } from "../../../api/axios"

import { Section } from "../../../types";
import { requestHeader } from "../../../api/provider";

type UseBoardsOptions = {
  boardId: string | undefined;
};
type BoardResponse = {
  data: Section[];
};
type CustomResponse = {
  data: BoardResponse;
  errors: null | string;
  statusCode: number;
  token: string | undefined;
};

const header = requestHeader();

export const getSections = ({
  boardId,
}: {
  boardId: string | undefined;
}): Promise<CustomResponse> => {
  return axios.get("/get?boardId=" + boardId, header);
};

export const useSections = ({ boardId }: UseBoardsOptions) => {
  return useQuery({
    queryKey: ["sections", boardId],
    queryFn: () => getSections({ boardId }),
  });
};
