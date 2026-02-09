import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountStatus } from "../utils/SubmitStatusConstant";

interface AuthState {
  accountStatus: AccountStatus;
}

const initialState: AuthState = {
  accountStatus: "PENDING",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccountStatus(state, action: PayloadAction<AccountStatus>) {
      state.accountStatus = action.payload;
    },
  },
});

export const { setAccountStatus } = authSlice.actions;
export default authSlice.reducer;
