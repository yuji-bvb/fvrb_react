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

export const fetchAsynvCreateProfile = createAsyncThunk(
  "createProfile/post",
  async () => {
    const createData = new FormData();
    createData.append("nickName", "名前");
    createData.append("frameBrand", 1);
    createData.append("frame", "フレーム");
    createData.append("component", "1");
    createData.append("compo", "コンポ");
    createData.append("wheelBrand", 1);
    createData.append("wheel", "ホイール");
    createData.append("purchase", "2014-07-15");
    createData.append("favCourse", "nariki");
    createData.append("favGear", "giro");
    createData.append("favShop", "8823 at Fussa");
    const res = await axios.post(`${apiUrl}api/profile/`, createData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

const initialState = {
  isLoginView: true,
  isLoading: false,
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
      action.payload.access && (window.location.href = "/profiles");
    });
    builder.addCase(fetchAsyncCreate.fulfilled, (state, action) => {
      action.payload.access && (window.location.href = "/profiles");
    });
  },
});

export const { fetchCredStart, fetchCredEnd, toggleMode } = authSlice.actions;

export const selectIsLoginView = (state) => state.auth.isLoginView;
export const selectIsLoading = (state) => state.auth.isLoading;
export default authSlice.reducer;
