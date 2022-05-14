import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import activitiesReducer from "../features/activities/activitiesSlice";
import alertReducer from "../features/alert/alertSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    activities: activitiesReducer,
    alert: alertReducer,
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
