
import { createSlice } from "@reduxjs/toolkit";
import { NotificationConst } from "../constants/NotificationsConstants";
import { notificationType,notificationInterface } from "../interfaces/NotificationInterface";
import { getPatientsByType } from "../services/patientService";


interface NotificationState {
  allNotifications: notificationInterface[];
  filtered: notificationInterface[];
  activeTab: "all" | "appointments" | "chat" | "app";
  
}

const initialState: NotificationState = {
  allNotifications: NotificationConst,
  filtered: NotificationConst,
  activeTab: "all",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
   setTab(state, action) {
  state.activeTab = action.payload;
  // state.filtered = getPatientsByType(action.payload, state.allNotifications);
    },
  },
});

export const { setTab } = notificationSlice.actions;
export default notificationSlice.reducer;
