import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { requestHeader } from "../../api/provider";
import { queryClient } from "../../App";
import { Notification } from "../../types";

type UseUsersOptions = {
  userId: string;
};
type NotificationResponse = {
  data: Notification[];
};
type CustomResponse = {
  data: NotificationResponse;
  errors: null | string;
  statusCode: number;
  token: string | undefined;
};
const header = requestHeader();
export const getUserNotificationsMarkAsRead = ({
  userId,
}: {
  userId: string;
}): Promise<CustomResponse> => {
  return axios.put(
    "https://localhost:7170/user/getnotificationsmarkedread?userId=" + userId,
    header
  );
};

export const useGetUserNotificationsMarkedAsRead = ({
  userId,
}: UseUsersOptions) => {
  const dispatch = useDispatch();
  return useMutation({
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries(["getUserNotifications", userId]);
    },
    onError: (_, __, context) => {},
    onSuccess: (data) => {
      queryClient.invalidateQueries(["getUserNotifications", userId]);
    },
    mutationFn: getUserNotificationsMarkAsRead,
  });
};
