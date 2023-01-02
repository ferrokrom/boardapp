import { useQuery } from "@tanstack/react-query";
import { axios } from "../../../api/axios"

import { Message, Todo } from "../../../types";
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
    "/user/getsentmessages?userId=" + userId,
    header
  );
};

export const useGetSentMessages = ({ userId }: UseSectionsOptions) => {
  const { data, isLoading, isError, isFetched } = useQuery({
    queryKey: ["getSentMessages", userId],
    queryFn: () => getMessages({ userId }),
  });

  return { data, isLoading, isError, isFetched };
};
