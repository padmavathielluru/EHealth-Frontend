import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DashboardTabType = "total" | "new" | "consultation";

interface DashboardTabsState {
    selectedTab: DashboardTabType;
}

const initialState: DashboardTabsState = {
    selectedTab: "total",
};

const dashboardTabsSlice = createSlice({
    name: "dashboardTabs",
    initialState,
    reducers: {
        selectDashboardTab: ( state, action: PayloadAction<DashboardTabType>) => {
            state.selectedTab = action.payload;
        },},
});

export const { selectDashboardTab } =
    dashboardTabsSlice.actions;

export default dashboardTabsSlice.reducer;