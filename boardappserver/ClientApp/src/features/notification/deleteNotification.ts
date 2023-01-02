import { useMutation, useQuery } from "@tanstack/react-query";
import { axios } from "../../api/axios"
import { useDispatch } from "react-redux";
import { requestHeader } from "../../api/provider";
import { queryClient } from "../../App";
import { Notification } from "../../types";

type UseUsersOptions = {
  notificationId: string;
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
export const deleteNotification = ({
  notificationId,
}: {
  notificationId: string;
}): Promise<CustomResponse> => {
  return axios.delete(
    "/user/deleteNotification?notificationId=" +
      notificationId,
    header
  );
};

export const useDeleteNotification = ({ userId }: { userId: string }) => {
  const dispatch = useDispatch();
  return useMutation({
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries(["getUserNotifications", userId]);
    },
    onError: (_, __, context) => {},
    onSuccess: (data) => {
      queryClient.invalidateQueries(["getUserNotifications", userId]);
    },
    mutationFn: deleteNotification,
  });
};
