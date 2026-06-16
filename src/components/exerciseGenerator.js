// /src/components/exerciseGenerator.js
import { askAI } from "../core/api.js";
import { loadChaptersFor } from "../core/chapters.js";

export async function generateExercisesFor(level, subject, chapterId) {
  const chapters = await loadChaptersFor(level, subject);
  const chapter = chapters.find(c => c.id === chapterId);

  if (!chapter) return "<p>Chapitre introuvable.</p>";

  const prompt = `
Tu es un professeur certifié. Génère 5 exercices pour des élèves de ${level}.
Matière : ${subject}.
Chapitre officiel : ${chapter.title}.
Exigences :
- exercices clairs
- difficulté progressive
- corrigés détaillés
- format HTML simple (<div class="ex">)
`;

  const response = await askAI(prompt);

  return `
    <h2>${chapter.title}</h2>
    <div class="exercise-list">
      ${response}
    </div>
  `;
}
