import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { axios } from "../../../api/axios"

import { Section, Todo } from "../../../types";
import { requestHeader } from "../../../api/provider";
import { queryClient } from "../../../App";
import { useDispatch } from "react-redux";
import { createNotification } from "../../notification/notificationSlice";

export type RemoveUserFromTodoDTO = {
  todoId: string;
  userId: string;
};
const header = requestHeader();

export const removeUserFromTodo = ({
  todoId,
  userId,
}: RemoveUserFromTodoDTO): Promise<AxiosResponse> => {
  return axios.post(
    "/user/removetodouser?userId=" + userId,
    todoId,
    header
  );
};
type RemoveUserFromTodoWithSectionDTO = {
  sectionId: string;
};
export const useRemoveUserFromTodo = ({
  sectionId,
}: RemoveUserFromTodoWithSectionDTO) => {
  const dispatch = useDispatch();
  return useMutation({
    onMutate: async (updatedTodo) => {
      queryClient.cancelQueries(["todos", sectionId]);
      queryClient.cancelQueries(["getTodo", updatedTodo?.todoId]);

      const previousSections = queryClient.getQueryData<Todo[]>([
        "todos",
        updatedTodo.todoId,
      ]);
      console.log("prev,", previousSections);
      return { previousSections };
    },
    onError: (_, __, context) => {
      if (context?.previousSections) {
        queryClient.setQueryData(
          ["todos", sectionId],
          context.previousSections
        );
      }
    },
    onSuccess: async (updatedTodo) => {
      queryClient.invalidateQueries(["todos", sectionId]);
      console.log("up", updatedTodo);
      queryClient.invalidateQueries({
        queryKey: ["getTodo", updatedTodo?.data.todoId],
      });
      dispatch(
        createNotification({ type: "info", title: "User Removed  From Todo" })
      );
    },
    mutationFn: removeUserFromTodo,
  });
};
