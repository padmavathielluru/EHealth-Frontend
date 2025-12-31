import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SettingsTabType = "general" | "reset" | "billing";

interface SettingsState {
    selectedTab: SettingsTabType;
}

const initialState: SettingsState = {
    selectedTab: "general",
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        selectSettingsTab(state, action: PayloadAction<SettingsTabType>) {
            state.selectedTab = action.payload;
        },
    },
});

export const { selectSettingsTab } = settingsSlice.actions;
export default settingsSlice.reducer;