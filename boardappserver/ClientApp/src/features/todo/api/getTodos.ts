import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Board, Todo } from "../../../types";
import { requestHeader } from "../../../api/provider";

type UseSectionsOptions = {
  sectionId: string;
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
export const getTodos = ({
  sectionId,
}: {
  sectionId: string;
}): Promise<CustomResponse> => {
  return axios.get(
    "https://localhost:7170/todo/get?sectionId=" + sectionId,
    header
  );
};

export const useTodos = ({ sectionId }: UseSectionsOptions) => {
  const { data, isLoading, isError, isFetched } = useQuery({
    queryKey: ["todos", sectionId],
    queryFn: () => getTodos({ sectionId }),
  });

  return { data, isLoading, isError, isFetched };
};
