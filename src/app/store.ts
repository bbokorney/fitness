import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import activitiesReducer from "../features/activities/activitiesSlice";
import alertReducer from "../features/alert/alertSlice";
import authReduer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
