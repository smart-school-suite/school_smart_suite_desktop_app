import { deleteItem, getItem, setItem } from "tauri-plugin-secure-keystore";

export const secureTokenStorage = {
  async save(tokenKey, token) {
    await setItem(tokenKey, token);
  },

  async get(tokenKey) {
    return await getItem(tokenKey);
  },

  async remove(tokenKey) {
    await deleteItem(tokenKey);
  },
};
