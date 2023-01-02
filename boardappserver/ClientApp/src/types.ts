export interface MessageReceiver {
  messageId: string;
  message: Message;
  userId: string;
  isRead: true;
  user: User;
}
export interface Message {
  id: string;
  userNotifications: null;
  subject: string;
  body: string;
  createdAt: Date;
  sender: User;
  senderId: string;
  receiverId: string;
  receivers: MessageReceiver[];
  isRead: boolean;
  fromFile: string | null;
}
export interface Notification {
  id: string;
  userNotifications: null;
  message: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  subject: string;
  formFile: string;
  createdDate: Date;
  sender: User;
  todo: Todo;
  updatedDate: Date;
}
export interface Board {
  id: string;
  title: string;
  description: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
  duedate: Date;
  boardUsers: BoardUser[];
  sections: Section[];
}
export interface BoardUser {
  user: User;
  userId: string;
  board: Board;
  boardId: string;
}
export interface User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  duedate: Date;
  comments: Comment[];
  avatar: string;
  email: string;
  role: string;
  todoUsers: TodoUser[];
  boardUsers: BoardUser[];
}
export interface TodoUser {
  user: User;
  userId: string;
  todo: Todo;
  todoId: string;
}
export interface Todo {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  duedate: Date;
  todoUsers: TodoUser[];
  section: Section;
  priority: string;
  comments: Comment[];
}

export interface Section {
  id: string;
  title: string;
  description: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  duedate: Date;
  todos: Todo[];
  board: Board;
}
