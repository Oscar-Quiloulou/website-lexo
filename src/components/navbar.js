// /src/components/navbar.js
import { getCurrentUser } from "../core/user.js";
import { isVipActive } from "../core/vip.js";

const navbar = document.getElementById("navbar");

function renderNavbar() {
  const user = getCurrentUser();
  const vip = user && isVipActive(user);

  navbar.innerHTML = `
    <nav class="navbar">
      <a href="/index.html" class="nav-logo">EduGame</a>

      <div class="nav-links">
        <a href="/traduction.html">Traduction</a>
        <a href="/chatgpt.html">Chat IA</a>
        <a href="/exercices/index.html">Exercices</a>
      </div>

      <div class="nav-user">
        ${
          user
            ? `
          <a href="/account/profile.html" class="nav-profile">
            ${vip ? "⭐ " : ""}${user.username}
          </a>`
            : `<a href="/account/login.html" class="btn small">Connexion</a>`
        }
      </div>
    </nav>
  `;
}

renderNavbar();
