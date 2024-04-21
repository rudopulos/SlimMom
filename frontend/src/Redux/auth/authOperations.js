import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { clearToken, setToken } from "./authSlice";

axios.defaults.baseURL = "http://localhost:3000/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/users/signup", credentials);

      setAuthHeader(res.data.token);

      localStorage.setItem("authToken", res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/users/login", credentials);
      thunkAPI.dispatch(setToken(res.data.token));
      setAuthHeader(res.data.token);

      localStorage.setItem("authToken", res.data.token);
      console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      delete axios.defaults.headers.common["Authorization"];

      localStorage.removeItem("authToken");

      thunkAPI.dispatch(clearToken());

      console.log("logged out");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  }
);
