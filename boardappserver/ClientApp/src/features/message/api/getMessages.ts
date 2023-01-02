import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Board, Message, Todo } from "../../../types";
import { requestHeader } from "../../../api/provider";

type UseSectionsOptions = {
  userId: string;
};
type TodoResponse = {
  data: Message[];
};
type CustomResponse = {
  data: TodoResponse;
  errors: null | string;
  statusCode: number;
  token: string | undefined;
};
const header = requestHeader();
export const getMessages = ({
  userId,
}: {
  userId: string;
}): Promise<CustomResponse> => {
  return axios.get(
    "https://localhost:7170/user/getmessages?userId=" + userId,
    header
  );
};

export const useGetReceivedMessages = ({ userId }: UseSectionsOptions) => {
  const { data, isLoading, isError, isFetched } = useQuery({
    queryKey: ["getReceivedMessages", userId],
    queryFn: () => getMessages({ userId }),
  });

  return { data, isLoading, isError, isFetched };
};
