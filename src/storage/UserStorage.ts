import { UserData } from "../Api/memberAPI";
import reduxStore, { RootState, userSlice } from "./reduxStore";
import Storage from "./Storage";
import storageKey from "./Storagekey";

type UserTokenData = {
  token: string;
  privKey: string;
};

class UserStorage {
  static async loadUserDataOnStartUp(): Promise<void> {
    const token = await this.getUserToken();
    const profile = await this.getUserProfile();

    reduxStore.dispatch(userSlice.actions.setToken(token));
    reduxStore.dispatch(userSlice.actions.setProfile(profile));
  }

  static async getUserToken(): Promise<UserTokenData | null> {
    const token = await Storage.read<string>(storageKey.USER_TOKEN);
    const privKey = await Storage.read<string>(storageKey.USER_PRIVKEY);

    if (token && privKey) {
      return { token, privKey };
    }
    return null;
  }
  static async getUserProfile(): Promise<UserData | null> {
    return await Storage.read<UserData>(storageKey.USER_PROFILE);
  }
  static async setUserToken(token: string, privKey: string): Promise<void> {
    await Storage.write(storageKey.USER_TOKEN, token);
    await Storage.write(storageKey.USER_PRIVKEY, privKey);

    reduxStore.dispatch(userSlice.actions.setToken({ token: token, privKey: privKey }));
  }
  static async setUserProfile(profile: UserData): Promise<void> {
    await Storage.write(storageKey.USER_PROFILE, profile);

    reduxStore.dispatch(userSlice.actions.setProfile(profile));
  }
  static async removeUserData(): Promise<void> {
    await Storage.remove(storageKey.USER_TOKEN);
    await Storage.remove(storageKey.USER_PRIVKEY);

    reduxStore.dispatch(userSlice.actions.clear());
  }

  static async isUserLoggedIn(): Promise<boolean> {
    return Storage.read<string>(storageKey.USER_TOKEN).then(token =>
      Promise.resolve(token !== null),
    );
  }

  static isUserDataLoadingSelector = (state: RootState) => state.user.token === undefined;
  static isUserLoggedInSelector = (state: RootState) => state.user.token !== null;
  static userProfileSelector = (state: RootState) => state.user.profile;
}

export { userSlice };
export default UserStorage;
