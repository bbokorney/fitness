import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { Activity } from "./models";
import ActivitiesAPI from "./activitiesAPI";

const api = new ActivitiesAPI();

type ActivityFormState = "idle" | "loading" | "valid" | "invalid";

export interface ActivitiesState {
  list: {
    activities: Activity[];
    status: "idle" | "loading";
    errorMessage: string;
  }
  form: {
    status: ActivityFormState;
    activity: Activity;
  }
}

const initialState: ActivitiesState = {
  list: {
    activities: [],
    status: "idle",
    errorMessage: "",
  },
  form: {
    status: "invalid",
    activity: {},
  },
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
  reducers: {
    updateFormActivity: (state, action: PayloadAction<Activity>) => {
      state.form.activity = action.payload;
    },
    updateFormStatus: (state, action: PayloadAction<ActivityFormState>) => {
      state.form.status = action.payload;
    },
    clearFormActivity: (state) => {
      state.form = initialState.form;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listActivities.pending, (state) => {
        state.list.status = "loading";
      })
      .addCase(listActivities.fulfilled, (state, action) => {
        state.list.status = "idle";
        state.list.activities = action.payload;
      })
      .addCase(listActivities.rejected, (state) => {
        state.list.status = "idle";
      })

      .addCase(upsertActivity.pending, (state) => {
        state.form.status = "loading";
      })
      .addCase(upsertActivity.fulfilled, (state) => {
        state.form.status = "idle";
      })
      .addCase(upsertActivity.rejected, (state) => {
        state.form.status = "idle";
      });
  },
});

export const { updateFormActivity, updateFormStatus, clearFormActivity } = activitiesSlice.actions;

export const selectActivitiesList = (state: RootState) => state.activities.list;
export const selectActivitiesForm = (state: RootState) => state.activities.form;
export const selectActivityById = (state: RootState, id: string) => state
  .activities.list.activities.find((val) => val.id === id);

export default activitiesSlice.reducer;
