import { useMutation } from "@tanstack/react-query";
import  { AxiosError, AxiosResponse } from "axios";
import { axios } from "../../../api/axios"
import { Section, Todo } from "../../../types";
import { requestHeader } from "../../../api/provider";
import { queryClient } from "../../../App";
import { useDispatch } from "react-redux";
import { createNotification } from "../../notification/notificationSlice";

export type CreateTodoDTO = {
  sectionId: string;
  title: string;
};
const header = requestHeader();

export const createTodo = ({
  sectionId,
  title,
}: CreateTodoDTO): Promise<Todo[]> => {
  console.log("fetching");
  return axios.post(
    "/todo/create?sectionId=" + sectionId,
    { title },
    header
  );
};
type UseCreateTodoOptions = {
  sectionId: string;
};
export const useCreateTodo = ({ sectionId }: UseCreateTodoOptions) => {
  const dispatch = useDispatch();
  return useMutation({
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries(["todos", sectionId]);
    },
    onError: (_, __, context) => {},
    onSuccess: (data) => {
      queryClient.invalidateQueries(["todos", sectionId]);
      dispatch(
        createNotification({ type: "success", title: "New Todo Created" })
      );
    },
    mutationFn: createTodo,
  });
};
