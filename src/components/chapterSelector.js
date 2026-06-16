// /src/components/chapterSelector.js
import { loadChaptersFor } from "../core/chapters.js";

export async function populateChapterSelect(level, subject, selectId) {
  const select = document.getElementById(selectId);
  if (!select) return;

  const chapters = await loadChaptersFor(level, subject);

  select.innerHTML = "";
  chapters.forEach(ch => {
    const opt = document.createElement("option");
    opt.value = ch.id;
    opt.textContent = ch.title;
    select.appendChild(opt);
  });
}
