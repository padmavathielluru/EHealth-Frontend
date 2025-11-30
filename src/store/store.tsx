import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "./patientSlice"; // ← important
import counterReducer from "./counterSlice";
import dateReducer from "./dateSlice";
import calendarReducer from "./calendarSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    date: dateReducer,
    calendar: calendarReducer,
    patients: patientReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
