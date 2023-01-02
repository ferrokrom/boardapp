import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { requestHeader } from "../../api/provider";
import { IGetTheUserProps, IUpdateUserProps, IUser, KnownError } from "./types";

const header = requestHeader();

export const GetTheUser = createAsyncThunk(
  "users/GetTheUser",
  async ({ reqBody }: IGetTheUserProps, { rejectWithValue }) => {
    const { username, password } = reqBody;
    try {
      const response = await axios.post(`https://localhost:7170/login`, {
        username: username,
        password: password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
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
export const GetUsers = createAsyncThunk(
  "users/GetUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://localhost:7170/user/get",
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
export const UpdateUser = createAsyncThunk(
  "users/UpdateUsers",
  async ({ user, userId }: IUpdateUserProps, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "https://localhost:7170/grgr/todo/update?userId=" + userId,
        {
          Firstname: user.firstname,
          lastname: user.lastname,
          Password: user.password,
          Avatar: user.avatar,
          Email: user.email,
          Username: user.username,
        },
        header
      );
      if (response.status === 200) {
        return response;
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

export const userSlice = createSlice({
  name: "users",
  initialState: {
    entities: [],
    allUsers: [],
    mainUser: null,
    errors: "",
    loading: true,
  } as IUser,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetTheUser.fulfilled, (state, action) => {
        if (typeof action.payload === "object" && action.payload !== null) {
          var newUserObject = action.payload;
          state.mainUser = { ...action.payload };

          state.entities = [newUserObject];

          state.errors = "";
        } else {
          state.errors = action.payload;
        }
      })
      .addCase(GetTheUser.rejected, (state, action) => {
        state.errors = action.payload as string;
      })
      .addCase(GetTheUser.pending, (state, action) => {
        console.log("first", action.payload);
      })

      .addCase(GetUsers.fulfilled, (state, action) => {
        console.log("user,slice", action.payload);
        state.allUsers = [...action.payload];
      });
  },
});

export default userSlice.reducer;
