import { useMutation } from "@tanstack/react-query";
import  { AxiosResponse } from "axios";
import {  Board } from "../../../types";
import { axios } from "../../../api/axios"

import { requestHeader } from "../../../api/provider";
import { queryClient } from "../../../App";
import { useDispatch } from "react-redux";
import { createNotification } from "../../notification/notificationSlice";

export type RemoveUserFromBoardDTO = {
  boardId: string;
  userId: string;
};
const header = requestHeader();

export const removeUserFromBoard = ({
  boardId,
  userId,
}: RemoveUserFromBoardDTO): Promise<AxiosResponse> => {
  return axios.post(
    "/api/Board/removeuserfromboard?userId=" +
      userId +
      "&boardid=" +
      boardId,
    header
  );
};
type RemoveUserFromBoardPropDTO = {
  boardId: string;
};
export const useRemoveUserFromBoard = ({
  boardId,
}: RemoveUserFromBoardPropDTO) => {
  const dispatch = useDispatch();
  return useMutation({
    onMutate: (updatedBoard) => {
      queryClient.cancelQueries(["boards", boardId]);
      queryClient.cancelQueries(["getBoard", updatedBoard?.boardId]);

      const previousSections = queryClient.getQueryData<Board[]>([
        "Boards",
        updatedBoard.boardId,
      ]);
      console.log("prev,", previousSections);
      return { previousSections };
    },
    onError: (_, __, context) => {
      if (context?.previousSections) {
        queryClient.setQueryData(["boards", boardId], context.previousSections);
      }
    },
    onSuccess: (updatedBoard) => {
      queryClient.invalidateQueries(["boards", boardId]);
      queryClient.invalidateQueries({
        queryKey: ["getBoard", updatedBoard?.data.boardId],
      });
      dispatch(
        createNotification({
          type: "success",
          title: "The User Removed From The Board",
        })
      );
    },
    mutationFn: removeUserFromBoard,
  });
};
