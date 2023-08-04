import reduxStore, { LoadingUIStore, RootState } from "./reduxStore";

class UIStore {
  static showLoadingOverlay() {
    reduxStore.dispatch(LoadingUIStore.actions.showLoading());
  }
  static hideLoadingOverlay() {
    reduxStore.dispatch(LoadingUIStore.actions.hideLoading());
  }

  static isLoadingUIVisibleSelector = (state: RootState) => state.LoadingUI > 0;
}

export default UIStore;
