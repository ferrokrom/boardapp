import { useMutation } from "@tanstack/react-query";
import { axios } from "../../../api/axios"

import { Todo } from "../../../types";
import { requestHeader } from "../../../api/provider";
import { queryClient } from "../../../App";
import { useDispatch } from "react-redux";
import { createNotification } from "../../notification/notificationSlice";

export type CreateTodoDTO = {
  data: {
    userId: string;
    body: {
      receiver: string[];
      subject: string;
      body: string;
    };
  };
};
const header = requestHeader();

export const createMessage = ({ data }: CreateTodoDTO): Promise<Todo[]> => {
  console.log("fetching");
  return axios.post(
    "/user/createmessage?senderId=" + data.userId,
    {
      receivers: data.body.receiver,
      subject: data.body.subject,
      body: data.body.body,
    },
    header
  );
};
type UseCreateTodoOptions = {
  userId: string;
};
export const useCreateMessage = ({ userId }: UseCreateTodoOptions) => {
  const dispatch = useDispatch();
  return useMutation({
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries(["getReceivedMessages", userId]);
    },
    onError: (_, __, context) => {},
    onSuccess: (data) => {
      queryClient.invalidateQueries(["getReceivedMessages", userId]);
      dispatch(
        createNotification({ type: "success", title: "New Message Sent" })
      );
    },
    mutationFn: createMessage,
  });
};
