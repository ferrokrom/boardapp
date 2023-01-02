import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { requestHeader } from "../../api/provider";
import {
  IAddUserToTodo,
  ICreateTodoProps,
  IDeleteTodoProps,
  IGetTodo,
  IRemoveUserFromTodo,
  ITodo,
  IUpdateTodoProps,
  KnownError,
} from "./types";
import { Todo } from "../../types";

const header = requestHeader();
export const GetTodos = createAsyncThunk(
  "todos/getTheTodos",
  async function getTodos({ sectionId }: IGetTodo, { rejectWithValue }) {
    try {
      var response = await axios.get(
        "https://localhost:7170/todo/get?sectionId=" + sectionId,
        header
      );
      if (response.status === 200) {
        return response.data.data;
      }
    } catch (err) {
      const error = err as AxiosError<KnownError>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const CreateTodo = createAsyncThunk(
  "todos/AddTodos",
  async function addTodo(
    { title, sectionId }: ICreateTodoProps,
    { rejectWithValue }
  ) {
    try {
      var response = await axios.post(
        "https://localhost:7170/todo/create?sectionId=" + sectionId,
        { title: title },
        header
      );
      if (response.status === 200) {
        return response.data.data;
      }
    } catch (err) {
      const error = err as AxiosError<KnownError>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const UpdateTodo = createAsyncThunk(
  "todos/updateTodos",
  async function updateTodo(
    {
      todoId,
      title,
      description,
      dueDate,
      priority,
      isComplete,
    }: IUpdateTodoProps,
    { rejectWithValue }
  ) {
    try {
      console.log("update");
      const response = await axios.put(
        "https://localhost:7170/todo/update?todoId=" + todoId,
        {
          id: todoId,
          title: title,
          description: description,
          dueDate: new Date(dueDate).toISOString(),
          priority: priority,
          isCompleted: isComplete,
        },
        header
      );
      if (response.status === 200) {
        return response.data.data;
      }
    } catch (err) {
      const error = err as AxiosError<KnownError>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const DeleteTodo = createAsyncThunk(
  "todos/deleteTodos",
  async function deleteTodo(
    { todoId, sectionId }: IDeleteTodoProps,
    { rejectWithValue }
  ) {
    try {
      var response = await axios.delete(
        "https://localhost:7170/todo/delete?todoId=" + todoId,
        header
      );

      if (response.status === 200) {
        return { todoId, sectionId };
      }
    } catch (err) {
      const error = err as AxiosError<KnownError>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const AddUserToTodo = createAsyncThunk(
  "todos/AddUserToTodo",
  async function addUserToTodo(
    { userId, todoId }: IAddUserToTodo,
    { rejectWithValue }
  ) {
    try {
      console.log("todo", todoId);
      var response = await axios.post(
        "https://localhost:7170/user/AddTodoToUser?userId=" + userId,
        todoId,
        {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      const error = err as AxiosError<KnownError>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const RemoveUserFromTodo = createAsyncThunk(
  "todos/RemoveUserToTodo",
  async function addUserToTodo(
    { userId, todoId }: IRemoveUserFromTodo,
    { rejectWithValue }
  ) {
    try {
      console.log("todo", todoId);
      var response = await axios.post(
        "https://localhost:7170/user/removetodouser?userId=" + userId,
        todoId,
        {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        return response.data;
      }
    } catch (err) {
      const error = err as AxiosError<KnownError>;
      if (!error.response) {
        throw err;
      }
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState: {
    entities: [],
    status: "idle",
    loading: true,
    toast: {
      isOpen: false,
      message: "",
      color: "",
    },
  } as ITodo,
  reducers: {
    CloseToast: (state, action) => {
      state.toast = { ...state.toast, isOpen: false };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(GetTodos.fulfilled, (state, action) => {
        var i = action.payload as Todo[];
        const res1 = i.filter(
          (item1) => !state.entities.find((item2) => item1.id === item2.id)
        );
        state.status = "succeded";
        state.entities.push(...res1);
        state.loading = false;
      })
      .addCase(GetTodos.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(CreateTodo.fulfilled, (state, action) => {
        state.toast = {
          color: "rgb(56, 142, 60)",
          message: "New Task Added",
          isOpen: true,
        };
        state.entities.push(action.payload);
      })
      .addCase(CreateTodo.pending, (state, action) => {
        console.log("pending");
      })
      .addCase(AddUserToTodo.fulfilled, (state, action) => {
        for (var eachTodo of state.entities) {
          if (eachTodo.id === action.payload.todoId) {
            eachTodo.todoUsers.push(action.payload);
          }
        }
      })
      .addCase(RemoveUserFromTodo.fulfilled, (state, action) => {
        for (var eachTodo of state.entities) {
          if (eachTodo.id === action.payload.todoId) {
            var x = eachTodo.todoUsers.filter(
              (item) =>
                item.userId !== action.payload.userId &&
                item.todoId !== action.payload.todoId
            );
            eachTodo.todoUsers = [...x];
          }
        }
      })

      .addCase(DeleteTodo.fulfilled, (state, action) => {
        const { todoId } = action.payload as IDeleteTodoProps;
        state.entities = state.entities.filter((item) => item.id !== todoId);
        state.toast = {
          color: "#f7bbc6",
          message: "Task Deleted",
          isOpen: true,
        };
      })
      .addCase(UpdateTodo.fulfilled, (state, action) => {
        for (var eachTodo of state.entities) {
          if (eachTodo.id === action.payload.id) {
            eachTodo.title = action.payload.title;
            eachTodo.priority = action.payload.priority;
            eachTodo.duedate = action.payload.duedate;
            eachTodo.isCompleted = action.payload.isCompleted;
            eachTodo.description = action.payload.description;
            eachTodo.updatedAt = action.payload.updatedAt;
          }
        }
      }),
});

export const { CloseToast } = todoSlice.actions;
export default todoSlice.reducer;
