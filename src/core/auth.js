// /src/core/auth.js
import { getUsers, saveUsers, setCurrentUser } from "./user.js";
import { uid } from "./utils.js";

export async function register(username, email, password) {
  const users = getUsers();

  if (users.some(u => u.email === email)) return false;

  const user = {
    id: uid(),
    username,
    email,
    password, // version simple (tu peux hasher si tu veux)
    vipExpire: 0,
    boostExpire: 0
  };

  users.push(user);
  saveUsers(users);
  setCurrentUser(user);
  return true;
}

export async function login(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return false;

  setCurrentUser(user);
  return true;
}
