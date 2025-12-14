import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "./patientSlice"; // ← important
import counterReducer from "./counterSlice";
import dateReducer from "./dateSlice";
import calendarReducer from "./calendarSlice";
import cardsReducer from "./cardsSlice";
import inboxReducer from "./inboxSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cards:cardsReducer,
    date: dateReducer,
    calendar: calendarReducer,
    patients: patientReducer, 
    inbox: inboxReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
