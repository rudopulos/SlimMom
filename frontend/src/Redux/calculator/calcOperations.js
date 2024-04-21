import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const submitForm = createAsyncThunk(
  "formData/submitForm",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/calculate-calories", credentials);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
