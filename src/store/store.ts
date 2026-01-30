import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "./patientSlice"; 
import counterReducer from "./counterSlice";
import dateReducer from "./dateSlice";
import calendarReducer from "./calendarSlice";
import cardsReducer from "./cardsSlice";
import inboxReducer from "./inboxSlice";
import settingsReducer from "./settingsSlice";
import dashboardTabsReducer from "./dashboardTabsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cards:cardsReducer,
    date: dateReducer,
    calendar: calendarReducer,
    patients: patientReducer, 
    inbox: inboxReducer,
    settings: settingsReducer,
    dashboardTabs: dashboardTabsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
