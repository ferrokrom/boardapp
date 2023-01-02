import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { requestHeader } from "../../api/provider";
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
export const getUserNotifications = ({
  userId,
}: {
  userId: string;
}): Promise<CustomResponse> => {
  return axios.get(
    "https://localhost:7170/user/getnotifications?userId=" + userId
  );
};

export const useGetUserNotifications = ({ userId }: UseUsersOptions) => {
  const { data, isLoading, isError, isFetched } = useQuery({
    queryKey: ["getUserNotifications", userId],
    queryFn: () => getUserNotifications({ userId }),
  });

  return { data, isLoading, isError, isFetched };
};
