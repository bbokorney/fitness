import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import activitiesReducer from "../activities/activitiesSlice";
import alertReducer from "../alert/alertSlice";
import authReduer from "../auth/authSlice";
import formDialogReducer from "../formDialog/formDialogSlice";

export const store = configureStore({
  reducer: {
    activities: activitiesReducer,
    alert: alertReducer,
    auth: authReduer,
    formDialog: formDialogReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
