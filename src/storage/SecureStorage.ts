import SecureStore from "expo-secure-store";

class SecureStorage {
  async write(key: string, value: string) {
    return await SecureStore.setItemAsync(key, value);
  }

  async read(key: string): Promise<string | null> {
    return await SecureStore.getItemAsync(key).catch(() => Promise.resolve(null));
  }

  async remove(key: string): Promise<boolean> {
    return SecureStore.deleteItemAsync(key)
      .then(() => Promise.resolve(true))
      .catch(() => Promise.resolve(false));
  }
}

export default new SecureStorage();
