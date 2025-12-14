import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cardsService } from "../services/cardsService";
import { cardsState } from "../interfaces";

const initialState: cardsState = {
  list: [],
  loading: false,
  error: null,
};

// ✅ Async Thunk
export const fetchUsers = createAsyncThunk("users", async () => {
  return await cardsService.getAll();
});

// ✅ Slice
const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching users";
      });
  },
});

export default cardsSlice.reducer;
