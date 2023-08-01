import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    privKey: null,
    profile: null,
  },
  reducers: {
    setToken: (state, action) => {
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
const LoadingUIStore = createSlice({
  name: "LoadingUI",
  initialState: 0,
  reducers: {
    showLoading: state => (state += 1),
    hideLoading: state => (state -= 1),
  },
});

const rootReducer = combineReducers({
  user: userSlice.reducer,
  LoadingUI: LoadingUIStore.reducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export default configureStore({
  reducer: rootReducer,
});
export { LoadingUIStore, userSlice };
