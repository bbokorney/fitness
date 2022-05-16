import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { Activity } from "./models";
import ActivitiesAPI from "./activitiesAPI";

const api = new ActivitiesAPI();

export interface ActivitiesState {
  activities: Activity[];
  status: "idle" | "loading";
  errorMessage: string;
}

const initialState: ActivitiesState = {
  activities: [],
  status: "idle",
  errorMessage: "",
};

export const listActivities = createAsyncThunk(
  "activities/listActivities",
  async () => api.list(),
);

export const upsertActivity = createAsyncThunk(
  "activities/upsertActivity",
  async (a: Activity) => api.upsert(a),
);

export const activitiesSlice = createSlice({
  name: "activities",
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(listActivities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(listActivities.fulfilled, (state, action) => {
        state.status = "idle";
        state.activities = action.payload;
      })
      .addCase(listActivities.rejected, (state) => {
        state.status = "idle";
      })

      .addCase(upsertActivity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(upsertActivity.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(upsertActivity.rejected, (state) => {
        state.status = "idle";
      });
  },
});

export const selectActivites = (state: RootState) => state.activities;

export default activitiesSlice.reducer;
