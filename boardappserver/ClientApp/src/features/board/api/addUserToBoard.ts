import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Section, Board } from "../../../types";
import { requestHeader } from "../../../api/provider";
import { queryClient } from "../../../App";
import { useDispatch } from "react-redux";
import { createNotification } from "../../notification/notificationSlice";

export type AddUserToBoardDTO = {
  boardId: string;
  userId: string;
};
const header = requestHeader();

export const addUserBoard = ({
  boardId,
  userId,
}: AddUserToBoardDTO): Promise<AxiosResponse> => {
  return axios.post(
    "https://localhost:7170/api/Board/addusertoboard?userId=" +
      userId +
      "&boardid=" +
      boardId,
    header
  );
};
type AddUserToBoardWithSectionDTO = {
  boardId: string;
};
export const useAddUserBoard = ({ boardId }: AddUserToBoardWithSectionDTO) => {
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
      console.log("up", updatedBoard);
      queryClient.invalidateQueries({
        queryKey: ["getBoard", updatedBoard?.data.boardId],
      });
      dispatch(
        createNotification({
          type: "success",
          title: "New User Added To Board",
        })
      );
    },
    mutationFn: addUserBoard,
  });
};
