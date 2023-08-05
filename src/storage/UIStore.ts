import reduxStore, { LoadingUISlice, RootState } from "./reduxStore";

class UIStore {
  static showLoadingOverlay() {
    reduxStore.dispatch(LoadingUISlice.actions.showLoading());
  }
  static hideLoadingOverlay() {
    reduxStore.dispatch(LoadingUISlice.actions.hideLoading());
  }

  static isLoadingUIVisibleSelector = (state: RootState) => state.LoadingUI > 0;
}

export default UIStore;
