import { createSlice } from "@reduxjs/toolkit";
import { submitForm } from "./calcOperations";

const formDataSlice = createSlice({
  name: "formData",
  initialState: {
    data: {},
    status: "idle",
    error: null,
  },
  reducers: {
    resetFormData: (state) => {
      state.data = {};
      state.status = "idle";
      state.error = null;
    },
    loadSavedFormData: (state, action) => {
      state.data = action.payload;
      state.status = "succeeded";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitForm.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { resetFormData, loadSavedFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
