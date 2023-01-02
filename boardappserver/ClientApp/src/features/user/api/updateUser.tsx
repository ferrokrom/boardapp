import { useQuery, useMutation } from "@tanstack/react-query";
import  { AxiosError } from "axios";
import { axios } from "../../../api/axios"

import { Board, User } from "../../../types";
import { requestHeader } from "../../../api/provider";
import useAuth from "../../../Auth/useAuth";
import { blob } from "stream/consumers";

type UpdateUserRequesBody = {
  username: string | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
  email: string | undefined;
  avatar: File | undefined;
  password: string | undefined;
};
type UserUpdateResponse = {
  data: User;
};
type UpdateUserDTO = {
  data: {
    userId: string;
    body: UpdateUserRequesBody;
  };
};
type CustomResponse = {
  data: UserUpdateResponse;
  errors: null | string;
  statusCode: number;
  token: string | undefined;
};

const header = requestHeader();

export const updateProfile = ({ data }: UpdateUserDTO) => {
  const formData = new FormData();

  if (data.body.firstname) {
    formData.append("Firstname", data.body.firstname);
  }
  if (data.body.lastname) {
    formData.append("lastname", data.body.lastname);
  }
  if (data.body.avatar) {
    formData.append("Avatar", data.body.avatar);
  }
  if (data.body.email) {
    formData.append("Email", data.body.email);
  }
  if (data.body.username) {
    formData.append("Username", data.body.username);
  }
  return axios.put(
    "/user/update?userId=" + data.userId,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const useUpdateUser = () => {
  const { update } = useAuth();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (response) => {
      update(response.data.data);
    },
  });
};
