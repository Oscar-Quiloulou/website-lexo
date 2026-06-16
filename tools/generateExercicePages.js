// /tools/generateExercicePages.js

import fs from "fs";
import path from "path";

// --- CONFIG --------------------------------------------------

const niveaux = ["6e", "5e", "4e", "3e"];

const matieres = [
  "maths",
  "francais",
  "histoire",
  "geo",
  "svt",
  "techno"
];

// dossier de sortie
const BASE = "./public/exercices";

// template pour la page matière
function templateMatiere(niveau, matiere) {
return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>${matiere} ${niveau} - EduGame</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="/src/styles/global.css" />
  <link rel="stylesheet" href="/src/styles/theme.css" />
  <link rel="stylesheet" href="/src/styles/exercises.css" />
</head>
<body>
  <header id="navbar"></header>

  <main class="page page-exercises">
    <h1>${matiere.toUpperCase()} — ${niveau}</h1>
    <p>Choisis un chapitre du programme officiel, puis génère des exercices.</p>

    <section class="chapter-selector">
      <label for="chapter-select">Chapitre</label>
      <select id="chapter-select"></select>
      <button id="generate-ex-btn" class="btn primary">Générer des exercices</button>
    </section>

    <section id="exercises-container" class="exercises-container"></section>

    <section class="ads-section">
      <div id="ad-banner-ex-${matiere}-${niveau}" class="ad-banner"></div>
    </section>
  </main>

  <footer id="footer"></footer>

  <script src="/src/core/utils.js" type="module"></script>
  <script src="/src/core/ads.js" type="module"></script>
  <script src="/src/core/chapters.js" type="module"></script>
  <script src="/src/core/api.js" type="module"></script>
  <script src="/src/components/navbar.js" type="module"></script>
  <script src="/src/components/footer.js" type="module"></script>
  <script src="/src/components/exerciseGenerator.js" type="module"></script>

  <script type="module">
    import { renderAdBanner } from "/src/components/adBanner.js";
    import { loadChaptersFor } from "/src/core/chapters.js";
    import { generateExercisesFor } from "/src/components/exerciseGenerator.js";

    renderAdBanner("ad-banner-ex-${matiere}-${niveau}");

    const select = document.getElementById("chapter-select");
    const btn = document.getElementById("generate-ex-btn");
    const container = document.getElementById("exercises-container");

    loadChaptersFor("${niveau}", "${matiere}").then(chapters => {
      chapters.forEach(ch => {
        const opt = document.createElement("option");
        opt.value = ch.id;
        opt.textContent = ch.title;
        select.appendChild(opt);
      });
    });

    btn.addEventListener("click", async () => {
      const chapterId = select.value;
      container.innerHTML = "<p>Génération des exercices en cours...</p>";
      const html = await generateExercisesFor("${niveau}", "${matiere}", chapterId);
      container.innerHTML = html;
    });
  </script>
</body>
</html>`;
}

// template pour la page niveau
function templateNiveau(niveau) {
return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Exercices ${niveau} - EduGame</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="/src/styles/global.css" />
  <link rel="stylesheet" href="/src/styles/theme.css" />
  <link rel="stylesheet" href="/src/styles/exercises.css" />
</head>
<body>
  <header id="navbar"></header>

  <main class="page page-exercises">
    <h1>Exercices de ${niveau}</h1>
    <p>Choisis une matière pour voir les chapitres et générer des exercices.</p>

    <section class="subjects-grid">
      ${matieres
        .map(
          m => `
        <a href="/exercices/${niveau}/${m}.html" class="subject-card">
          <h2>${m.toUpperCase()}</h2>
        </a>`
        )
        .join("")}
    </section>

    <section class="ads-section">
      <div id="ad-banner-ex-${niveau}" class="ad-banner"></div>
    </section>
  </main>

  <footer id="footer"></footer>

  <script src="/src/core/ads.js" type="module"></script>
  <script src="/src/components/navbar.js" type="module"></script>
  <script src="/src/components/footer.js" type="module"></script>
  <script type="module">
    import { renderAdBanner } from "/src/components/adBanner.js";
    renderAdBanner("ad-banner-ex-${niveau}");
  </script>
</body>
</html>`;
}

// --- GENERATION --------------------------------------------------

console.log("📘 Génération des pages d'exercices...");

if (!fs.existsSync(BASE)) fs.mkdirSync(BASE, { recursive: true });

for (const niveau of niveaux) {
  const dir = path.join(BASE, niveau);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  // page du niveau
  fs.writeFileSync(
    path.join(BASE, `${niveau}.html`),
    templateNiveau(niveau)
  );

  // pages des matières
  for (const matiere of matieres) {
    fs.writeFileSync(
      path.join(dir, `${matiere}.html`),
      templateMatiere(niveau, matiere)
    );
  }
}

console.log("✅ Toutes les pages d'exercices ont été générées !");
