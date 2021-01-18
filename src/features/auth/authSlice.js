import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiUrl = process.env.REACT_APP_DEV_API_URL;

export const fetchAsyncLogin = createAsyncThunk("auth/post", async (auth) => {
  const res = await axios.post(`${apiUrl}authen/jwt/create`, auth, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.data;
});

export const fetchAsyncCreate = createAsyncThunk(
  "create/post",
  async (auth) => {
    const res = await axios.post(`${apiUrl}api/create/`, auth, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  }
);

const initialState = {
  isLoginView: true,
  isLoading: false,
  notLogin: false,
  isRegister: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    fetchCredStart(state) {
      state.isLoading = true;
    },
    fetchCredEnd(state) {
      state.isLoading = false;
    },
    toggleMode(state) {
      state.isLoginView = !state.isLoginView;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      localStorage.setItem("localJWT", action.payload.access);
      state.notLogin = false;
      action.payload.access && (window.location.href = "/profiles");
    });
    builder.addCase(fetchAsyncLogin.rejected, (state, action) => {
      state.notLogin = true;
    });
    builder.addCase(fetchAsyncCreate.fulfilled, (state, action) => {
      state.isRegister = true;
    });
  },
});

export const { fetchCredStart, fetchCredEnd, toggleMode } = authSlice.actions;

export const selectIsLoginView = (state) => state.auth.isLoginView;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectNotLogin = (state) => state.auth.notLogin;
export const selectIsRegister = (state) => state.auth.isRegister;
export default authSlice.reducer;
