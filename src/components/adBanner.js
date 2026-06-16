// /src/components/adBanner.js
import { getCurrentUser } from "../core/user.js";
import { isVipActive, isBoostActive } from "../core/vip.js";

const AADS_ID = "2444542"; // TON ID

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
      <div class="ad-frame">
        <iframe
          data-aa="${AADS_ID}"
          src="//acceptable.a-ads.com/${AADS_ID}/?size=Adaptive"
          style="border:0; padding:0; width:100%; height:120px; overflow:hidden; display:block; margin:auto;">
        </iframe>
      </div>
    `;
  }

  container.innerHTML = adsHTML;
}
