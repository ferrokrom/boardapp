import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { requestHeader } from "../../api/provider";
import {
  ICreateSectionProps,
  IDeleteSectionProps,
  IGetSections,
  ISection,
  IUpdateSectionProps,
  KnownError,
} from "./types";
const header = requestHeader();

export const GetSections = createAsyncThunk(
  "sections/getSections",
  async function getTheSections(
    { boardId }: IGetSections,
    { rejectWithValue }
  ) {
    try {
      var response = await axios.get(
        "https://localhost:7170/get?boardId=" + boardId,
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
export const CreateSection = createAsyncThunk(
  "sections/createSection",
  async function getTheSections(
    { boardId, title }: ICreateSectionProps,
    { rejectWithValue }
  ) {
    try {
      var response = await axios.post(
        "https://localhost:7170/create?boardId=" + boardId,
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
export const UpdateSection = createAsyncThunk(
  "sections/updateSection",
  async function getTheSections(
    { sectionId, title, description, color, dueDate }: IUpdateSectionProps,
    { rejectWithValue }
  ) {
    try {
      var response = await axios.put(
        "https://localhost:7170/update?sectionId=" + sectionId,
        { title, description, color, dueDate },
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
export const DeleteSection = createAsyncThunk(
  "sections/deleteSection",
  async function getTheSections(
    { sectionId }: IDeleteSectionProps,
    { rejectWithValue }
  ) {
    try {
      var header = requestHeader();
      var response = await axios.delete(
        "https://localhost:7170/delete?sectionId=" + sectionId,
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

export const sectionSlice = createSlice({
  name: "sections",
  initialState: {
    entities: [],
    loading: false,
  } as ISection,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetSections.fulfilled, (state, action) => {
        state.entities = [...action.payload];
        state.loading = false;
      })
      .addCase(GetSections.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(CreateSection.fulfilled, (state, action) => {
        state.entities.push(action.payload);
      })
      .addCase(DeleteSection.fulfilled, (state, action) => {
        state.entities = state.entities.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(UpdateSection.fulfilled, (state, action) => {
        for (var i of state.entities) {
          if (i.id === action.payload.id) {
            i.title = action.payload.title;
            i.description = action.payload.description;
            i.color = action.payload.color;
            i.duedate = action.payload.duedate;
            i.updatedAt = action.payload.updateAt;
          }
        }
      });
  },
});

export default sectionSlice.reducer;
