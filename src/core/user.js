// /src/core/user.js
import { save, load } from "./utils.js";

const KEY = "edugame_users";
const KEY_CURRENT = "edugame_current_user";

export function getUsers() {
  return load(KEY, []);
}

export function saveUsers(list) {
  save(KEY, list);
}

export function getCurrentUser() {
  return load(KEY_CURRENT, null);
}

export function setCurrentUser(user) {
  save(KEY_CURRENT, user);
}

export function saveUser(updated) {
  const users = getUsers().map(u => (u.id === updated.id ? updated : u));
  saveUsers(users);
  setCurrentUser(updated);
}

export function logout() {
  localStorage.removeItem(KEY_CURRENT);
}
