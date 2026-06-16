// /src/core/vip.js
import { now, days } from "./utils.js";

export function isVipActive(user) {
  return user.vipExpire > now();
}

export function isBoostActive(user) {
  return user.boostExpire > now();
}

export function activateVipFor(user) {
  user.vipExpire = now() + days(30);
}

export function activateBoostFor(user) {
  // 1 mois boost (3× pubs)
  user.boostExpire = now() + days(30);

  // puis 1 mois VIP automatique
  user.vipExpire = user.boostExpire + days(30);
}

export function getVipStatusLabel(user) {
  if (isVipActive(user)) return "VIP actif";
  if (isBoostActive(user)) return "Boost pub actif (3× pubs)";
  return "Aucun avantage actif";
}
