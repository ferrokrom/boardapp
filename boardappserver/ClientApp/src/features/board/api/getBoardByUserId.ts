import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Board } from "../../../types";
import { requestHeader } from "../../../api/provider";

type UseBoardsByUserIdOptions = {
  userId: string;
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

export const getBoardByUserId = ({
  userId,
}: {
  userId: string | undefined;
}): Promise<CustomResponse> => {
  return axios.get(
    "https://localhost:7170/api/Board/getboardbyuserid?userId=" + userId,
    header
  );
};

export const useGetBoardsByUserId = ({ userId }: UseBoardsByUserIdOptions) => {
  const { data, isLoading, isError } = useQuery(
    ["getBoardByUserId", userId],
    () => getBoardByUserId({ userId }),
    {
      enabled: !!userId,
    }
  );
  if (!userId) {
    return { data: null, isLoading: false, isError: false };
  }
  return { data, isLoading, isError };
};
