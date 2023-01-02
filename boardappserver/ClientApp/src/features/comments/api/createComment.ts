import { useMutation } from "@tanstack/react-query";
import { axios } from "../../../api/axios"
import { Section } from "../../../types";
import { requestHeader } from "../../../api/provider";
import { queryClient } from "../../../App";
import { useDispatch } from "react-redux";
import { createNotification } from "../../notification/notificationSlice";

export type CreateCommentDTO = {
  data: {
    todoId: string;
    userId: string;
    body: {
      subject: string;
      formFile: string;
    };
  };
};
const header = requestHeader();

export const createComment = ({
  data,
}: CreateCommentDTO): Promise<Section[]> => {
  return axios.post(
    "/api/Comment/create?todoId=" +
      data.todoId +
      "&userId=" +
      data.userId,
    { subject: data.body.subject, formFile: "" }
  );
};
type UseCreateCommentOptions = {
  todoId: string;
};
export const useCreateComment = ({ todoId }: UseCreateCommentOptions) => {
  const dispatch = useDispatch();
  return useMutation({
    onMutate: () => {
      console.log("errrir");

      queryClient.cancelQueries(["comments", todoId]);
      queryClient.cancelQueries(["getCommentsByTodoId", todoId]);

      const previousSections = queryClient.getQueryData<Section[]>([
        "comments",
        todoId,
      ]);

      return { previousSections };
    },
    onError: (_, __, context) => {
      console.log("errrir");
      if (context?.previousSections) {
        queryClient.setQueryData(
          ["comments", todoId],
          context.previousSections
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", todoId]);
      queryClient.invalidateQueries(["getCommentsByTodoId", todoId]);

      dispatch(
        createNotification({ type: "success", title: "New Comment Created" })
      );
    },
    mutationFn: createComment,
  });
};
