import { useMutation } from "@tanstack/react-query";
import  { AxiosError, AxiosResponse } from "axios";
import { axios } from "../../../api/axios"

import { Board, Todo, User } from "../../../types";
import { requestHeader } from "../../../api/provider";
import { queryClient } from "../../../App";
import { useDispatch } from "react-redux";
import { createNotification } from "../../notification/notificationSlice";

type UpdateTodoRequesBody = {
  title?: string;
  description?: string | undefined;
  dueDate: Date;
  priority?: string | undefined;
  isCompleted?: boolean | undefined;
};
type TodoUpdateResponse = {
  data: Todo;
};
type UpdateTodoDTO = {
  data: {
    todoId: string;
    body: UpdateTodoRequesBody;
  };
};
type CustomResponse = {
  data: TodoUpdateResponse;
  errors: null | string;
  statusCode: number;
  token: string | undefined;
};

const header = requestHeader();

export const updateTodo = ({ data }: UpdateTodoDTO) => {
  return axios.put(
    "/todo/update?todoId=" + data.todoId,
    {
      title: data.body.title,
      description: data.body.description,
      DueDate: new Date(data.body.dueDate),
      priority: data.body.priority,
      isCompleted: data.body.isCompleted,
    },
    header
  );
};

export const useUpdateTodo = ({ sectionId }: { sectionId: string }) => {
  const dispatch = useDispatch();
  return useMutation({
    onMutate: async (updatingTodo: any) => {
      console.log("uf", updatingTodo);
      await queryClient.cancelQueries(["todos", sectionId]);

      const previousTodo = queryClient.getQueryData<AxiosResponse>([
        "todos",
        sectionId,
      ]);

      queryClient.setQueryData(["todos", updatingTodo?.todoId], {
        ...previousTodo,
        ...updatingTodo.data,
        id: updatingTodo?.todoId,
      });
      const previousTodo2 = queryClient.getQueryData<AxiosResponse>([
        "todos",
        sectionId,
      ]);
      console.log("updating", previousTodo2);
      return { previousTodo };
    },
    onError: (_, __, context: any) => {
      if (context?.previousTodo) {
        queryClient.setQueryData(["todos", sectionId], context.previousTodo);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["todos", sectionId]);
      dispatch(createNotification({ type: "success", title: "Todo Updated" }));
    },
    mutationFn: updateTodo,
  });
};
