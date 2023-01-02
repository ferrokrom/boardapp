import { BoardUser, TodoUser } from "../../types";

export type LoginCredentialsDTO = {
  username: string;
  password: string;
};
export type UserResponse = {
  data: LoginResponseDTO;
  token: string;
  errors: string;
  statusCode: number;
};
export type LoginResponseDTO = {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  avatar: string;
  email: string;
  role: string;
  todoUsers: TodoUser[];
  boardUsers: BoardUser[];
};
