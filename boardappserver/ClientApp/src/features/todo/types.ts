import { Todo } from "../../types";

export interface IToast {
  color: string;
  message: string;
  isOpen: boolean;
}
export interface ITodo {
  entities: Todo[];
  status: string;
  loading: boolean;
  toast: IToast;
}

export interface IGetTodo {
  sectionId: string;
}
export interface ICreateTodoProps {
  title: string;
  sectionId: string;
}
export interface IUpdateTodoProps {
  todoId: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  isComplete: string;
}
export interface IDeleteTodoProps {
  todoId: string;
  sectionId: string;
}
export interface IAddUserToTodo {
  userId: string;
  todoId: string;
}
export interface IRemoveUserFromTodo {
  userId: string;
  todoId: string;
}
export type KnownError = {
  error: string;
};
