import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { BoardUser, Section, Todo } from "../../../types";
import { requestHeader } from "../../../api/provider";
import { queryClient } from "../../../App";
import { useDispatch } from "react-redux";
import { createNotification } from "../../notification/notificationSlice";
import { IAddUser } from "../../../components/Board/NewBoard";

export type CreateBoardDTO = {
  data: {
    userId: string;
    body: {
      title: string;
      description: string;
      dueDate: Date;
      isDefault: boolean;
      users: IAddUser[];
    };
  };
};
const header = requestHeader();

export const createBoard = ({
  data,
}: CreateBoardDTO): Promise<AxiosResponse> => {
  console.log("fetching");
  return axios.post(
    "https://localhost:7170/api/Board/createboard?userId=" + data.userId,
    {
      Title: data.body.title,
      Description: data.body.description,
      dueDate: data.body.dueDate,
      isDefault: data.body.isDefault,
      Users: data.body.users.map((user) => user.userId),
    },
    header
  );
};

export const useCreateBoard = ({ userId }: { userId: string }) => {
  const dispatch = useDispatch();
  return useMutation({
    onMutate: async (newTodo) => {},
    onError: (_, __, context) => {},
    onSuccess: (data) => {
      queryClient.invalidateQueries(["getBoardByUserId", userId]);
      dispatch(
        createNotification({ type: "success", title: "New Board Created" })
      );
    },
    mutationFn: createBoard,
  });
};
