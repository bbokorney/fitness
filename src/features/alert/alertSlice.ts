import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface AlertState {
  type: "none"| "info" | "error";
  message: string;
}

const initialState: AlertState = {
  type: "none",
  message: "",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    alertInfo: (state, action: PayloadAction<string>) => {
      state.type = "info";
      state.message = action.payload;
    },
    alertError: (state, action: PayloadAction<string>) => {
      state.type = "error";
      state.message = action.payload;
    },
    clearAlertState: (state) => {
      state.type = "none";
      state.message = "";
    },
  },
});

export const { alertInfo, alertError, clearAlertState } = alertSlice.actions;

export const selectAlert = (state: RootState) => state.alert;

export default alertSlice.reducer;
