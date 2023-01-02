import { useMutation } from "@tanstack/react-query";
import { axios } from "../../../api/axios"

import {  Todo } from "../../../types";
import { requestHeader } from "../../../api/provider";
import { queryClient } from "../../../App";
import { useDispatch } from "react-redux";
import { createNotification } from "../../notification/notificationSlice";

export type CreateTodoDTO = {
  messageId: string;
};
const header = requestHeader();

export const updateMessage = ({
  messageId,
}: CreateTodoDTO): Promise<Todo[]> => {
  console.log("fetching");
  return axios.get(
    "/user/markasread?messageId=" + messageId,

    header
  );
};
type UseCreateTodoOptions = {
  userId: string;
};
export const useUpdateMessageAsRead = ({ userId }: UseCreateTodoOptions) => {
  return useMutation({
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries(["getReceivedMessages", userId]);
    },
    onError: (_, __, context) => {},
    onSuccess: (data) => {
      queryClient.invalidateQueries(["getReceivedMessages", userId]);
    },
    mutationFn: updateMessage,
  });
};
