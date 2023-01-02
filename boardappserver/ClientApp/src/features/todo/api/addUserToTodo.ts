import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { axios } from "../../../api/axios"

import { Section, Todo } from "../../../types";
import { requestHeader } from "../../../api/provider";
import { queryClient } from "../../../App";
import { useDispatch } from "react-redux";
import { createNotification } from "../../notification/notificationSlice";

export type AddUserToTodoDTO = {
  todoId: string;
  userId: string;
};
const header = requestHeader();

export const addUserToDo = ({
  todoId,
  userId,
}: AddUserToTodoDTO): Promise<AxiosResponse> => {
  return axios.post(
    "/user/AddTodoToUser?userId=" + userId,
    todoId,
    header
  );
};
type AddUserToTodoWithSectionDTO = {
  sectionId: string;
};
export const useAddUserToDo = ({ sectionId }: AddUserToTodoWithSectionDTO) => {
  const dispatch = useDispatch();
  return useMutation({
    onMutate: (updatedTodo) => {
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
    onSuccess: (updatedTodo) => {
      queryClient.invalidateQueries(["todos", sectionId]);
      console.log("up", updatedTodo);
      queryClient.invalidateQueries({
        queryKey: ["getTodo", updatedTodo?.data.todoId],
      });
      dispatch(
        createNotification({ type: "success", title: "New User Added To Todo" })
      );
    },
    mutationFn: addUserToDo,
  });
};
