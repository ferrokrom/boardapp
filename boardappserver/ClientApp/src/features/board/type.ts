import { Board, User } from "../../types";

export interface IBoard {
  entities: Board[];
  boardUsers: User[];
  errors: string;
  loading: boolean;
}

export interface ICreateBoardProps {
  userId: string;
  title: string;
  description: string;
  isDefault: boolean;
  users: User;
}
export interface IUpdateBoardProps {
  boardId: string;
  title: string;
  description: string;
  isDefault: boolean;
}
export interface IDeleteBoardProps {
  boardId: string;
}
export interface IRemoveUserFromBoardProps {
  boardid: string;
  user: string;
}
export interface IAddUserToBoardProps {
  boardid: string;
  userId: string;
}
export type KnownError = {
  error: string;
};
