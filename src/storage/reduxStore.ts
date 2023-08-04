import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";

import { UserCategory, UserData } from "../types/User";

type userStateType = {
  token: string | null | undefined;
  privKey: string | null | undefined;
  profile: UserData | null | undefined;
};

const defaultUserState: userStateType = {
  token: undefined,
  privKey: undefined,
  profile: undefined,
};
const userSlice = createSlice({
  name: "user",
  initialState: defaultUserState,
  reducers: {
    setToken: (state, action) => {
      if (action.payload === null)
        return {
          token: null,
          privKey: null,
          profile: state.profile,
        };

      return {
        token: action.payload.token,
        privKey: action.payload.privKey,
        profile: state.profile,
      };
    },
    setProfile: (state, action) => {
      return {
        token: state.token,
        privKey: state.privKey,
        profile: action.payload,
      };
    },
    clear: state => {
      state.token = null;
      state.privKey = null;
      state.profile = null;

      return state;
    },
  },
});
const defaultUserCategoryState: UserCategory | undefined = undefined;
const userCategorySlice = createSlice({
  name: "userCategory",
  initialState: defaultUserCategoryState,
  reducers: {
    setUserCategory: (state, action) => {
      return action.payload;
    },
  },
});
const LoadingUISlice = createSlice({
  name: "LoadingUI",
  initialState: 0,
  reducers: {
    showLoading: state => (state += 1),
    hideLoading: state => (state -= 1),
  },
});

const rootReducer = combineReducers({
  user: userSlice.reducer,
  LoadingUI: LoadingUISlice.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export default configureStore({
  reducer: rootReducer,
});
export { LoadingUISlice, userCategorySlice, userSlice };
