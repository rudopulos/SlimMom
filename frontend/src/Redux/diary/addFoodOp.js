import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addFood = createAsyncThunk(
  "addFood/add",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/addFood", credentials);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
