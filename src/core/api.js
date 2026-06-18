// /src/core/api.js

const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const API_KEY = "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";

export async function askAI(prompt) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-8b-instant",   // ✔ modèle correct
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await res.json();

    return data.choices?.[0]?.message?.content || "Erreur IA.";
  } catch (e) {
    return "Erreur de connexion à l’IA.";
  }
}

export async function chatWithAI(text) {
  return askAI(text);
}

export async function translateText(text, from, to) {
  const prompt = `
Traduis ce texte du ${from} vers le ${to} :
"${text}"
`;
  return askAI(prompt);
}
