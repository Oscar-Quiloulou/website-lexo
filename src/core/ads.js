// /src/core/ads.js
import { getCurrentUser } from "./user.js";
import { isVipActive, isBoostActive } from "./vip.js";

export function getAdMultiplier() {
  const user = getCurrentUser();
  if (!user) return 1;
  if (isVipActive(user)) return 0;
  if (isBoostActive(user)) return 3;
  return 1;
}

export function shouldShowAds() {
  const user = getCurrentUser();
  if (!user) return true;
  return !isVipActive(user);
}
