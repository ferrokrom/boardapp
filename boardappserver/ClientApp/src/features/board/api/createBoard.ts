import { useMutation } from "@tanstack/react-query";
import  {  AxiosResponse } from "axios";
import { requestHeader } from "../../../api/provider";
import { queryClient } from "../../../App";
import { useDispatch } from "react-redux";
import { axios } from "../../../api/axios"

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
    "/api/Board/createboard?userId=" + data.userId,
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
