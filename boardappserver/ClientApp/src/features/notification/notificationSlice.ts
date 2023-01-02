import { createSlice, nanoid } from "@reduxjs/toolkit";

export type Notification = {
  id: string;
  title: string;
  type: "info" | "warning" | "success" | "error";
  message?: string;
};

export type INotifications = {
  notifications: Notification[];
};
export const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
  } as INotifications,
  reducers: {
    createNotification: (state, action) => {
      const newNotification = {
        id: nanoid(),
        title: action.payload.title,
        type: action.payload.type,
        message: action.payload.message,
      };
      state.notifications.push(newNotification);
    },
    deleteNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { createNotification, deleteNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
