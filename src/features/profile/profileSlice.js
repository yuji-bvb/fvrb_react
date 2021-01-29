import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiUrl = process.env.REACT_APP_DEV_API_URL;

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
    createData.append("favCourse", "お気に入りコース");
    createData.append("favGear", "お気に入りギア");
    createData.append("favShop", "お気に入り店");
    const res = await axios.post(`${apiUrl}api/profile/`, createData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

export const fetchAsyncGetMyProfile = createAsyncThunk(
  "myprofile/get",
  async () => {
    const res = await axios.get(`${apiUrl}api/myprofile/`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data[0];
  }
);

export const fetchAsyncGetProfile = createAsyncThunk(
  "profile/get",
  async () => {
    const res = await axios.get(`${apiUrl}api/profile/`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

export const fetchAsyncUpdateProfile = createAsyncThunk(
  "myprofile/put",
  async (profile) => {
    const uploadData = new FormData();
    uploadData.append("nickName", profile.nickName);
    uploadData.append("frameBrand", profile.frameBrand);
    uploadData.append("frame", profile.frame);
    uploadData.append("component", profile.component);
    uploadData.append("compo", profile.compo);
    uploadData.append("wheelBrand", profile.wheelBrand);
    uploadData.append("wheel", profile.wheel);
    uploadData.append("favCourse", profile.favCourse);
    uploadData.append("favGear", profile.favGear);
    uploadData.append("favShop", profile.favShop);
    uploadData.append("purchase", profile.purchase);
    profile.img && uploadData.append("img", profile.img, profile.img.name);

    const res = await axios.put(
      `${apiUrl}api/profile/${profile.id}/`,
      uploadData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncGetFriendList = createAsyncThunk(
  "friend/get",
  async () => {
    const res = await axios.get(`${apiUrl}api/approval/`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

export const fetchAsyncGetInbox = createAsyncThunk("inbox/get", async () => {
  const res = await axios.get(`${apiUrl}api/inbox/`, {
    headers: {
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data;
});

export const fetchAsyncGetFrameBrand = createAsyncThunk(
  "frame/get",
  async () => {
    const res = await axios.get(`${apiUrl}api/frame/`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

export const fetchAsyncCreateFrameBrand = createAsyncThunk(
  "frame/post",
  async (item) => {
    const res = await axios.post(
      `${apiUrl}api/frame/`,
      { item: item },
      {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncGetwheelBrand = createAsyncThunk(
  "wheel/get",
  async () => {
    const res = await axios.get(`${apiUrl}api/wheel/`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

export const fetchAsyncCreatewheelBrand = createAsyncThunk(
  "wheel/post",
  async (item) => {
    const res = await axios.post(
      `${apiUrl}api/wheel/`,
      { item: item },
      {
        headers: {
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

export const fetchAsyncDeleteProfile = createAsyncThunk(
  "profile/delete",
  async (id) => {
    await axios.delete(`${apiUrl}api/profile/${id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return id;
  }
);

export const fetchAsyncRequestFriend = createAsyncThunk(
  "friend/post",
  async (askData) => {
    const res = await axios.post(`${apiUrl}api/approval/`, askData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

export const fetchAsyncSendDM = createAsyncThunk(
  "message/post",
  async (uploadDM) => {
    const res = await axios.post(`${apiUrl}api/message/`, uploadDM, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  }
);

export const fetchAsyncApproval = createAsyncThunk(
  "approval/put",
  async (uploadData) => {
    const uploadDataAsk = new FormData();
    uploadDataAsk.append("askTo", uploadData.askTo);
    uploadDataAsk.append("approved", true);

    const res = await axios.put(
      `${apiUrl}api/approval/${uploadData.id}/`,
      uploadDataAsk,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.localJWT}`,
        },
      }
    );
    return res.data;
  }
);

const initialState = {
  profile: {
    id: 0,
    nickName: "",
    frameBrand: 0,
    frameBrand_item: "",
    frame: "",
    component: "",
    component_name: "",
    compo: "",
    wheelBrand: 0,
    wheelBrand_item: "",
    wheel: "",
    purchase: "",
    userPro: 0,
    created_on: "",
    img: null,
    liked: [0],
    favCourse: "",
    favGear: "",
    favShop: "",
  },
  editedProfile: {
    id: 0,
    nickName: "",
    frameBrand: 0,
    frame: "",
    component: "",
    compo: "",
    wheelBrand: 0,
    wheel: "",
    purchase: "",
    img: null,
    favCourse: "",
    favGear: "",
    favShop: "",
  },
  profiles: [
    {
      id: 0,
      nickName: "",
      frameBrand: "",
      frameBrand_item: "",
      frame: "",
      component: "",
      component_name: "",
      compo: "",
      wheelBrand: "",
      wheelBrand_item: "",
      wheel: "",
      purchase: "",
      userPro: 0,
      created_on: "",
      img: null,
      liked: [0],
      favCourse: "",
      favGear: "",
      favShop: "",
    },
  ],
  askList: [
    {
      id: 0,
      askFrom: 0,
      askTo: 0,
      approval: false,
    },
  ],
  askListFull: [
    {
      id: 0,
      askFrom: 0,
      askTo: 0,
      approval: false,
    },
  ],
  inbox: [
    {
      id: 0,
      sender: 0,
      receiver: 0,
      message: "",
    },
  ],
  frameBrand: [
    {
      id: 1,
      item: "",
    },
  ],
  wheelBrand: [
    {
      id: 1,
      item: "",
    },
  ],
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    newRequest(state, action) {
      const friend = {
        ...state,
        askTo: action.payload.profile.userPro,
        approval: true,
      };
      return friend;
    },
    editProfile(state, action) {
      state.editedProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetMyProfile.fulfilled, (state, action) => {
      return {
        ...state,
        profile: action.payload,
        editedProfile: action.payload,
      };
    });
    builder.addCase(fetchAsyncGetProfile.fulfilled, (state, action) => {
      return {
        ...state,
        profiles: action.payload,
      };
    });
    builder.addCase(fetchAsyncUpdateProfile.fulfilled, (state, action) => {
      return {
        ...state,
        profiles: state.profiles.map((prof) =>
          prof.id === action.payload.id ? action.payload : prof
        ),
      };
    });
    builder.addCase(fetchAsyncGetFriendList.fulfilled, (state, action) => {
      return {
        ...state,
        askList: action.payload.filter((ask) => {
          return state.profile.userPro === ask.askTo;
        }),
        askListFull: action.payload,
      };
    });
    builder.addCase(fetchAsyncGetInbox.fulfilled, (state, action) => {
      return {
        ...state,
        inbox: action.payload,
      };
    });
    builder.addCase(fetchAsyncGetFrameBrand.fulfilled, (state, action) => {
      return {
        ...state,
        frameBrand: action.payload,
      };
    });
    builder.addCase(fetchAsyncCreateFrameBrand.fulfilled, (state, action) => {
      return {
        ...state,
        frameBrand: [...state.frameBrand, action.payload],
      };
    });
    builder.addCase(fetchAsyncGetwheelBrand.fulfilled, (state, action) => {
      return {
        ...state,
        wheelBrand: action.payload,
      };
    });
    builder.addCase(fetchAsyncCreatewheelBrand.fulfilled, (state, action) => {
      return {
        ...state,
        wheelBrand: [...state.wheelBrand, action.payload],
      };
    });
    builder.addCase(fetchAsyncDeleteProfile.fulfilled, (state, action) => {
      window.location.href = "/";
      return {
        ...state,
        profiles: state.profiles.filter((p) => p.id !== action.payload),
        profile: initialState.profile,
      };
    });
    builder.addCase(fetchAsyncRequestFriend.fulfilled, (state, action) => {
      return {
        ...state,
        askListFull: [...state.askListFull, action.payload],
      };
    });
    builder.addCase(fetchAsyncApproval.fulfilled, (state, action) => {
      return {
        ...state,
        askList: state.askList.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    });
  },
});

export const { newRequest, editProfile } = profileSlice.actions;

export const selectProfile = (state) => state.profile.profile;
export const selectEditedProfile = (state) => state.profile.editedProfile;
export const selectProfiles = (state) => state.profile.profiles;
export const selectAskList = (state) => state.profile.askList;
export const selectAskListFull = (state) => state.profile.askListFull;
export const selectInbox = (state) => state.profile.inbox;
export const selectFrameBrand = (state) => state.profile.frameBrand;
export const selectWheelBrand = (state) => state.profile.wheelBrand;
export const selectComponent = (state) => state.profile.component;

export default profileSlice.reducer;
