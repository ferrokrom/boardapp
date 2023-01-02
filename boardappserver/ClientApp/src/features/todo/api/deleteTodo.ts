import { useMutation } from "@tanstack/react-query";
import  { AxiosResponse } from "axios";
import { axios } from "../../../api/axios"

import { Section, Todo } from "../../../types";
import { requestHeader } from "../../../api/provider";
import { queryClient } from "../../../App";
import { useDispatch } from "react-redux";
import { createNotification } from "../../notification/notificationSlice";

const header = requestHeader();

export const deleteTodo = ({
  todoId,
}: {
  todoId: string;
}): Promise<Section[]> => {
  return axios.delete(
    "/todo/delete?todoId=" + todoId,
    header
  );
};

export const useDeleteTodo = ({ sectionId }: { sectionId: string }) => {
  const dispatch = useDispatch();
  return useMutation({
    onMutate: async (deletedTodo) => {
      const previousTodos = queryClient.getQueryData<AxiosResponse>([
        "todos",
        sectionId,
      ]);
      console.log("prevtodo", previousTodos);

      return { previousTodos };
    },
    onError: (_, __, context: any) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos", sectionId]);
      dispatch(createNotification({ type: "warning", title: "Todo Deleted" }));
    },
    mutationFn: deleteTodo,
  });
};
