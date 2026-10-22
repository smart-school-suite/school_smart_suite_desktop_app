import { deleteItem, getItem, setItem } from "tauri-plugin-secure-keystore";

export const secureTokenStorage = {
  async save(tokenKey, token) {
    await setItem(tokenKey, token);
  },

  async get(tokenKey) {
    try {
      return (await getItem(tokenKey)) ?? null;
    } catch {
      return null;
    }
  },

  async remove(tokenKey) {
    try {
      await deleteItem(tokenKey);
    } catch {
      // Nothing to delete
    }
  },
};