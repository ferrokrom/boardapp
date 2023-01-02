import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { requestHeader } from "../../api/provider";
import {
  IAddUserToBoardProps,
  IBoard,
  ICreateBoardProps,
  IDeleteBoardProps,
  IRemoveUserFromBoardProps,
  IUpdateBoardProps,
  KnownError,
} from "./type";

const header = requestHeader();

export const CreateBoard = createAsyncThunk(
  "board/CreateBoard",
  async function createBoard(
    { userId, title, description, isDefault, users }: ICreateBoardProps,
    { rejectWithValue }
  ) {
    try {
      var response = await axios.post(
        "https://localhost:7170/user/createboard?userId=" + userId,
        {
          Title: title,
          Description: description,
          isDefault: isDefault,
          Users: users,
        },
        header
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
export const UpdateBoard = createAsyncThunk(
  "board/updateBoard",
  async function createBoard(
    { boardId, title, description, isDefault }: IUpdateBoardProps,
    { rejectWithValue }
  ) {
    try {
      var response = await axios.put(
        "https://localhost:7170/api/Board/updateboard?boardid=" + boardId,
        {
          Title: title,
          Description: description,
          isDefault: isDefault,
        },
        header
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
export const DeleteBoard = createAsyncThunk(
  "board/DeleteBoard",
  async function deleteBoard(
    { boardId }: IDeleteBoardProps,
    { rejectWithValue }
  ) {
    try {
      var response = await axios.delete(
        "https://localhost:7170/api/Board/delete?boardid=" + boardId,

        header
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
export const RemoveUserFromBoard = createAsyncThunk(
  "board/RemoveUserFromBoard",
  async function deleteBoard(
    { user, boardid }: IRemoveUserFromBoardProps,
    { rejectWithValue }
  ) {
    try {
      var response = await axios.delete(
        "https://localhost:7170/api/Board/removeuserfromboard?boardId=" +
          boardid +
          "&userid=" +
          user,
        header
      );
      if (response.status === 200) {
        return { user, boardid };
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
export const AddUserToBoard = createAsyncThunk(
  "board/AddUserToBoard",
  async function createBoard(
    { userId, boardid }: IAddUserToBoardProps,
    { rejectWithValue }
  ) {
    try {
      console.log("Error Occured", userId);
      var response = await axios.post(
        "https://localhost:7170/api/Board/addusertoboard?userId=" +
          userId +
          "&boardid=" +
          boardid,
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
export const GetUserBoards = createAsyncThunk(
  "board/getUserBoards",
  async function getUserBoard(
    { boardId }: IDeleteBoardProps,
    { rejectWithValue }
  ) {
    try {
      console.log("Error Occured", boardId);
      var response = await axios.get(
        "https://localhost:7170/api/Board/getboardusers?boardId=" + boardId,
        header
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
export const boardSlice = createSlice({
  name: "boards",
  initialState: {
    entities: [],
    boardUsers: [],
    errors: "",
    loading: true,
  } as IBoard,
  reducers: {
    GetTheBoards: (state, action) => {
      state.loading = false;
      action.payload.ownerUser[0].boardUsers.map((item: any) =>
        state.entities.push(item.board)
      );
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(AddUserToBoard.fulfilled, (state, action) => {
        console.log("board slice", action.payload);
        state.loading = false;
        state.boardUsers.push(action.payload);
      })
      .addCase(CreateBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.entities.push(action.payload.data);
      })
      .addCase(UpdateBoard.fulfilled, (state, action) => {
        state.loading = false;
        console.log("board slice", action.payload);
        state.entities = [action.payload.data];
      })
      .addCase(UpdateBoard.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload as string;
      })
      .addCase(DeleteBoard.fulfilled, (state, action) => {
        console.log("delete", action.payload);
        state.loading = false;
        state.entities = state.entities.filter(
          (item: any) => item.id !== action.payload.data.id
        );
      })
      .addCase(RemoveUserFromBoard.fulfilled, (state, action) => {
        console.log("delete", action.payload);
        const { user } = action.payload as IRemoveUserFromBoardProps;
        state.loading = false;
        state.boardUsers = [...state.boardUsers.filter((bu) => bu.id !== user)];
      })
      .addCase(GetUserBoards.fulfilled, (state, action) => {
        console.log(action.payload);
        state.boardUsers = [...action.payload.data];
      });
  },
});

export const { GetTheBoards } = boardSlice.actions;
export default boardSlice.reducer;
