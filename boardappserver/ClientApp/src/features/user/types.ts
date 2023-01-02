import { User } from "../../types";

export interface IUser {
  entities: User[];
  allUsers: User[];
  mainUser: User | null;
  errors: string;
  loading: boolean;
}

export interface IGetTheUserParameter {
  username: string;
  password: string;
}
export interface IGetTheUserProps {
  reqBody: IGetTheUserParameter;
}
export interface IUserProp {
  firstname: string;
  lastname: string;
  password: string;
  avatar: string;
  email: string;
  username: string;
}

export interface IUpdateUserProps {
  userId: string;
  user: IUserProp;
}

export type KnownError = {
  error: string;
};
