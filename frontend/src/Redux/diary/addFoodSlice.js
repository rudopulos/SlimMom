import { createSlice } from "@reduxjs/toolkit";
import { addFood } from "./addFoodOp";

const addFoodSlice = createSlice({
  name: "addFood",
  initialState: {
    data: {
      calories: 0,
      items: [],
    },
    status: "idle",
    error: null,
  },
  reducers: {
    removeFood: (state, action) => {
      state.data.items.splice(action.payload, 1);
      state.data.calories = state.data.items.reduce(
        (total, item) => total + item.calories,
        0
      );
    },
    resetaddFood: (state) => {
      state.data = [];
      state.status = "idle";
      state.error = null;
    },
    loadSavedaddFood: (state, action) => {
      state.data = action.payload;
      state.status = "succeeded";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFood.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addFood.fulfilled, (state, action) => {
        if (Array.isArray(state.data.items)) {
          state.data.calories += action.payload.calories;
          state.data.items.push(action.payload);
          state.status = "succeeded";
        } else {
          console.error("State.data.items is not an array.");
          // O posibilă soluție pentru a forța items să fie un array
          state.data.items = [];
          state.data.items.push(action.payload);
        }
      })
      .addCase(addFood.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to add food";
      });
  },
});
export const { removeFood, resetaddFood, loadSavedaddFood } =
  addFoodSlice.actions;
export default addFoodSlice.reducer;
