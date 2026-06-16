// /src/components/adBanner.js
import { getCurrentUser } from "../core/user.js";
import { isVipActive, isBoostActive } from "../core/vip.js";

export function renderAdBanner(id) {
  const container = document.getElementById(id);
  if (!container) return;

  const user = getCurrentUser();

  // VIP = aucune pub
  if (user && isVipActive(user)) {
    container.innerHTML = `<p class="no-ads">Aucune pub (VIP)</p>`;
    return;
  }

  // Boost = 3× pubs
  const multiplier = user && isBoostActive(user) ? 3 : 1;

  let adsHTML = "";
  for (let i = 0; i < multiplier; i++) {
    adsHTML += `
      <iframe
        data-aa="YOUR_AADS_ID"
        src="//ad.a-ads.com/YOUR_AADS_ID?size=728x90"
        style="width:728px; height:90px; border:0; padding:0; overflow:hidden; background:transparent;">
      </iframe>
    `;
  }

  container.innerHTML = adsHTML;
}
