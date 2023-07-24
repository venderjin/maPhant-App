import Storage from "./Storage";
import StorageKey from "./key";

type UserTokenData = {
  token: string;
  privKey: string;
};

class UserStorage {
  static async getUserToken(): Promise<UserTokenData> {
    const token = await Storage.read<string>(StorageKey.USER_TOKEN);
    const privKey = await Storage.read<string>(StorageKey.USER_PRIVKEY);

    if (token && privKey) {
      return { token, privKey };
    }
    return Promise.reject();
  }
  static async setUserToken(token: string, privKey: string): Promise<void> {
    await Storage.write(StorageKey.USER_TOKEN, token);
    await Storage.write(StorageKey.USER_PRIVKEY, privKey);
  }
  static async removeUserToken(): Promise<void> {
    await Storage.remove(StorageKey.USER_TOKEN);
    await Storage.remove(StorageKey.USER_PRIVKEY);
  }

  static async isUserLoggedIn(): Promise<boolean> {
    return Storage.read<string>(StorageKey.USER_TOKEN).then(token =>
      Promise.resolve(token !== null),
    );
  }
}

const userStorage = new UserStorage();

export default userStorage;
