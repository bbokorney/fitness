import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import activitiesReducer from "../activities/activitiesSlice";
import alertReducer from "../alert/alertSlice";
import authReduer from "../auth/authSlice";

export const store = configureStore({
  reducer: {
    activities: activitiesReducer,
    alert: alertReducer,
    auth: authReduer,
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
